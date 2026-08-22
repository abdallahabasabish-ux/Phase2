import { GameState, Scenario } from '@/types';
import { characters1952 } from '@/data/characters/1952';

export function buildInitialState(scenario: Scenario): GameState {
  return {
    currentScenarioId: scenario.id,
    currentEventIndex: 0,
    player: {
      rank: 'junior_officer',
      positionTitleAr: 'ملازم أول، سلاح المشاة',
      politicalInfluence: 5,
      militaryCommandAuthority: 20,
      informationAccess: 30,
      personalLoyaltyMap: {},
    },
    military: structuredClone(scenario.initialMilitary),
    economic: structuredClone(scenario.initialEconomic),
    political: structuredClone(scenario.initialPolitical),
    diplomacy: [
      {
        countryId: 'uk',
        countryNameAr: 'المملكة المتحدة',
        relationScore: -20,
        strategicInterests: ['تأمين قاعدة قناة السويس', 'حماية الرعايا البريطانيين', 'استمرار اتفاقية 1936'],
        militaryCapabilityIndex: 90,
        activeTreaties: ['معاهدة 1936 الأنجلو-مصرية'],
        tensionLevel: 35,
      },
      {
        countryId: 'us',
        countryNameAr: 'الولايات المتحدة',
        relationScore: 10,
        strategicInterests: ['احتواء النفوذ السوفيتي في الشرق الأوسط', 'استقرار قناة السويس'],
        militaryCapabilityIndex: 100,
        activeTreaties: [],
        tensionLevel: 10,
      },
    ],
    characters: structuredClone(characters1952),
    triggeredFlags: [],
    decisionLog: [],
  };
}
