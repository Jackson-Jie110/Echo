export function IconSun() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5V5" />
      <path d="M12 19V21.5" />
      <path d="M2.5 12H5" />
      <path d="M19 12h2.5" />
      <path d="M5.2 5.2 7 7" />
      <path d="M17 17l1.8 1.8" />
      <path d="M18.8 5.2 17 7" />
      <path d="M7 17l-1.8 1.8" />
    </svg>
  );
}

export function IconFeather() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19c6.5-2.2 10.7-6.3 13.2-12.5" />
      <path d="M8 16l4-1" />
      <path d="M11 13l4-1" />
      <path d="M14 10l3-1" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="6.5" width="17" height="11" rx="1.5" />
      <path d="M4.5 8 12 13l7.5-5" />
    </svg>
  );
}

export function IconStar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 4.2 2.2 4.6 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7z" />
    </svg>
  );
}

export function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
    </svg>
  );
}

export function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function IconBack() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function IconImage() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

export const ICON_BY_KEY = {
  sun: IconSun,
  feather: IconFeather,
  mail: IconMail,
  star: IconStar,
};
