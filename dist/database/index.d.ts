export * from './config';
export * from './schema';
export * from './init';
export type User = typeof import('./schema').users.$inferSelect;
export type NewUser = typeof import('./schema').users.$inferInsert;
//# sourceMappingURL=index.d.ts.map