import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  AlertBanner,
  Button,
  Card,
  EmptyState,
  Input,
  LoadingState,
  PageTitle,
  Screen,
  StatusBadge,
} from '@/components/ui';
import {
  api,
  type CreateExtinguisherInput,
  type Customer,
  type Extinguisher,
  type ExtinguisherStatus,
} from '@/lib/api';
import { formatDate, todayISO } from '@/lib/utils';
import { theme } from '@/constants/theme';

const emptyForm: CreateExtinguisherInput = {
  serialNumber: '',
  customerId: '',
  purchaseDate: todayISO(),
  expiryDate: '',
  type: '',
  capacity: '',
};

const STATUSES: ExtinguisherStatus[] = ['ACTIVE', 'DELIVERED', 'RETURNED', 'EXPIRED'];

export default function ExtinguishersScreen() {
  const [extinguishers, setExtinguishers] = useState<Extinguisher[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (status?: string) => {
    setLoading(true);
    setError('');
    try {
      const [ext, cust] = await Promise.all([
        api.extinguishers.list(status ? { status } : undefined),
        api.customers.list(),
      ]);
      setExtinguishers(ext);
      setCustomers(cust);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate() {
    if (!form.serialNumber || !form.customerId || !form.expiryDate) {
      setError('Serial number, customer, and expiry date are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await api.extinguishers.create({
        ...form,
        type: form.type || undefined,
        capacity: form.capacity || undefined,
      });
      setForm({ ...emptyForm, purchaseDate: todayISO() });
      setShowForm(false);
      await load(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register extinguisher');
    } finally {
      setSaving(false);
    }
  }

  async function handleAction(id: string, action: 'deliver' | 'return') {
    setError('');
    try {
      if (action === 'deliver') await api.extinguishers.deliver(id);
      else await api.extinguishers.return(id);
      await load(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    }
  }

  return (
    <Screen refreshing={loading} onRefresh={() => load(statusFilter || undefined)}>
      <PageTitle title="Extinguishers" subtitle="Track sales, delivery, and expiry" />

      {error ? <AlertBanner message={error} /> : null}

      <Button
        label={showForm ? 'Cancel' : 'Register sale'}
        variant={showForm ? 'secondary' : 'primary'}
        onPress={() => setShowForm((v) => !v)}
      />

      {showForm ? (
        <Card style={{ marginTop: 12 }}>
          <Input label="Serial number" value={form.serialNumber} onChangeText={(v) => setForm({ ...form, serialNumber: v })} />
          <Text style={styles.label}>Customer</Text>
          <View style={styles.picker}>
            {customers.map((c) => (
              <Button
                key={c.id}
                label={c.fullName}
                variant={form.customerId === c.id ? 'primary' : 'secondary'}
                small
                onPress={() => setForm({ ...form, customerId: c.id })}
              />
            ))}
          </View>
          <Input label="Purchase date (YYYY-MM-DD)" value={form.purchaseDate} onChangeText={(v) => setForm({ ...form, purchaseDate: v })} />
          <Input label="Expiry date (YYYY-MM-DD)" value={form.expiryDate} onChangeText={(v) => setForm({ ...form, expiryDate: v })} />
          <Input label="Type" value={form.type ?? ''} onChangeText={(v) => setForm({ ...form, type: v })} placeholder="ABC Dry Powder" />
          <Input label="Capacity" value={form.capacity ?? ''} onChangeText={(v) => setForm({ ...form, capacity: v })} placeholder="6kg" />
          <Button label={saving ? 'Saving...' : 'Register'} onPress={handleCreate} disabled={saving} />
        </Card>
      ) : null}

      <Text style={styles.filterLabel}>Filter by status</Text>
      <View style={styles.picker}>
        <Button label="All" variant={!statusFilter ? 'primary' : 'secondary'} small onPress={() => { setStatusFilter(''); load(); }} />
        {STATUSES.map((s) => (
          <Button
            key={s}
            label={s}
            variant={statusFilter === s ? 'primary' : 'secondary'}
            small
            onPress={() => { setStatusFilter(s); load(s); }}
          />
        ))}
      </View>

      {loading && extinguishers.length === 0 ? (
        <LoadingState />
      ) : extinguishers.length === 0 ? (
        <EmptyState message="No extinguishers registered." />
      ) : (
        extinguishers.map((ext) => (
          <Card key={ext.id}>
            <View style={styles.row}>
              <Text style={styles.serial}>{ext.serialNumber}</Text>
              <StatusBadge status={ext.status} />
            </View>
            <Text style={styles.meta}>{ext.customer?.fullName ?? '—'}</Text>
            <Text style={styles.meta}>Expires {formatDate(ext.expiryDate)}</Text>
            <View style={styles.actions}>
              {ext.status === 'ACTIVE' ? (
                <Button label="Delivered" variant="secondary" small onPress={() => handleAction(ext.id, 'deliver')} />
              ) : null}
              {ext.status === 'ACTIVE' || ext.status === 'DELIVERED' ? (
                <Button label="Returned" variant="secondary" small onPress={() => handleAction(ext.id, 'return')} />
              ) : null}
            </View>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '500', color: theme.text, marginBottom: 8 },
  filterLabel: { fontSize: 14, fontWeight: '500', color: theme.text, marginTop: 16, marginBottom: 8 },
  picker: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serial: { fontSize: 16, fontWeight: '600', color: theme.text },
  meta: { fontSize: 13, color: theme.textMuted, marginTop: 4 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
});
