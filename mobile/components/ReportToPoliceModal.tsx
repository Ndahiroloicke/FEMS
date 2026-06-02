import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Escalation } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { theme } from '@/constants/theme';
import { Button, Input } from '@/components/ui';

export function ReportToPoliceModal({
  visible,
  escalation,
  notes,
  submitting,
  onNotesChange,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  escalation: Escalation | null;
  notes: string;
  submitting: boolean;
  onNotesChange: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!escalation) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Report to police</Text>
            <Text style={styles.subtitle}>
              Record that this case has been escalated to law enforcement.
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>What this action does</Text>
              <Text style={styles.infoText}>
                Marks the case as reported in the system, saves the timestamp and your notes.
                This is an internal audit record — the app does not contact police automatically.
              </Text>
            </View>

            <View style={styles.details}>
              <Row label="Customer" value={escalation.customer?.fullName ?? '—'} />
              <Row label="National ID" value={escalation.customer?.nationalId ?? '—'} />
              <Row label="Phone" value={escalation.customer?.phone ?? '—'} />
              <Row label="Extinguisher" value={escalation.extinguisher?.serialNumber ?? '—'} />
              <Row
                label="Expired"
                value={
                  escalation.extinguisher?.expiryDate
                    ? formatDate(escalation.extinguisher.expiryDate)
                    : '—'
                }
              />
            </View>

            <Input
              label="Staff notes (optional)"
              value={notes}
              onChangeText={onNotesChange}
              placeholder="Police station, officer name, reference number..."
              multiline
            />
          </ScrollView>

          <View style={styles.actions}>
            <View style={styles.actionBtn}>
              <Button label="Cancel" variant="secondary" onPress={onClose} disabled={submitting} />
            </View>
            <View style={styles.actionBtn}>
              <Button
                label={submitting ? 'Submitting...' : 'Confirm report'}
                variant="danger"
                onPress={onConfirm}
                disabled={submitting}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: '600', color: theme.text },
  subtitle: { fontSize: 14, color: theme.textMuted, marginTop: 4, marginBottom: 16 },
  infoBox: {
    backgroundColor: theme.warningBg,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  infoTitle: { fontSize: 14, fontWeight: '600', color: theme.warning },
  infoText: { fontSize: 13, color: '#92400e', marginTop: 4, lineHeight: 20 },
  details: {
    backgroundColor: theme.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  row: { marginBottom: 10 },
  rowLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowValue: { fontSize: 14, color: theme.text, marginTop: 2 },
  actions: { flexDirection: 'row', marginTop: 16, paddingTop: 12, gap: 8 },
  actionBtn: { flex: 1 },
});
