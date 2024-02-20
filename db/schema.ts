import { mysqlTable, uniqueIndex, varchar, serial, datetime } from 'drizzle-orm/mysql-core';

// auth tables, from Lucia guide https://lucia-auth.com/database/drizzle
export const userTable = mysqlTable("user", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
  username: varchar("username", { length: 255 }).unique(),
  hashed_password: varchar("hashed_password", { length: 255 }),
});

export const sessionTable = mysqlTable("session", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255
	})
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime("expires_at").notNull()
});


export const properties = mysqlTable('properties', {
  id: serial("id").primaryKey(),
  name: varchar('name', { length: 256 }),
}, (properties) => ({
  nameIndex: uniqueIndex('name_idx').on(properties.name),
}));
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;