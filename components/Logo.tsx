export default function Logo({ dot = "#d8d8d8" }: { dot?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 2l2.6 6.3L25 5.7l-2.6 6.3L29 14.6l-6.6 1.4L25 22.3l-6.4-2.6L16 30l-2.6-10.3L7 22.3l2.6-6.3L3 14.6l6.6-2.6L7 5.7l6.4 2.6z" />
      <circle cx="16" cy="16" r="3.4" fill={dot} />
    </svg>
  );
}
