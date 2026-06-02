import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  AlertBanner,
  Card,
  EmptyState,
  LoadingState,
  PageTitle,
  Screen,
} from '@/components/ui';
import { api, type Notification } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import { theme } from '@/constants/theme';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setNotifications(await api.notifications.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Screen refreshing={loading} onRefresh={load}>
      <PageTitle
        title="Notifications"
        subtitle="Expiry warnings and escalation messages"
      />

      {error ? <AlertBanner message={error} /> : null}

      {loading && notifications.length === 0 ? (
        <LoadingState />
      ) : notifications.length === 0 ? (
        <EmptyState message="No notifications yet. Run compliance checks from the dashboard." />
      ) : (
        notifications.map((n) => (
          <Card key={n.id}>
            <Text style={styles.type}>{n.type.replace('_', ' ')}</Text>
            <Text style={styles.customer}>{n.customer?.fullName ?? '—'}</Text>
            <Text style={styles.serial}>{n.extinguisher?.serialNumber ?? '—'}</Text>
            <Text style={styles.message}>{n.message}</Text>
            <Text style={styles.date}>{formatDateTime(n.sentAt)}</Text>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  type: { fontSize: 11, fontWeight: '600', color: theme.textMuted, textTransform: 'uppercase' },
  customer: { fontSize: 15, fontWeight: '600', color: theme.text, marginTop: 4 },
  serial: { fontSize: 13, color: theme.textMuted, marginTop: 2 },
  message: { fontSize: 13, color: theme.text, marginTop: 8, lineHeight: 20 },
  date: { fontSize: 11, color: theme.textMuted, marginTop: 8 },
});
