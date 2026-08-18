const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  purple: '\x1b[38;2;173;127;168m',
};

const write = (level: 'debug' | 'info' | 'warn' | 'error', ...args: unknown[]) => {
  // Errors and warnings always print — including production builds,
  // where a failing env check must still surface a reason.
  const isAlwaysOn = level === 'error' || level === 'warn';

  if (!isAlwaysOn && process.env.NODE_ENV !== 'development') {
    return;
  }

  console[level](...args);
};

export const log = Object.assign(write, {
  debug: (...args: unknown[]) => {
    return write('debug', ` ${colors.dim}○${colors.reset}`, ...args);
  },
  info: (...args: unknown[]) => {
    return write('info', ` ${colors.purple}▲${colors.reset}`, ...args);
  },
  event: (...args: unknown[]) => {
    return write('info', ` ${colors.dim}○${colors.reset}`, ...args);
  },
  ready: (...args: unknown[]) => {
    return write('info', ` ${colors.green}✓${colors.reset}`, ...args);
  },
  warn: (...args: unknown[]) => {
    return write('warn', ` ${colors.yellow}⚠${colors.reset}`, ...args);
  },
  error: (...args: unknown[]) => {
    return write('error', ` ${colors.red}⨯${colors.reset}`, ...args);
  },
});
