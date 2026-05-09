import { TAB_ITEMS } from '../constants';
import { ICON_BY_KEY } from './icons';

export function TabBar({ screen, onNavigate }) {
  return (
    <nav className={`tabbar ${screen === 'home' ? 'hidden-bar' : ''}`}>
      {TAB_ITEMS.map(({ key, label, icon }) => {
        const Icon = ICON_BY_KEY[icon];

        return (
          <button
            key={key}
            className={`tab ${screen === key ? 'active' : ''}`}
            type="button"
            onClick={() => onNavigate(key)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
