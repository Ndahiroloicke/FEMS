import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  AlertBanner,
  Button,
  Card,
  LoadingState,
  PageTitle,
  Screen,
  StatCard,
} from '@/components/ui';
import { api, type DashboardSummary } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import { theme } from '@/constants/theme';

export default function DashboardScreen() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningChecks, setRunningChecks] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setSummary(await api.dashboard.summary());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function runChecks() {
    setRunningChecks(true);
    setError('');
    setSuccess('');
    try {
      const result = await api.compliance.runChecks();
      setSuccess(
        `Checks complete: ${result.warnings.processed} warning(s), ${result.escalations.processed} escalation(s).`,
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compliance check failed');
    } finally {
      setRunningChecks(false);
    }
  }

  if (loading && !summary) return <LoadingState />;

  return (
    <Screen refreshing={loading} onRefresh={load}>
      <PageTitle
        title="Dashboard"
        subtitle="Overview of customers, extinguishers, and compliance"
      />

      {error ? <AlertBanner message={error} /> : null}
      {success ? <AlertBanner message={success} type="success" /> : null}

      <Button
        label={runningChecks ? 'Running checks...' : 'Run compliance checks'}
        onPress={runChecks}
        disabled={runningChecks}
      />

      {summary ? (
        <>
          <View style={styles.statsRow}>
            <StatCard label="Customers" value={summary.totalCustomers} />
            <StatCard label="Extinguishers" value={summary.totalExtinguishers} />
          </View>
          <View style={styles.statsRow}>
            <StatCard label="Expiring soon" value={summary.expiringSoon} tone="warning" />
            <StatCard
              label="Pending escalations"
              value={summary.pendingEscalations}
              tone={summary.pendingEscalations > 0 ? 'danger' : 'default'}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard label="Active" value={summary.activeExtinguishers} />
            <StatCard label="Delivered" value={summary.deliveredExtinguishers} />
          </View>

          <Text style={styles.sectionTitle}>Recent notifications</Text>
          {summary.recentNotifications.length === 0 ? (
            <Card>
              <Text style={styles.muted}>No notifications yet.</Text>
            </Card>
          ) : (
            summary.recentNotifications.map((n) => (
              <Card key={n.id}>
                <Text style={styles.cardTitle}>{n.customer?.fullName ?? 'Unknown'}</Text>
                <Text style={styles.muted}>{n.message}</Text>
                <Text style={styles.date}>{formatDateTime(n.sentAt)}</Text>
              </Card>
            ))
          )}
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.text,
    marginTop: 20,
    marginBottom: 8,
  },
  cardTitle: { fontSize: 14, fontWeight: '600', color: theme.text },
  muted: { fontSize: 13, color: theme.textMuted, marginTop: 4, lineHeight: 18 },
  date: { fontSize: 11, color: theme.textMuted, marginTop: 8 },
});
