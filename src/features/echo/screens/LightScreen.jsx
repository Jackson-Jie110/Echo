import { IconClose, IconImage } from '../components/icons';

export function LightScreen({
  screen,
  aiTyping,
  moods,
  composerOpen,
  moodDraft,
  onComposerOpen,
  onComposerClose,
  onMoodDraftChange,
  onSendMood,
}) {
  return (
    <main className={`screen light-screen ${screen === 'light' ? 'active' : ''}`} data-screen="light">
      <div className="light-header">
        <div className="emoji-bubble">{aiTyping ? '正在倾听' : '慢慢说'}</div>
        <div className="light-partner">伴</div>
        <div className={`thinking-dots ${aiTyping ? 'active' : ''}`}>
          <div className="thinking-dot" />
          <div className="thinking-dot" />
          <div className="thinking-dot" />
        </div>
        <div className="light-guide-text">今天有什么想对自己说的话？</div>
      </div>

      <div className="mood-list">
        {moods.map((mood) => (
          <article key={mood.id} className={`mood-card ${mood.emotion}`}>
            {mood.emotion === 'touched' && <div className="touched-glow" />}
            {mood.emotion === 'sad' && <div className="sad-feather" />}
            {mood.emotion === 'calm' && <div className="calm-dot" />}
            {mood.emotion === 'happy' && (
              <div className="happy-stars">
                <div className="star" />
                <div className="star" />
                <div className="star" />
              </div>
            )}
            <div className="mood-timestamp">{mood.timestampLabel}</div>
            <div className="mood-content">{mood.content}</div>
            <div className={`ai-comment ${mood.pending ? 'pending' : 'show'}`}>
              <div className="ai-avatar">Echo</div>
              <div className="ai-text">{mood.pending ? '让我想一想，我在这里。' : mood.aiComment}</div>
            </div>
          </article>
        ))}
      </div>

      <div className={`input-bar ${composerOpen ? 'expanded' : ''}`} onClick={onComposerOpen}>
        <div className="expanded-header">
          <button
            className="expanded-close-btn"
            type="button"
            title="关闭"
            onClick={(event) => {
              event.stopPropagation();
              onComposerClose();
            }}
          >
            <IconClose />
          </button>
          <div className="expanded-partner">伴</div>
          <div className="expanded-guide">我在倾听...</div>
        </div>

        {!composerOpen && <span className="input-placeholder">此刻在想什么……</span>}

        {composerOpen && (
          <div className="text-input-area" onClick={(event) => event.stopPropagation()}>
            <textarea
              className="text-input"
              value={moodDraft}
              onChange={(event) => onMoodDraftChange(event.target.value)}
              placeholder="写下你的心情..."
            />
            <div className="input-actions">
              <button className="attach-btn" type="button" title="添加配图">
                <IconImage />
              </button>
              <button className="send-btn" type="button" onClick={onSendMood}>
                发送
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
