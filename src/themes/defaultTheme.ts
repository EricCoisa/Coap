export const defaultTheme = {
  name: 'default',
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    cardBackground: '#FFFFFF',
    objectBackground: '#F8FAFC',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    headerBackground: '#FFFFFF',
    headerBorder: '#E5E7EB',
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  boxShadowHover: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  headerShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  zIndex: {
    header: 1000,
    modal: 1100,
    dropdown: 1010,
    tooltip: 1020,
  }
};

export type Theme = typeof defaultTheme;
