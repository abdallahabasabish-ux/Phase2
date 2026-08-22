// core/types.ts
export interface Position {
  x: number;
  y: number;
}

export interface SourceMetadata {
  source: string;
  dateKnown?: string;
  locationKnown?: string;
  photographer?: string;
  collection?: string;
  copyright?: string;
}

export interface DocumentaryImage {
  id: string;
  url: string; // placeholder or real path
  caption: string;
  metadata: SourceMetadata;
}

export interface Character {
  id: string;
  name: string;
  arabicName: string;
  birthYear: number;
  deathYear?: number;
  portrait?: DocumentaryImage;
  biography: string;
  faction: string;
  influence: number; // 0-100
  loyalty: number; // 0-100
  traits: string[];
  historicalRole: string;
}

export interface Player extends Character {
  rank: string;
  position: string;
  politicalCapital: number;
  militaryCommand: number; // 0-100
}

export interface EventOption {
  id: string;
  text: string;
  description: string;
  immediateEffects: (state: GameState) => GameState;
  requirements?: (state: GameState) => boolean;
}

export interface HistoricalEvent {
  id: string;
  date: string; // YYYY-MM-DD
  location: string;
  title: string;
  description: string;
  historicalContext: string;
  images: DocumentaryImage[];
  involvedFigures: string[]; // Character IDs
  playerRole: string;
  options: EventOption[];
  sourceMetadata: SourceMetadata;
  isPlayerCreatedAlternative: boolean;
}

export interface GameState {
  player: Player;
  currentDate: string;
  scenarioId: string;
  politicalInfluence: Record<string, number>; // factionId -> influence
  publicApproval: number;
  militaryReadiness: number;
  budget: number;
  // ...其余经济、外交、军事指标
  completedEvents: string[];
  activeFlags: Record<string, boolean>; // for branching logic
}
