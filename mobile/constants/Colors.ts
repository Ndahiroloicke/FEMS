export const theme = {
  background: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  textMuted: '#64748b',
  primary: '#0f172a',
  primaryPressed: '#1e293b',
  danger: '#b91c1c',
  dangerBg: '#fef2f2',
  warning: '#b45309',
  warningBg: '#fffbeb',
  success: '#15803d',
  successBg: '#f0fdf4',
  info: '#1e40af',
  infoBg: '#eff6ff',
};

export default {
  light: {
    text: theme.text,
    background: theme.background,
    tint: theme.primary,
    tabIconDefault: theme.textMuted,
    tabIconSelected: theme.primary,
  },
  dark: {
    text: '#f8fafc',
    background: '#0f172a',
    tint: '#f8fafc',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#f8fafc',
  },
};
