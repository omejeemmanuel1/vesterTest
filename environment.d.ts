/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace NodeJS {
  interface ProcessEnv {
    ENV: "development" | "production" | "test";
    REACT_APP_HASH: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_WS_URI: string;
  }
}
interface Window {
  Stripe: any;
}
