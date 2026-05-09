import { IconClose } from '../components/icons';

export function LetterDetailSheet({ letter, onClose }) {
  if (!letter) {
    return null;
  }

  return (
    <div className="letter-detail-sheet">
      <div className="sheet-drag-indicator" />
      <div className="letter-detail-header">
        <button className="close-sheet-btn" type="button" onClick={onClose}>
          <IconClose />
        </button>
      </div>
      <div className="letter-detail-content">
        <article className="paper">
          <div className="paper-date">{letter.dateLabel}</div>
          <div className="paper-quote">{letter.quote}</div>
          <div className="paper-greeting">{letter.greeting}</div>
          <div className="paper-body">{letter.body}</div>
          <div className="paper-signature">
            <div className="signature-avatar">伴</div>
            <div>
              <div>Echo</div>
              <div className="paper-signoff">愿你被自己温柔接住</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
