import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

export function Screen({
  children,
  refreshing,
  onRefresh,
}: {
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
}) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing ?? false} onRefresh={onRefresh} />
        ) : undefined
      }>
      {children}
    </ScrollView>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.pageTitle}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  small,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        small && styles.buttonSmall,
        variant === 'primary' && styles.buttonPrimary,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'danger' && styles.buttonDanger,
        (pressed || disabled) && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}>
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.buttonTextSecondary,
          small && styles.buttonTextSmall,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  multiline?: boolean;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

export function AlertBanner({
  message,
  type = 'error',
}: {
  message: string;
  type?: 'error' | 'success';
}) {
  return (
    <View
      style={[
        styles.alert,
        type === 'error' ? styles.alertError : styles.alertSuccess,
      ]}>
      <Text
        style={[
          styles.alertText,
          type === 'error' ? styles.alertTextError : styles.alertTextSuccess,
        ]}>
        {message}
      </Text>
    </View>
  );
}

export function StatusBadge({
  status,
  kind = 'extinguisher',
}: {
  status: string;
  kind?: 'extinguisher' | 'escalation';
}) {
  const stylesMap: Record<string, { bg: string; text: string }> =
    kind === 'escalation'
      ? {
          PENDING: { bg: theme.warningBg, text: theme.warning },
          REPORTED: { bg: theme.dangerBg, text: theme.danger },
          RESOLVED: { bg: theme.successBg, text: theme.success },
        }
      : {
          ACTIVE: { bg: theme.infoBg, text: theme.info },
          DELIVERED: { bg: theme.warningBg, text: theme.warning },
          RETURNED: { bg: theme.successBg, text: theme.success },
          EXPIRED: { bg: theme.dangerBg, text: theme.danger },
        };

  const colors = stylesMap[status] ?? { bg: '#f1f5f9', text: theme.textMuted };

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>
        {status.replace('_', ' ')}
      </Text>
    </View>
  );
}

export function StatCard({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: number | string;
  tone?: 'default' | 'warning' | 'danger';
}) {
  const valueColor =
    tone === 'warning' ? theme.warning : tone === 'danger' ? theme.danger : theme.text;

  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

export function LoadingState() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={theme.primary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  screenContent: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 12,
  },
  pageTitle: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '600', color: theme.text },
  subtitle: { fontSize: 14, color: theme.textMuted, marginTop: 4 },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonSmall: { paddingVertical: 8, paddingHorizontal: 12 },
  buttonPrimary: { backgroundColor: theme.primary },
  buttonSecondary: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  buttonDanger: { backgroundColor: theme.danger },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  buttonTextSecondary: { color: theme.text },
  buttonTextSmall: { fontSize: 12 },
  inputWrap: { marginBottom: 12 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: theme.text, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.text,
    backgroundColor: theme.surface,
  },
  inputMultiline: { minHeight: 88, textAlignVertical: 'top' },
  alert: { borderRadius: 8, padding: 12, marginBottom: 12, borderWidth: 1 },
  alertError: { backgroundColor: theme.dangerBg, borderColor: '#fecaca' },
  alertSuccess: { backgroundColor: theme.successBg, borderColor: '#bbf7d0' },
  alertText: { fontSize: 14 },
  alertTextError: { color: theme.danger },
  alertTextSuccess: { color: theme.success },
  badge: { alignSelf: 'flex-start', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 14,
    marginBottom: 8,
  },
  statLabel: { fontSize: 13, color: theme.textMuted, fontWeight: '500' },
  statValue: { fontSize: 28, fontWeight: '600', marginTop: 6 },
  loading: { padding: 32, alignItems: 'center' },
  loadingText: { marginTop: 8, color: theme.textMuted, fontSize: 14 },
  empty: { padding: 32, alignItems: 'center' },
  emptyText: { color: theme.textMuted, fontSize: 14, textAlign: 'center' },
});
