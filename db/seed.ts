import { faker } from '@faker-js/faker';

import { db } from '.';
import { properties } from './schema';

const NUM_PROPERTIES = 100;

const seedProperties = Array.from({ length: NUM_PROPERTIES }).map(() => ({
	name: faker.location.streetAddress()
}));

await db.delete(properties);
const result = await db.insert(properties).values(seedProperties);