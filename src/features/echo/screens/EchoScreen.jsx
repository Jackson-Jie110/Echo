import { ECHO_FILTERS } from '../constants';
import { IconCalendar } from '../components/icons';

export function EchoScreen({
  screen,
  echoFilter,
  filteredLetters,
  totalLetters,
  unreadLetters,
  onFilterChange,
  onOpenCalendar,
  onOpenLetter,
}) {
  return (
    <main className={`screen echo-screen ${screen === 'echo' ? 'active' : ''}`} data-screen="echo">
      <div className="echo-hero">
        <div className="echo-hero-glow" aria-hidden="true" />
        <div className="echo-hero-copy">
          <div className="echo-kicker">Archive 03</div>
          <div className="echo-title-section">
            <div className="echo-title">回响</div>
            <div className="echo-guide">这是你走过的时光，也是被温柔保存的痕迹。</div>
          </div>
        </div>
        <div className="echo-hero-actions">
          <button className="echo-calendar-btn" type="button" title="日历" onClick={onOpenCalendar}>
            <IconCalendar />
          </button>
        </div>
      </div>

      <div className="echo-stats">
        <div className="echo-stat-card">
          <span>已存档</span>
          <strong>{totalLetters}</strong>
        </div>
        <div className="echo-stat-card">
          <span>未拆封</span>
          <strong>{unreadLetters}</strong>
        </div>
      </div>

      <div className="filter-bar">
        {ECHO_FILTERS.map((filterItem) => (
          <button
            key={filterItem.key}
            className={`filter-item ${echoFilter === filterItem.key ? 'active' : ''}`}
            type="button"
            onClick={() => onFilterChange(filterItem.key)}
          >
            {filterItem.label}
          </button>
        ))}
      </div>

      <div className="echo-section-head">
        <span>本周回响</span>
        <span>打开一封，听见当时的自己</span>
      </div>

      <div className="letters-list">
        {filteredLetters.length === 0 && (
          <div className="empty-letter">这段时间还没有新的回响。给自己一点时间，故事会慢慢长出来。</div>
        )}

        {filteredLetters.map((letter, index) => (
          <button
            key={letter.id}
            className={`envelope-card ${letter.read ? 'read' : 'unread'} ${index === 0 ? 'featured' : ''}`}
            type="button"
            onClick={() => onOpenLetter(letter.id)}
          >
            <div className="envelope-fold-line" />
            <div className="wax-seal" />
            <div className="envelope-content">
              <div className="envelope-head">
                <div className="envelope-date">{letter.dateLabel}</div>
                {index === 0 && <div className="envelope-feature-flag">本周微光</div>}
              </div>
              <div className="envelope-tags">
                {letter.tags.map((tag) => (
                  <span key={tag} className="envelope-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="envelope-summary">{letter.summary}</div>
              <div className="envelope-rail" aria-hidden="true" />
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
