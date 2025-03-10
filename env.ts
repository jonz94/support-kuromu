import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    ECPAY_API_BASE_URL: z.string().url(),
    ECPAY_ID: z.string(),
    ECPAY_HASH_KEY: z.string(),
    ECPAY_HASH_IV: z.string(),
    ECPAY_DESCRIPTION: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_PAYMENT_TOOLS_WEB_ACTION: z.string().url(),
    NEXT_PUBLIC_PAYMENT_TOOLS_WEB_METHOD: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ECPAY_API_BASE_URL: process.env.ECPAY_API_BASE_URL,
    ECPAY_ID: process.env.ECPAY_ID,
    ECPAY_HASH_KEY: process.env.ECPAY_HASH_KEY,
    ECPAY_HASH_IV: process.env.ECPAY_HASH_IV,
    ECPAY_DESCRIPTION: process.env.ECPAY_DESCRIPTION,
    NEXT_PUBLIC_PAYMENT_TOOLS_WEB_ACTION: process.env.NEXT_PUBLIC_PAYMENT_TOOLS_WEB_ACTION,
    NEXT_PUBLIC_PAYMENT_TOOLS_WEB_METHOD: process.env.NEXT_PUBLIC_PAYMENT_TOOLS_WEB_METHOD,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
