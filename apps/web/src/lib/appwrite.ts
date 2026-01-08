import { Client, Account, Databases, Storage, Teams } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

export { client };

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'sportsacademy';

export const COLLECTIONS = {
  CLUBS: 'clubs',
  USERS: 'users',
  TEAMS: 'teams',
  ATHLETES: 'athletes',
  EVENTS: 'events',
  ATTENDANCE: 'attendance',
  SUBSCRIPTIONS: 'subscriptions',
  INVOICES: 'invoices',
  PAYMENTS: 'payments',
  ANNOUNCEMENTS: 'announcements',
  FACILITIES: 'facilities',
  AGE_GROUPS: 'age_groups',
  SPONSORS: 'sponsors',
  PRODUCTS: 'products',
  EXPENSES: 'expenses',
};
