import { HOME_ENTRY_ITEMS } from '../constants';
import { ICON_BY_KEY } from '../components/icons';

export function HomeScreen({ screen, pendingEntry, onOpen }) {
  return (
    <main className={`screen home-screen ${screen === 'home' ? 'active' : ''}`} data-screen="home">
      <div className="home-atmosphere" aria-hidden="true">
        <div className="home-orbit home-orbit-left" />
        <div className="home-orbit home-orbit-right" />
      </div>

      <div className="partner-shell">
        <div className="partner">伙伴</div>
      </div>

      <div className="greeting">今天也可以不用太满，先让自己安静地亮起来。</div>

      <div className="quick-entry">
        {HOME_ENTRY_ITEMS.map(({ key, label, icon }) => {
          const Icon = ICON_BY_KEY[icon];

          return (
            <button
              key={key}
              className={`entry-btn ${pendingEntry === key ? 'bounce' : ''}`}
              type="button"
              onClick={() => onOpen(key)}
            >
              <div className="entry-card-copy">
                <div className="entry-icon-wrap">
                  <Icon />
                </div>
                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}
