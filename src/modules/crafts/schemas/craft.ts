import { z } from 'zod';

import { tags } from '../constants';

export const CraftSchema = z.object({
  title: z.string(),
  serial: z.number(),
  description: z.string(),

  date: z.iso.date(),
  tags: z.enum(tags).array().min(1),
  hint: z.string().optional(),

  source: z.string().optional(),

  specs: z.object({ label: z.string(), value: z.string() }).array().default([]),
  status: z.enum(['idea', 'prototype', 'built', 'draft']).default('draft'),
});
