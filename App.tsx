import React, { useMemo, useState } from 'react';
import { scenario01 } from '@/data/scenarios/scenario01';
import { buildInitialState } from '@/engine/gameState';
import { applyDecision } from '@/engine/simulationEngine';
import { DecisionOption, GameState } from '@/types';
import { Dashboard } from '@/components/Dashboard';
import { EventCard } from '@/components/EventCard';
import { Ending } from '@/components/Ending';

const scenario = scenario01;

export default function App() {
  const [state, setState] = useState<GameState>(() => buildInitialState(scenario));

  const currentEvent = scenario.events[state.currentEventIndex];
  const isFinished = state.currentEventIndex >= scenario.events.length;
  const failed = useMemo(
    () => scenario.failureConditions.some((f) => f.isMet(state)),
    [state]
  );

  function handleDecide(decision: DecisionOption) {
    setState((prev) => applyDecision(prev, currentEvent.id, decision));
  }

  function handleRestart() {
    setState(buildInitialState(scenario));
  }

  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="kicker">محاكاة استراتيجية تاريخية توثيقية — السيناريو الأول</div>
        <h1>{scenario.titleAr}</h1>
        <div className="subtitle">{scenario.yearRangeAr} · {scenario.briefingAr.split('\n')[0]}</div>
      </header>

      <Dashboard state={state} />

      {!isFinished && !failed ? (
        <EventCard event={currentEvent} state={state} onDecide={handleDecide} />
      ) : (
        <Ending state={state} scenario={scenario} onRestart={handleRestart} />
      )}
    </div>
  );
}
