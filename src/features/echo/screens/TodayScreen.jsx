import { QUADRANT_ORDER } from '../constants';
import { IconCalendar, IconChevron, IconPlus } from '../components/icons';
import { ProgressRing } from '../components/ProgressRing';

export function TodayScreen({
  screen,
  energy,
  energyModel,
  quadrants,
  completedTasks,
  totalTasks,
  completionRatio,
  latestMoodToday,
  onEnergyChange,
  onOpenTodayCalendar,
  onOpenQuickAdd,
  onOpenQuadrant,
  onNavigateLight,
}) {
  return (
    <main className={`screen today-screen ${screen === 'today' ? 'active' : ''}`} data-screen="today">
      <div className="today-header">
        <div className="today-user">
          <div className="avatar">伴</div>
          <div className="greeting-block">
            <span className="greeting-text">下午好</span>
            <span className="greeting-care">{energyModel.care}</span>
          </div>
        </div>
        <div className="today-actions">
          <button className="icon-btn" type="button" title="日历" onClick={onOpenTodayCalendar}>
            <IconCalendar />
          </button>
          <button className="icon-btn" type="button" title="添加任务" onClick={onOpenQuickAdd}>
            <IconPlus />
          </button>
        </div>
      </div>

      <div className="energy-bar">
        <div className="energy-title">当下的精力条</div>
        <div className="energy-labels">
          <span>电量耗尽</span>
          <span>精力满满</span>
        </div>
        <div className="energy-track">
          <div className="energy-fill" style={{ width: `${energy}%` }} />
          <div className="energy-thumb" style={{ left: `${energy}%` }} />
          <input
            className="energy-input"
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(event) => onEnergyChange(Number(event.target.value))}
            aria-label="当前能量值"
          />
        </div>
        <div className="energy-reminder">{energyModel.reminder}</div>
      </div>

      <div className="quadrants">
        {QUADRANT_ORDER.map((quadrantId) => {
          const quadrant = quadrants[quadrantId];
          const isRecommended = energyModel.recommendedQuadrant === quadrantId;

          return (
            <button
              key={quadrantId}
              className={`quadrant-card ${quadrantId} ${isRecommended ? 'recommended' : 'dimmed'}`}
              type="button"
              onClick={() => onOpenQuadrant(quadrantId)}
            >
              <div className="quadrant-label">{quadrant.shortName}</div>
              <div className="quadrant-name">{quadrant.name}</div>
              <div className="quadrant-count">{quadrant.tasks.length}</div>
            </button>
          );
        })}
      </div>

      <div className="summary-cards">
        <div className="summary-card task-summary-card">
          <div className="summary-label">今天已完成</div>
          <div className="summary-count">
            <span className="summary-number done">{completedTasks}</span>
            <span className="summary-slash">/</span>
            <span className="summary-number">{totalTasks}</span>
            <span className="summary-unit">项任务</span>
          </div>
          <div className="summary-caption">
            {completedTasks === totalTasks
              ? '今天很充实，每一件事都被认真回应了。'
              : '继续往前，不必一次把一切做完。'}
          </div>
          <div className="progress-ring-wrap">
            <ProgressRing value={completionRatio} size={58} stroke={4} className="progress-ring" />
          </div>
        </div>

        <button className="summary-card mood-summary-card" type="button" onClick={onNavigateLight}>
          <div className="mood-summary-content">
            <div className={`mood-dot ${latestMoodToday ? latestMoodToday.emotion : 'empty'}`} />
            <div>
              <div className="summary-label">此刻心情</div>
              <div className="mood-text">
                {latestMoodToday ? latestMoodToday.content : '今天还没有留下情绪记录'}
              </div>
            </div>
          </div>
          <div className="mood-arrow">
            <IconChevron />
          </div>
        </button>
      </div>
    </main>
  );
}
