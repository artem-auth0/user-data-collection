import axios from 'axios';
import { PrismaClient } from '@prisma/client';

/**
 * Initialize Prisma Client
 */
const prisma = new PrismaClient();

/**
 * Interface representing the structure of a user from Random User API
 */
interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  location: {
    city: string;
    country: string;
  };
}

/**
 * Fetches random users from the Random User API.
 * @param count Number of users to fetch.
 * @returns Array of user data.
 */
const fetchRandomUsers = async (count: number): Promise<RandomUser[]> => {
  try {
    const response = await axios.get('https://randomuser.me/api/', {
      params: { results: count },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

/**
 * Stores fetched users into the PostgreSQL database.
 * @param users Array of user data.
 */
const storeUsers = async (users: RandomUser[]) => {
  for (const user of users) {
    try {
      // Create User with related Location
      const newUser = await prisma.user.create({
        data: {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          gender: user.gender,
          location: {
            create: {
              city: user.location.city,
              country: user.location.country,
            },
          },
        },
      });
      console.log(`Stored user: ${newUser.name}`);
    } catch (error) {
      console.error('Error storing user:', error);
    }
  }
};

/**
 * Main function to fetch and store users.
 */
const collectData = async () => {
  console.log('Starting data collection...');
  const users = await fetchRandomUsers(5);
  if (users.length > 0) {
    await storeUsers(users);
    console.log('Data collection completed.');
  } else {
    console.log('No users fetched.');
  }
  await prisma.$disconnect();
};

/**
 * Execute the data collection
 */
collectData();