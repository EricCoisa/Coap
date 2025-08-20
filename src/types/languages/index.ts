export const Languages = {
  Portuguese: 'pt',
  English: 'en',
} as const;

export type Language = typeof Languages[keyof typeof Languages];
