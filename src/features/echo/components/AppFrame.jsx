import { IconBack } from './icons';

export function AppFrame({ screen, onHome, children }) {
  return (
    <div className="echo-stage">
      <div className="stage-grain" aria-hidden="true" />
      <div className="stage-glow stage-glow-left" aria-hidden="true" />
      <div className="stage-glow stage-glow-right" aria-hidden="true" />

      <div className="echo-frame">
        <div className="frame-caption">
          <span className="caption-kicker">Echo</span>
          <h1>拾光回响</h1>
          <p>把效率和陪伴放进同一个温柔、克制、能呼吸的数字空间。</p>
        </div>

        <div className="device-stage">
          <div className="app">
            <header className="header" id="page-header">
              <button
                className={`home-btn ${screen === 'home' ? 'hidden' : ''}`}
                type="button"
                aria-label="返回首页"
                title="返回首页"
                onClick={onHome}
              >
                <IconBack />
              </button>
              <div className="header-spacer" />
            </header>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
