export function ProgressRing({ value, size = 42, stroke = 4, className = '' }) {
  const radius = size / 2 - stroke * 1.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value);

  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="ring-bg"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
      />
      <circle
        className="ring-progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}
