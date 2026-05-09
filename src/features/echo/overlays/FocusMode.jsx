import { IconBack } from '../components/icons';
import { formatTaskDeadline } from '../utils';

export function FocusMode({ quadrantName, task, countdown, reminder, onBack, onComplete }) {
  if (!task || !countdown) {
    return null;
  }

  return (
    <div className="focus-mode">
      <div className="focus-header">
        <button className="focus-back-btn" type="button" onClick={onBack}>
          <IconBack />
        </button>
      </div>
      <div className="focus-content">
        <div className="focus-kicker">{quadrantName}</div>
        <div className="focus-task-name">{task.name}</div>
        <div className="focus-deadline">{formatTaskDeadline(task.deadline)}</div>
        <div className={`focus-countdown ${countdown.overdue ? 'overdue' : ''}`}>{countdown.text}</div>
        <div className="focus-partner">伴</div>
        <div className="partner-reminder">{reminder}</div>
      </div>
      <div className="focus-footer">
        <button className="focus-complete-btn" type="button" onClick={onComplete}>
          完成
        </button>
      </div>
    </div>
  );
}
