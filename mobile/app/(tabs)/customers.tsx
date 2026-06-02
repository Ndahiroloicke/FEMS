import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  AlertBanner,
  Button,
  Card,
  EmptyState,
  Input,
  LoadingState,
  PageTitle,
  Screen,
} from '@/components/ui';
import { api, type CreateCustomerInput, type Customer } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { theme } from '@/constants/theme';

const emptyForm: CreateCustomerInput = {
  fullName: '',
  nationalId: '',
  phone: '',
  email: '',
  address: '',
};

export default function CustomersScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (query?: string) => {
    setLoading(true);
    setError('');
    try {
      setCustomers(await api.customers.list(query));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate() {
    if (!form.fullName || !form.nationalId || !form.phone) {
      setError('Name, national ID, and phone are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await api.customers.create({
        ...form,
        email: form.email || undefined,
        address: form.address || undefined,
      });
      setForm(emptyForm);
      setShowForm(false);
      await load(search || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create customer');
    } finally {
      setSaving(false);
    }
  }

  function confirmDelete(customer: Customer) {
    Alert.alert(
      'Delete customer',
      `Delete ${customer.fullName}? Their extinguishers will also be removed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.customers.delete(customer.id);
              await load(search || undefined);
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Delete failed');
            }
          },
        },
      ],
    );
  }

  return (
    <Screen refreshing={loading} onRefresh={() => load(search || undefined)}>
      <PageTitle title="Customers" subtitle="Register buyers and manage contact details" />

      {error ? <AlertBanner message={error} /> : null}

      <Button
        label={showForm ? 'Cancel' : 'Add customer'}
        variant={showForm ? 'secondary' : 'primary'}
        onPress={() => setShowForm((v) => !v)}
      />

      {showForm ? (
        <Card style={{ marginTop: 12 }}>
          <Input label="Full name" value={form.fullName} onChangeText={(v) => setForm({ ...form, fullName: v })} />
          <Input label="National ID" value={form.nationalId} onChangeText={(v) => setForm({ ...form, nationalId: v })} />
          <Input label="Phone" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} keyboardType="phone-pad" />
          <Input label="Email" value={form.email ?? ''} onChangeText={(v) => setForm({ ...form, email: v })} keyboardType="email-address" />
          <Input label="Address" value={form.address ?? ''} onChangeText={(v) => setForm({ ...form, address: v })} />
          <Button label={saving ? 'Saving...' : 'Save customer'} onPress={handleCreate} disabled={saving} />
        </Card>
      ) : null}

      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <Input label="Search" value={search} onChangeText={setSearch} placeholder="Name, ID, or phone" />
        </View>
        <Button label="Go" variant="secondary" small onPress={() => load(search || undefined)} />
      </View>

      {loading && customers.length === 0 ? (
        <LoadingState />
      ) : customers.length === 0 ? (
        <EmptyState message="No customers found." />
      ) : (
        customers.map((c) => (
          <Card key={c.id}>
            <Text style={styles.name}>{c.fullName}</Text>
            <Text style={styles.meta}>ID: {c.nationalId}</Text>
            <Text style={styles.meta}>{c.phone}</Text>
            <Text style={styles.meta}>
              {c._count?.extinguishers ?? 0} extinguisher(s) · Registered {formatDate(c.createdAt)}
            </Text>
            <View style={styles.actions}>
              <Button label="Delete" variant="danger" small onPress={() => confirmDelete(c)} />
            </View>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 8 },
  name: { fontSize: 16, fontWeight: '600', color: theme.text },
  meta: { fontSize: 13, color: theme.textMuted, marginTop: 4 },
  actions: { marginTop: 12, alignSelf: 'flex-start' },
});
