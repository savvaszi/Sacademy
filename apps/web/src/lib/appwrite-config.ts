export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'sportsacademy',
};

export const validateAppwriteConfig = () => {
  if (!appwriteConfig.projectId) {
    throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set');
  }
  if (!appwriteConfig.endpoint) {
    throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is not set');
  }
  return true;
};
