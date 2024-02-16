import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial } from 'drizzle-orm/mysql-core';

export const properties = mysqlTable('properties', {
  id: serial("id").primaryKey(),
  name: varchar('name', { length: 256 }),
}, (properties) => ({
  nameIndex: uniqueIndex('name_idx').on(properties.name),
}));
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;

// TODO: users table to mirror Clerk, most likely