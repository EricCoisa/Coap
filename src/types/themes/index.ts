export const Theme = {
  Default: 'Default',
  LiquidGlass: 'LiquidGlass',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];
