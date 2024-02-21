import { mysqlTable, uniqueIndex, varchar, serial, datetime } from 'drizzle-orm/mysql-core';

// auth tables, from Lucia guide https://lucia-auth.com/database/drizzle
export const usersTable = mysqlTable("user", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
  email: varchar("email", { length: 255 }).unique(),
  hashed_password: varchar("hashed_password", { length: 255 }),
});
export type User = Omit<typeof usersTable.$inferSelect, 'hashed_password'>;

export const sessionsTable = mysqlTable("session", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255
	})
		.notNull(),
		// .references(() => usersTable.id),
	expiresAt: datetime("expires_at").notNull()
});


export const propertiesTable = mysqlTable('properties', {
  id: serial("id").primaryKey(),
  name: varchar('name', { length: 256 }),
}, (properties) => ({
  nameIndex: uniqueIndex('name_idx').on(properties.name),
}));
export type Property = typeof propertiesTable.$inferSelect;
export type NewProperty = typeof propertiesTable.$inferInsert;