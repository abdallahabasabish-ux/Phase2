/**
 * ============================================================
 * نماذج البيانات الأساسية
 * ============================================================
 * هذا الملف هو "العقد" الذي تلتزم به كل بيانات اللعبة التاريخية.
 * الهدف: فصل المحتوى التاريخي (JSON/TS data) عن منطق المحاكاة
 * وعن العرض (UI)، حتى يمكن تدقيق كل حدث ومصدره بشكل مستقل،
 * وحتى يمكن إضافة سيناريوهات جديدة دون لمس محرك اللعبة.
 */

// ------------------------------------------------------------
// مستوى موثوقية المعلومة التاريخية — عنصر إلزامي حسب متطلبات المشروع
// ------------------------------------------------------------
export type HistoricalConfidence =
  | 'documented'   // حقيقة موثقة بمصادر أولية/أكاديمية متعددة
  | 'plausible'    // تفسير تاريخي معقول لكن غير مؤكد بالتفصيل (نية، حوار داخلي، تفاصيل دقيقة)
  | 'player_branch'; // نتيجة نشأت فقط بسبب قرار اللاعب، وتخرج عن السجل التاريخي الموثق

export interface SourceMetadata {
  /** اسم المصدر أو الأرشيف (مثال: "الهيئة العامة للاستعلامات"، "National Archives (UK), FO 371") */
  source: string;
  /** رابط أو رقم وثيقة إن وجد */
  reference?: string;
  /** تاريخ الحدث كما هو موثق؛ استخدم null إن كان غير مؤكد بدلاً من اختلاقه */
  date: string | null;
  /** مستوى الثقة في هذه المعلومة تحديدًا */
  confidence: HistoricalConfidence;
  /** ملاحظة تفسر سبب عدم اليقين، إن وجد */
  uncertaintyNote?: string;
}

// ------------------------------------------------------------
// الصور التوثيقية
// ------------------------------------------------------------
/**
 * ملاحظة مهمة: هذا المشروع لا يضمّن أي صورة فوتوغرافية حقيقية داخل الكود،
 * لأن ذلك يتطلب ترخيصًا فعليًا من الأرشيف المالك (مثال: الأرشيف المصري،
 * Getty Images، مؤسسة الأهرام، إلخ). الحقل `assetPath` يُترك فارغًا عمدًا
 * حتى يضيف فريق الإنتاج الصورة المرخصة فعليًا، مع تعبئة كل حقول الميتاداتا
 * التالية. الواجهة تعرض بديلاً بصريًا صريحًا (أيقونة + نص) بدل اختلاق صورة.
 */
export interface HistoricalImage {
  assetPath: string | null; // null = لم تُضَف الصورة المرخصة بعد
  caption: string;
  source: string;
  photographerOrCollection: string | null;
  dateTaken: string | null;
  locationTaken: string | null;
  licenseStatus: 'public_domain' | 'licensed' | 'requires_licensing' | 'unknown';
}

// ------------------------------------------------------------
// الشخصيات التاريخية
// ------------------------------------------------------------
export type Faction =
  | 'free_officers'
  | 'royal_court'
  | 'wafd'
  | 'muslim_brotherhood'
  | 'communist_left'
  | 'british_administration'
  | 'us_state_department'
  | 'independent';

export interface PersonalityTraits {
  /** كل سمة من -100 إلى 100، تُستخدم في محرك القرارات لتحديد رد فعل الشخصية */
  pragmatism: number; // عملي vs أيديولوجي
  authoritarianism: number; // ميل للسيطرة الفردية vs جماعية
  riskTolerance: number;
  populism: number;
}

export interface HistoricalCharacter {
  id: string;
  fullNameAr: string;
  fullNameEn: string;
  portrait: HistoricalImage | null;
  biography: string;
  position: string; // المنصب وقت السيناريو
  faction: Faction;
  /** نفوذ سياسي/عسكري حالي من 0-100، يتغير أثناء اللعب */
  influence: number;
  /** ولاء الشخصية للاعب أو للفصيل الحاكم، 0-100 */
  loyalty: number;
  relationships: { characterId: string; relationTag: string; strength: number }[];
  personality: PersonalityTraits;
  historicalRole: string;
  decisionPreferences: string[]; // وصف نصي لتفضيلات القرار، يُستخدم في توليد ردود الفعل
  sources: SourceMetadata[];
}

// ------------------------------------------------------------
// النظام العسكري
// ------------------------------------------------------------
export interface MilitaryUnit {
  id: string;
  nameAr: string;
  type: 'infantry' | 'armor' | 'artillery' | 'air' | 'naval' | 'command';
  strength: number; // نسبة القوة الحالية 0-100
  morale: number;
  readiness: number;
  ammunition: number;
  fuel: number;
  location: string;
  entrenched: boolean;
}

export interface MilitaryState {
  units: MilitaryUnit[];
  commandDelayHours: number; // زمن وصول الأوامر - يعكس ضعف الاتصالات في الحقبة
  supplyLineIntegrity: number; // 0-100
  reserveStrength: number;
}

// ------------------------------------------------------------
// النظام الاقتصادي
// ------------------------------------------------------------
export interface EconomicState {
  stateBudgetEgp: number; // بالجنيه المصري وقت الحدث
  taxRevenue: number;
  militarySpendingShare: number; // نسبة مئوية من الموازنة
  civilianSpendingShare: number;
  foreignCurrencyReserves: number;
  agricultureOutputIndex: number; // مؤشر نسبي (100 = خط الأساس عام 1952)
  industrialOutputIndex: number;
  inflationRate: number;
  unemploymentRate: number;
  cottonExportVolume: number; // القطن كان العمود الفقري للصادرات المصرية
  publicStability: number; // 0-100، يتأثر بكل ما سبق
}

// ------------------------------------------------------------
// النظام السياسي
// ------------------------------------------------------------
export interface PoliticalState {
  headOfStateId: string | null;
  governmentApproval: number; // 0-100
  factionInfluence: Record<Faction, number>;
  activeMinistries: { name: string; ministerId: string | null }[];
  martialLawActive: boolean;
  partiesLegal: boolean;
}

// ------------------------------------------------------------
// الدبلوماسية
// ------------------------------------------------------------
export interface DiplomaticRelation {
  countryId: string;
  countryNameAr: string;
  relationScore: number; // -100 إلى 100
  strategicInterests: string[];
  militaryCapabilityIndex: number;
  activeTreaties: string[];
  tensionLevel: number; // 0-100
}

// ------------------------------------------------------------
// نظام القرارات والأحداث
// ------------------------------------------------------------
export interface DecisionOption {
  id: string;
  labelAr: string;
  /** الشروط اللازمة لظهور هذا الخيار (رتبة، نفوذ، معلومة متاحة...) */
  requirement?: string;
  immediateEffects: StateEffect[];
  longTermFlags?: string[]; // أعلام تُفعّل أحداثًا لاحقة في نفس السيناريو أو السيناريو التالي
  historicalOutcome: HistoricalConfidence; // هل هذا الخيار يطابق ما حدث فعليًا أم فرع بديل
}

export interface StateEffect {
  target:
    | 'political.governmentApproval'
    | 'political.martialLawActive'
    | 'political.partiesLegal'
    | 'economic.publicStability'
    | 'economic.inflationRate'
    | 'economic.agricultureOutputIndex'
    | 'military.reserveStrength'
    | 'military.commandDelayHours'
    | `faction.${Faction}`
    | `character.${string}.loyalty`
    | `character.${string}.influence`;
  delta?: number;
  setValue?: number | boolean;
}

export interface HistoricalEventCard {
  id: string;
  dateAr: string;
  dateISO: string | null;
  location: string;
  historicalContext: string;
  image: HistoricalImage | null;
  involvedCharacterIds: string[];
  /** دور اللاعب في هذا الحدث تحديدًا (قد يختلف عن منصبه العام) */
  playerRole: string;
  decisions: DecisionOption[];
  immediateConsequenceAr: string;
  longTermConsequenceAr: string;
  sources: SourceMetadata[];
  confidence: HistoricalConfidence;
}

// ------------------------------------------------------------
// السيناريو
// ------------------------------------------------------------
export interface ScenarioObjective {
  id: string;
  descriptionAr: string;
  optional: boolean;
  isMet: (state: GameState) => boolean;
}

export interface Scenario {
  id: string;
  titleAr: string;
  yearRangeAr: string;
  briefingAr: string;
  events: HistoricalEventCard[];
  objectives: ScenarioObjective[];
  failureConditions: ScenarioObjective[];
  initialMilitary: MilitaryState;
  initialEconomic: EconomicState;
  initialPolitical: PoliticalState;
  characterIds: string[]; // مرجع لقاعدة بيانات الشخصيات
  nextScenarioId: string | null;
}

// ------------------------------------------------------------
// حالة اللعب الكاملة (Simulation State - منفصلة عن حالة العرض)
// ------------------------------------------------------------
export type PlayerRank =
  | 'junior_officer'
  | 'staff_officer'
  | 'committee_member'
  | 'ministerial_advisor'
  | 'minister'
  | 'rcc_member'
  | 'head_of_state';

export interface PlayerState {
  rank: PlayerRank;
  positionTitleAr: string;
  politicalInfluence: number; // 0-100
  militaryCommandAuthority: number; // 0-100
  informationAccess: number; // 0-100 - يحدد أي الخيارات مرئية للاعب
  personalLoyaltyMap: Record<string, number>; // من الشخصيات الأخرى تجاه اللاعب
}

export interface GameState {
  currentScenarioId: string;
  currentEventIndex: number;
  player: PlayerState;
  military: MilitaryState;
  economic: EconomicState;
  political: PoliticalState;
  diplomacy: DiplomaticRelation[];
  characters: Record<string, HistoricalCharacter>;
  triggeredFlags: string[];
  decisionLog: { eventId: string; decisionId: string; timestamp: number }[];
}
