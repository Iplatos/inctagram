namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_MODE: 'development' | 'production';
    NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY: string;
    NEXT_PUBLIC_URL: string;
  }
}
