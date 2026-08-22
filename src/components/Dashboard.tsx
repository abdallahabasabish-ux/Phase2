import React from 'react';
import { GameState } from '@/types';
import { StatBar } from './StatBar';
import { IconEconomy, IconMilitary, IconPolitics, IconStability, IconDiplomacy } from './icons';

export const Dashboard: React.FC<{ state: GameState }> = ({ state }) => {
  const uk = state.diplomacy.find((d) => d.countryId === 'uk');
  return (
    <div className="dashboard">
      <StatBar icon={<IconPolitics />} label="تأييد الحكومة" value={state.political.governmentApproval} />
      <StatBar icon={<IconStability />} label="الاستقرار العام" value={state.economic.publicStability} />
      <StatBar icon={<IconEconomy />} label="الإنتاج الزراعي" value={state.economic.agricultureOutputIndex} displayValue={`${state.economic.agricultureOutputIndex}`} />
      <StatBar icon={<IconMilitary />} label="قوة الاحتياط العسكري" value={state.military.reserveStrength} />
      <StatBar
        icon={<IconDiplomacy />}
        label="توتر مع بريطانيا"
        value={uk?.tensionLevel ?? 0}
      />
    </div>
  );
};
