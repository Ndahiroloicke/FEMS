import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReportToPoliceModal } from '@/components/ReportToPoliceModal';
import {
  AlertBanner,
  Button,
  Card,
  EmptyState,
  LoadingState,
  PageTitle,
  Screen,
  StatusBadge,
} from '@/components/ui';
import { api, type Escalation, type EscalationStatus } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/utils';
import { theme } from '@/constants/theme';

const STATUSES: EscalationStatus[] = ['PENDING', 'REPORTED', 'RESOLVED'];

export default function EscalationsScreen() {
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [reportTarget, setReportTarget] = useState<Escalation | null>(null);
  const [reportNotes, setReportNotes] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const load = useCallback(async (status?: string) => {
    setLoading(true);
    setError('');
    try {
      setEscalations(await api.escalations.list(status || undefined));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load escalations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmReport() {
    if (!reportTarget) return;
    setSubmittingReport(true);
    setError('');
    setSuccess('');
    try {
      await api.escalations.reportToPolice(
        reportTarget.id,
        reportNotes.trim() || undefined,
      );
      setSuccess(`Case for ${reportTarget.customer?.fullName} marked as reported.`);
      setReportTarget(null);
      setReportNotes('');
      await load(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setSubmittingReport(false);
    }
  }

  async function handleResolve(id: string) {
    setError('');
    setSuccess('');
    try {
      await api.escalations.update(id, { status: 'RESOLVED' });
      setSuccess('Escalation marked as resolved.');
      await load(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve');
    }
  }

  return (
    <>
      <Screen refreshing={loading} onRefresh={() => load(statusFilter || undefined)}>
        <PageTitle
          title="Escalations"
          subtitle="Expired extinguishers not returned by customers"
        />

        {error ? <AlertBanner message={error} /> : null}
        {success ? <AlertBanner message={success} type="success" /> : null}

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

        {loading && escalations.length === 0 ? (
          <LoadingState />
        ) : escalations.length === 0 ? (
          <EmptyState message="No escalation cases." />
        ) : (
          escalations.map((esc) => (
            <Card key={esc.id}>
              <View style={styles.row}>
                <Text style={styles.name}>{esc.customer?.fullName}</Text>
                <StatusBadge status={esc.status} kind="escalation" />
              </View>
              <Text style={styles.meta}>ID: {esc.customer?.nationalId}</Text>
              <Text style={styles.meta}>Unit: {esc.extinguisher?.serialNumber}</Text>
              <Text style={styles.reason}>{esc.reason}</Text>
              {esc.reportedAt ? (
                <Text style={styles.meta}>Reported {formatDateTime(esc.reportedAt)}</Text>
              ) : null}
              {esc.notes ? <Text style={styles.notes}>Notes: {esc.notes}</Text> : null}
              <View style={styles.actions}>
                {esc.status === 'PENDING' ? (
                  <Button
                    label="Report to police"
                    variant="danger"
                    small
                    onPress={() => {
                      setReportTarget(esc);
                      setReportNotes('');
                    }}
                  />
                ) : null}
                {esc.status !== 'RESOLVED' ? (
                  <Button label="Resolve" variant="secondary" small onPress={() => handleResolve(esc.id)} />
                ) : null}
              </View>
            </Card>
          ))
        )}
      </Screen>

      <ReportToPoliceModal
        visible={reportTarget !== null}
        escalation={reportTarget}
        notes={reportNotes}
        submitting={submittingReport}
        onNotesChange={setReportNotes}
        onClose={() => !submittingReport && setReportTarget(null)}
        onConfirm={confirmReport}
      />
    </>
  );
}

const styles = StyleSheet.create({
  picker: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: theme.text, flex: 1, marginRight: 8 },
  meta: { fontSize: 13, color: theme.textMuted, marginTop: 4 },
  reason: { fontSize: 13, color: theme.text, marginTop: 8, lineHeight: 20 },
  notes: { fontSize: 12, color: theme.textMuted, marginTop: 6, fontStyle: 'italic' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
});
