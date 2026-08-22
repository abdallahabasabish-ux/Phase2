import React from 'react';
import { GameState, Scenario } from '@/types';
import { checkObjectives } from '@/engine/simulationEngine';

export const Ending: React.FC<{ state: GameState; scenario: Scenario; onRestart: () => void }> = ({
  state,
  scenario,
  onRestart,
}) => {
  const objectiveResults = checkObjectives(state, scenario.objectives);
  const failed = scenario.failureConditions.some((f) => f.isMet(state));
  const mandatoryMet = objectiveResults.filter((o) => !o.optional).every((o) => o.met);

  return (
    <div className="ending-screen">
      <h2>{failed ? 'انهارت الحركة قبل أن تكتمل' : mandatoryMet ? 'الجمهورية الوليدة' : 'نهاية غير مكتملة'}</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 560, margin: '12px auto' }}>
        {failed
          ? 'أدت قراراتك إلى انهيار الاستقرار العام قبل تثبيت أركان النظام الجديد — نهاية مغايرة تمامًا لما وثّقه التاريخ.'
          : mandatoryMet
          ? 'نجحت الحركة في اجتياز أسابيعها الأولى الحرجة، وأُعلنت الجمهورية المصرية في يونيو ١٩٥٣ كما وثّق التاريخ. لكن الصراع الحقيقي على شكل السلطة لم يبدأ بعد.'
          : 'انتهى السيناريو دون تحقيق كل الأهداف الأساسية.'}
      </p>

      <ul className="objectives-list">
        {objectiveResults.map((o) => {
          const objective = scenario.objectives.find((x) => x.id === o.id)!;
          return (
            <li key={o.id}>
              <span>
                {objective.descriptionAr} {o.optional && '(اختياري)'}
              </span>
              <span className={o.met ? 'badge-met' : 'badge-unmet'}>{o.met ? 'تحقّق' : 'لم يتحقق'}</span>
            </li>
          );
        })}
      </ul>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-gold-dim)' }}>
        السيناريو التالي: {scenario.nextScenarioId ?? 'غير متاح بعد في هذا الإصدار'}
      </p>

      <button className="decision-btn" style={{ display: 'inline-flex', marginTop: 20 }} onClick={onRestart}>
        أعد لعب هذا السيناريو
      </button>
    </div>
  );
};
