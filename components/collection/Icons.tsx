const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const BagIcon = () => (
  <svg {...base}><path d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const CheckIcon = () => (<svg {...base}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const ArrowLeft = () => (<svg {...base}><path d="M19 12H5m6-6-6 6 6 6" /></svg>);
export const ArrowRight = () => (<svg {...base}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>);
export const ArrowDown = () => (<svg {...base}><path d="M12 5v14m-6-6 6 6 6-6" /></svg>);
export const ArrowUp = () => (<svg {...base}><path d="M12 19V5m-6 6 6-6 6 6" /></svg>);
export const Chevron = () => (<svg {...base}><path d="m6 9 6 6 6-6" /></svg>);
export const Plus = () => (<svg {...base}><path d="M12 5v14M5 12h14" /></svg>);
export const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /></svg>
);
