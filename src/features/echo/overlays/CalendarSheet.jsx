import { WEEKDAY_LABELS } from '../constants';
import { buildCalendarDays, formatMonthLabel } from '../utils';

export function CalendarSheet({
  monthDate,
  markedDates,
  clickable = false,
  onPrev,
  onNext,
  onSelectDateKey,
}) {
  const days = buildCalendarDays(monthDate, markedDates);

  return (
    <div className="calendar-sheet">
      <div className="sheet-drag-indicator" />
      <div className="calendar-header">
        <div className="calendar-title">{formatMonthLabel(monthDate)}</div>
        <div className="calendar-nav">
          <button type="button" onClick={onPrev}>
            ‹
          </button>
          <button type="button" onClick={onNext}>
            ›
          </button>
        </div>
      </div>
      <div className={`calendar-grid ${clickable ? 'clickable' : ''}`}>
        {WEEKDAY_LABELS.map((weekday) => (
          <div key={weekday} className="calendar-weekday">
            {weekday}
          </div>
        ))}
        {days.map((day) => {
          const className = `calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${
            day.isToday ? 'today' : ''
          } ${day.isMarked ? 'marked' : ''}`;

          if (!clickable) {
            return (
              <div key={day.dateKey} className={className}>
                <span>{day.label}</span>
                {day.isMarked && <div className="day-dot" />}
              </div>
            );
          }

          return (
            <button
              key={day.dateKey}
              className={className}
              type="button"
              onClick={() => onSelectDateKey(day.dateKey)}
            >
              <span>{day.label}</span>
              {day.isMarked && <div className="day-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
