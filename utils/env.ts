import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV_NAME = process.env.ENV_NAME || 'dev';
const envFile = path.resolve(__dirname, `../config/env/.env.${ENV_NAME}`);
dotenv.config({ path: envFile, override: true });

function required(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;
    if (value === undefined || value === '') {
        throw new Error(`Missing required environment variable: ${name} loaded from ${envFile}`);
    }
    return value;
}

function bool(value: string | undefined, fallback: boolean): boolean {
    if (value === undefined) return fallback;
    return ['1', 'true', 'yes'].includes(value.toLowerCase());
}

export const env = {
    ENV_NAME,
    BASE_URL: required('BASE_URL'),
    API_URL: required('API_URL'),
    USERNAME: required('USERNAME'),
    PASSWORD: required('PASSWORD'),
    HEADLESS: bool(process.env.HEADLESS, true),
}
