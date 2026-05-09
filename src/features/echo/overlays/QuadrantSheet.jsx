import { IconClose } from '../components/icons';
import { formatTaskDeadline } from '../utils';

export function QuadrantSheet({ quadrant, quadrantId, onClose, onFocusTask }) {
  if (!quadrant) {
    return null;
  }

  return (
    <div className="quadrant-sheet">
      <div className="sheet-drag-indicator" />
      <div className="quadrant-sheet-header">
        <div>
          <div className="quadrant-sheet-title">{quadrant.name}</div>
          <div className="quadrant-sheet-count">共 {quadrant.tasks.length} 项</div>
        </div>
        <button className="close-sheet-btn" type="button" onClick={onClose}>
          <IconClose />
        </button>
      </div>

      <div className="quadrant-sheet-body">
        {quadrant.tasks.map((task) => (
          <button
            key={task.id}
            className={`task-item ${task.completed ? 'done' : ''}`}
            type="button"
            onClick={() => {
              if (!task.completed) {
                onFocusTask({
                  quadrantId,
                  taskId: task.id,
                });
              }
            }}
          >
            <div className="task-content">
              <div className="task-title">{task.name}</div>
              <div className="task-meta">{formatTaskDeadline(task.deadline)}</div>
            </div>
            <div className={`task-status ${task.completed ? 'done' : ''}`}>
              {task.completed ? '已完成' : '专注'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
