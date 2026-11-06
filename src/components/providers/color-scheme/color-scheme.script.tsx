import { COOKIE_NAME, DARK_MEDIA, DEFAULT_THEME, THEMES } from './components';

/* ///////////////////////////////////////////////// */

// Kept apart from the provider, which reads cookies on the server, so client documents can use it
const THEME_SCRIPT = `(() => {
  try {
    const entry = document.cookie.split('; ').find((part) => part.startsWith(${JSON.stringify(`${COOKIE_NAME}=`)}));
    const stored = entry ? decodeURIComponent(entry.slice(${COOKIE_NAME.length + 1})) : null;
    const theme = ${JSON.stringify(THEMES)}.includes(stored) ? stored : ${JSON.stringify(DEFAULT_THEME)};
    const resolved = theme === 'system' ? (matchMedia(${JSON.stringify(DARK_MEDIA)}).matches ? 'dark' : 'light') : theme;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.dataset.theme = theme;
    root.style.colorScheme = resolved;
  } catch {}
})()`;

/* ///////////////////////////////////////////////// */

export const Script = () => {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static script built from constants
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
};
