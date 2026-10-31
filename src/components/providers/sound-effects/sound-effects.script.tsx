import { COOKIE_NAME, DEFAULT_PREFERENCES, PRESETS } from './components';

/* ///////////////////////////////////////////////// */

// Kept apart from the provider, which reads cookies on the server, so client documents can use it
const SOUND_SCRIPT = `(() => {
  try {
    const entry = document.cookie.split('; ').find((part) => part.startsWith(${JSON.stringify(`${COOKIE_NAME}=`)}));
    const stored = JSON.parse(entry ? decodeURIComponent(entry.slice(${COOKIE_NAME.length + 1})) : '{}');
    const enabled = typeof stored.enabled === 'boolean' ? stored.enabled : ${JSON.stringify(DEFAULT_PREFERENCES.enabled)};
    const preset = ${JSON.stringify(PRESETS)}.includes(stored.preset) ? stored.preset : ${JSON.stringify(DEFAULT_PREFERENCES.preset)};
    const root = document.documentElement;
    root.dataset.sound = enabled ? 'on' : 'off';
    root.dataset.soundPreset = preset;
  } catch {}
})()`;

/* ///////////////////////////////////////////////// */

export const Script = () => {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static script built from constants
  return <script dangerouslySetInnerHTML={{ __html: SOUND_SCRIPT }} />;
};
