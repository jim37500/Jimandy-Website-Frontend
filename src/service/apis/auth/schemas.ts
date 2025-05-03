import { z } from 'zod';

export const LoginByGoogleResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshAccessTokenResSchema = z.object({
  accessToken: z.string(),
});
