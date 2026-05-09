import { MY_FEATURES } from '../constants';
import { IconChevron } from '../components/icons';
import { ProgressRing } from '../components/ProgressRing';

export function MyScreen({ screen }) {
  return (
    <main className={`screen my-screen ${screen === 'my' ? 'active' : ''}`} data-screen="my">
      <div className="partner-avatar">伙伴形象</div>
      <div className="partner-name">Echo</div>
      <div className="mbti-tag">INFP</div>
      <div className="companion-days">已陪伴 127 天</div>

      <div className="understanding-ring">
        <ProgressRing value={0.7} size={74} stroke={5} className="progress-ring" />
        <div className="understanding-text">70%</div>
      </div>

      <div className="feature-list">
        {MY_FEATURES.map((feature) => (
          <button key={feature} className="feature-card" type="button">
            <span className="feature-text">{feature}</span>
            <div className="feature-arrow">
              <IconChevron />
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
