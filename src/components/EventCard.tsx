import React from 'react';
import { HistoricalEventCard, DecisionOption, GameState } from '@/types';
import { IconIntelligence } from './icons';

const confidenceLabel: Record<string, string> = {
  documented: 'موثّق تاريخيًا',
  plausible: 'تفسير تاريخي محتمل',
  player_branch: 'فرع بديل من صنع اللاعب',
};

export const EventCard: React.FC<{
  event: HistoricalEventCard;
  state: GameState;
  onDecide: (decision: DecisionOption) => void;
}> = ({ event, state, onDecide }) => {
  return (
    <div className="event-card">
      <div className={`event-seal confidence-${event.confidence}`}>
        {confidenceLabel[event.confidence]}
      </div>
      <div className="event-meta">
        {event.dateAr} — {event.location}
      </div>
      <h2>{event.id.replace(/^ev_/, '').replace(/_/g, ' ')}</h2>

      <div className="characters-strip">
        {event.involvedCharacterIds.map((cid) => {
          const c = state.characters[cid];
          if (!c) return null;
          return (
            <span className="character-chip" key={cid}>
              <span className="portrait-fallback">{c.fullNameAr[0]}</span>
              {c.fullNameAr}
            </span>
          );
        })}
      </div>

      <p className="event-context">{event.historicalContext}</p>

      {event.image === null && (
        <div className="image-placeholder">
          <IconIntelligence />
          <span>
            لا تتوفر صورة توثيقية مضمّنة لهذا الحدث. عند توفر صورة مرخّصة، تُضاف عبر حقل
            <code> image </code> في نموذج البيانات مع الميتاداتا الكاملة (المصدر، التاريخ، الموقع،
            حالة الترخيص) — لا تُستخدم صور بديلة أو مولّدة كبديل عن التوثيق الحقيقي.
          </span>
        </div>
      )}

      <div className="player-role-box">
        <strong>دورك: </strong>
        {event.playerRole}
      </div>

      <div className="decisions-list">
        {event.decisions.map((d) => (
          <button key={d.id} className="decision-btn" onClick={() => onDecide(d)}>
            <span>{d.labelAr}</span>
            <span className={`decision-outcome-tag ${d.historicalOutcome === 'player_branch' ? 'branch' : ''}`}>
              {d.historicalOutcome === 'documented' ? 'يطابق السجل التاريخي' : 'يحيد عن السجل التاريخي'}
            </span>
          </button>
        ))}
      </div>

      <div className="consequence-panel">
        <div>
          <strong>عواقب فورية: </strong>
          {event.immediateConsequenceAr}
        </div>
        <div style={{ marginTop: 6 }}>
          <strong>عواقب بعيدة المدى: </strong>
          {event.longTermConsequenceAr}
        </div>
        <div className="sources-line">
          المصدر: {event.sources.map((s) => s.source).join(' • ')}
        </div>
      </div>
    </div>
  );
};
