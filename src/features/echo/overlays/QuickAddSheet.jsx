import { QUADRANT_META, QUADRANT_ORDER } from '../constants';

export function QuickAddSheet({
  draftTaskName,
  draftTaskDate,
  draftTaskTime,
  draftQuadrantId,
  onTaskNameChange,
  onTaskDateChange,
  onTaskTimeChange,
  onQuadrantChange,
  onConfirm,
}) {
  return (
    <div className="quick-add-sheet">
      <div className="sheet-drag-indicator" />
      <div className="sheet-title">添加一件要完成的小事</div>
      <input
        className="quick-add-input"
        value={draftTaskName}
        onChange={(event) => onTaskNameChange(event.target.value)}
        placeholder="输入任务名称..."
      />

      <div className="form-grid">
        <label className="field-card">
          <span>截止日期</span>
          <input type="date" value={draftTaskDate} onChange={(event) => onTaskDateChange(event.target.value)} />
        </label>
        <label className="field-card">
          <span>时间</span>
          <input type="time" value={draftTaskTime} onChange={(event) => onTaskTimeChange(event.target.value)} />
        </label>
      </div>

      <div className="priority-label">选择象限</div>
      <div className="priority-options">
        {QUADRANT_ORDER.map((quadrantId) => (
          <button
            key={quadrantId}
            className={`priority-option ${draftQuadrantId === quadrantId ? 'selected' : ''} ${quadrantId}`}
            type="button"
            onClick={() => onQuadrantChange(quadrantId)}
          >
            <span className="priority-dot" />
            <span>{QUADRANT_META[quadrantId].name}</span>
          </button>
        ))}
      </div>

      <button className="quick-add-confirm" type="button" onClick={onConfirm}>
        添加
      </button>
    </div>
  );
}
