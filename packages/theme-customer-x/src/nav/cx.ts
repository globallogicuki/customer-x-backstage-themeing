/** Tiny classnames helper (avoids pulling in a dependency for the nav). */
export const cx = (...names: Array<string | false | null | undefined>) =>
  names.filter(Boolean).join(' ');
