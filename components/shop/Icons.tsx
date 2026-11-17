const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const SearchIcon = () => (<svg {...base}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
export const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg {...base} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" /></svg>
);
export const BagIcon = () => (<svg {...base}><path d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>);
export const EyeIcon = () => (<svg {...base}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>);
export const CheckIcon = () => (<svg {...base}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const CloseIcon = () => (<svg {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const ChevronRight = () => (<svg {...base}><path d="m9 6 6 6-6 6" /></svg>);
export const ChevronLeft = () => (<svg {...base}><path d="m15 6-6 6 6 6" /></svg>);
export const FilterIcon = () => (<svg {...base}><path d="M4 6h16M7 12h10M10 18h4" /></svg>);
export const Grid2Icon = () => (<svg {...base}><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>);
export const Grid3Icon = () => (
  <svg {...base}>{[4, 10, 16].flatMap((y) => [4, 10, 16].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="4" height="4" rx=".6" />))}</svg>
);
export const ListIcon = () => (<svg {...base}><rect x="4" y="5" width="5" height="5" rx="1" /><rect x="4" y="14" width="5" height="5" rx="1" /><path d="M12 7h8M12 16h8" /></svg>);
