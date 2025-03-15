export const colors = {
  moonstone: '#47A8BD',
  jet: '#2F2F2F',
  emerald: '#44CF6C',
  sunset: '#F2CC8F',
  saffron: '#F3C969',
} as const;

// Semantic color mapping
export const theme = {
  primary: colors.emerald,
  primaryHover: '#3BB85F', // Slightly darker emerald
  secondary: colors.moonstone,
  text: colors.jet,
  accent: colors.sunset,
  accentAlt: colors.saffron,
  background: '#FFFFFF',
  success: colors.emerald,
  successLight: '#E8F7ED', // Light emerald background
  error: '#DC2626', // Keep red for errors
  errorLight: '#FEE2E2', // Light red background
} as const; 