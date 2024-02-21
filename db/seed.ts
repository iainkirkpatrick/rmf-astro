import { faker } from '@faker-js/faker';

import { db } from '.';
import { propertiesTable } from './schema';

const NUM_PROPERTIES = 100;

const seedProperties = Array.from({ length: NUM_PROPERTIES }).map(() => ({
	name: faker.location.streetAddress()
}));

await db.delete(propertiesTable);
const result = await db.insert(propertiesTable).values(seedProperties);