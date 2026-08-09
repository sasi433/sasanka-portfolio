interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface CloudflareEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_RATE_LIMITER?: RateLimitBinding;
}
