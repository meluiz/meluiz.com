export type { ContextProviderProps } from './context-provider';
export type {
  Sound,
  SoundName,
  SoundOptions,
  SoundPreferences,
  SoundPreset,
  SoundTrigger,
  UseSoundEffectsReturn,
} from './context-provider.context';

export { ContextProvider } from './context-provider';
export { COOKIE_NAME, DEFAULT_PREFERENCES, PRESETS } from './context-provider.constants';
export { useSoundEffects } from './context-provider.context';
export { toPreferences } from './context-provider.utils';
