import { ICON_BY_KEY } from '../components/icons';
import { ProgressRing } from '../components/ProgressRing';

function trimPreview(value, maxLength = 10) {
  if (!value) {
    return '';
  }

  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

export function HomeScreen({
  screen,
  pendingEntry,
  completedTasks,
  totalTasks,
  completionRatio,
  latestMoodToday,
  unreadLetters,
  onOpen,
}) {
  const moodPreview = latestMoodToday ? trimPreview(latestMoodToday.content, 11) : '还没有留下心情';
  const homeCards = [
    {
      key: 'today',
      label: '今日待办',
      value: totalTasks,
      meta: `已完成 ${completedTasks}/${totalTasks}`,
      icon: 'sun',
      accessory: <ProgressRing value={completionRatio} size={46} stroke={4} className="home-card-ring" />,
    },
    {
      key: 'light',
      label: '今日心情',
      value: moodPreview,
      meta: latestMoodToday ? '去看看今天的心绪' : '写下此刻的感受',
      icon: 'feather',
    },
    {
      key: 'echo',
      label: '未读信件',
      value: `${unreadLetters}封新信`,
      meta: '打开时光回响',
      icon: 'mail',
    },
    {
      key: 'my',
      label: 'Echo亲密度',
      value: '70%',
      meta: '已陪伴 127 天',
      icon: 'star',
      accessory: <div className="home-intimacy-bar"><span style={{ width: '70%' }} /></div>,
    },
  ];

  return (
    <main className={`screen home-screen ${screen === 'home' ? 'active' : ''}`} data-screen="home">
      <div className="home-atmosphere" aria-hidden="true">
        <div className="home-orbit home-orbit-left" />
        <div className="home-orbit home-orbit-right" />
      </div>

      <div className="partner-shell">
        <div className="partner">伙伴</div>
      </div>

      <div className="home-enter-hint">Echo 已在这里</div>
      <div className="greeting">按自己的节奏来，今天也慢慢展开</div>

      <div className="quick-entry">
        {homeCards.map(({ key, label, value, meta, icon, accessory }) => {
          const Icon = ICON_BY_KEY[icon];

          return (
            <button
              key={key}
              className={`entry-btn ${pendingEntry === key ? 'bounce' : ''}`}
              type="button"
              onClick={() => onOpen(key)}
            >
              <div className="entry-card-copy">
                <div className="home-card-top">
                  <div className="entry-icon-wrap">
                    <Icon />
                  </div>
                  {accessory}
                </div>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{meta}</small>
              </div>
            </button>
          );
        })}
      </div>

      <div className="home-quote">“把今天轻轻放好，明天会接住它。”</div>
    </main>
  );
}
