import { z } from 'zod';
import type { LoginByGoogleResSchema, RefreshAccessTokenResSchema } from './schemas';

export type LoginByGoogleResType = z.infer<typeof LoginByGoogleResSchema>;
export type RefreshefreshAccessTokenResType = z.infer<typeof RefreshAccessTokenResSchema>;

export type LoginByGoogleParamsType = {
  Name: string;
  Email: string;
};
