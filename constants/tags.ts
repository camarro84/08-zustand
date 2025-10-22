export const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
export type Tag = (typeof TAGS)[number]
