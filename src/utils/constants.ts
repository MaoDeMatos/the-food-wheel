export const INITIAL_SPEED = {
  MIN: 1,
  MAX: 9,
};

export const SLOWDOWN_TIME = {
  MIN: 1,
  MAX: 20,
};

const COLORS = [
  'rose-400',
  'teal-500',
  'orange-600',
  'purple-400',
  'lime-600',
  'sky-600',
  'red-600',
  'stone-600',
  'emerald-400',
] as const;

export const SVG_COLORS = COLORS.map((el) => `stroke-${el}`);
export const BADGES_COLORS = COLORS.map((el) => `bg-${el}`);
