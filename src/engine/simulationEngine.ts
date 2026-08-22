import { DecisionOption, GameState, StateEffect } from '@/types';

/**
 * محرك المحاكاة الأساسي.
 * مسؤول فقط عن: تطبيق تأثيرات القرار على الحالة، وتقييد القيم بين 0-100
 * حيث ينطبق ذلك، وتسجيل القرار في decisionLog. لا يعرف أي شيء عن React
 * أو الواجهة — يمكن اختباره بشكل مستقل تمامًا (unit tests).
 */

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

function applyEffect(state: GameState, effect: StateEffect): GameState {
  const next: GameState = structuredClone(state);

  const [scope, ...rest] = effect.target.split('.');

  if (scope === 'political' && rest[0] === 'governmentApproval') {
    next.political.governmentApproval = clamp(
      next.political.governmentApproval + (effect.delta ?? 0)
    );
  } else if (scope === 'political' && rest[0] === 'martialLawActive') {
    if (typeof effect.setValue === 'boolean') next.political.martialLawActive = effect.setValue;
  } else if (scope === 'political' && rest[0] === 'partiesLegal') {
    if (typeof effect.setValue === 'boolean') next.political.partiesLegal = effect.setValue;
  } else if (scope === 'economic' && rest[0] === 'publicStability') {
    next.economic.publicStability = clamp(next.economic.publicStability + (effect.delta ?? 0));
  } else if (scope === 'economic' && rest[0] === 'inflationRate') {
    next.economic.inflationRate = Math.max(0, next.economic.inflationRate + (effect.delta ?? 0));
  } else if (scope === 'economic' && rest[0] === 'agricultureOutputIndex') {
    next.economic.agricultureOutputIndex = Math.max(
      0,
      next.economic.agricultureOutputIndex + (effect.delta ?? 0)
    );
  } else if (scope === 'military' && rest[0] === 'reserveStrength') {
    next.military.reserveStrength = clamp(next.military.reserveStrength + (effect.delta ?? 0));
  } else if (scope === 'military' && rest[0] === 'commandDelayHours') {
    next.military.commandDelayHours = Math.max(
      0,
      next.military.commandDelayHours + (effect.delta ?? 0)
    );
  } else if (scope === 'faction') {
    const factionKey = rest[0] as keyof typeof next.political.factionInfluence;
    next.political.factionInfluence[factionKey] = clamp(
      next.political.factionInfluence[factionKey] + (effect.delta ?? 0)
    );
  } else if (scope === 'character') {
    const [charId, field] = rest;
    const character = next.characters[charId];
    if (character && (field === 'loyalty' || field === 'influence')) {
      character[field] = clamp(character[field] + (effect.delta ?? 0));
    }
  }

  return next;
}

export function applyDecision(
  state: GameState,
  eventId: string,
  decision: DecisionOption
): GameState {
  let next = state;
  for (const effect of decision.immediateEffects) {
    next = applyEffect(next, effect);
  }
  next = structuredClone(next);
  next.triggeredFlags = [...next.triggeredFlags, ...(decision.longTermFlags ?? [])];
  next.decisionLog = [
    ...next.decisionLog,
    { eventId, decisionId: decision.id, timestamp: Date.now() },
  ];
  next.currentEventIndex += 1;
  return next;
}

export function checkObjectives(state: GameState, objectives: { id: string; isMet: (s: GameState) => boolean; optional: boolean }[]) {
  return objectives.map((obj) => ({ id: obj.id, met: obj.isMet(state), optional: obj.optional }));
}
