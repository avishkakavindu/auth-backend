import { config } from 'dotenv';
config();

interface EnvVariables {
  NODE_ENV: string;
  PORT: number;
  DB_URI: string;
  SMTP_USERNAME: string;
  SMTP_PASSWORD: string;
  SMTP_ENDPOINT: string;
  SMTP_PORT: string;
  ACCESS_TOKEN_PUBLIC_KEY: string;
  ACCESS_TOKEN_PRIVATE_KEY: string;
  REFRESH_PRIVATE_KEY: string;
  REFRESH_PUBLIC_KEY: string;
}

// Define the required environment variables
const requiredEnvVariables: Array<keyof EnvVariables> = [
  'NODE_ENV',
  'PORT',
  'DB_URI',
  'ACCESS_TOKEN_PUBLIC_KEY',
  'ACCESS_TOKEN_PRIVATE_KEY',
  'REFRESH_PRIVATE_KEY',
  'REFRESH_PUBLIC_KEY',
];

export const {
  PORT = 3000,
  DB_URI = '',
  ACCESS_TOKEN_PUBLIC_KEY = '',
  ACCESS_TOKEN_PRIVATE_KEY = '',
  REFRESH_PRIVATE_KEY = '',
  REFRESH_PUBLIC_KEY = '',
} = process.env;

process.env;

function loadEnvVariables(): EnvVariables {
  const env: EnvVariables = {
    NODE_ENV: process.env.NODE_ENV || '',
    PORT: parseInt(process.env.PORT || '4001', 10),
    DB_URI: process.env.DB_URI || '',
    ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY || '',
    ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
    REFRESH_PRIVATE_KEY: process.env.REFRESH_PRIVATE_KEY || '',
    REFRESH_PUBLIC_KEY: process.env.REFRESH_PUBLIC_KEY || '',
    SMTP_USERNAME: process.env.SMTP_USERNAME || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
    SMTP_ENDPOINT: process.env.SMTP_ENDPOINT || '',
    SMTP_PORT: process.env.SMTP_PORT || '',
  };

  // Check if required environment variables are present and not empty
  const missingVariables: string[] = requiredEnvVariables.reduce<string[]>(
    (missing, variable) => {
      if (!env[variable] || String(env[variable]).trim() === '') {
        missing.push(variable);
      }
      return missing;
    },
    []
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Required environment variables are missing or empty: ${missingVariables.join(
        ', '
      )}`
    );
  }

  // Check MAILING variables
  const mailEnvVariables: Array<keyof EnvVariables> = [
    'SMTP_USERNAME',
    'SMTP_PASSWORD',
    'SMTP_ENDPOINT',
    'SMTP_PORT',
  ];

  mailEnvVariables.forEach((variable) => {
    if (!env[variable] || String(env[variable]).trim() === '') {
      console.warn(
        `WARNING: MAIL Env variable ${variable} is missing or empty. MAIL functionality may be limited.`
      );
    }
  });

  return env;
}

export default loadEnvVariables;
