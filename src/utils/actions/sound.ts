import { cookies } from 'next/headers';
import z from 'zod';

export type SoundState = z.infer<typeof SoundScheme>;

/* ///////////////////////////////////////////////// */

export const SoundScheme = z
  .object({
    enabled: z.boolean().catch(true),
    volume: z.number().min(0).max(1).catch(1),
  })
  .catch({ enabled: true, volume: 1 });

/* ///////////////////////////////////////////////// */

export const SOUND_COOKIE = 'prefers-sound';

/* ///////////////////////////////////////////////// */

const read = async () => {
  const cookie = await cookies();
  return {
    clientSound: cookie.get(SOUND_COOKIE)?.value,
  };
};

const resolve = (cookie?: string): SoundState => {
  const parsed = safeJson(cookie);
  return SoundScheme.parse(parsed) satisfies SoundState;
};

const state = async (): Promise<SoundState> => {
  const { clientSound } = await read();
  return resolve(clientSound);
};

const safeJson = (value?: string): unknown => {
  if (value == null) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

export const sound = Object.assign(read, {
  read,
  state,
  resolve,
});
