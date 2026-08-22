import { Scenario, GameState } from '@/types';
import { scenario01Events } from '../events/scenario01_1952';

export const scenario01: Scenario = {
  id: 'scenario_01_1952',
  titleAr: 'مصر، ١٩٥٢: ليلة التغيير',
  yearRangeAr: '١٩٥٢ – ١٩٥٣',
  briefingAr: `
تموز/يوليو ١٩٥٢. مصر تحت حكم ملكي تهزّه فضائح الفساد وهزيمة حرب فلسطين ١٩٤٨
وحريق القاهرة في يناير الماضي. داخل الجيش، ينظّم تنظيم سري يعرف باسم
"الضباط الأحرار" لحركة تستهدف الإطاحة بالملك فاروق وإنهاء النفوذ البريطاني
المستمر منذ عام ١٨٨٢.

أنت ضابط شاب داخل هذا التنظيم. لست من القيادات المعروفة تاريخيًا — دورك أن
تنفّذ، تراقب، وتقرر كيف تتصرف في اللحظات الحرجة التي تمر أمامك، بينما يتشكل
حولك حدث سيغيّر مسار مصر الحديث بالكامل.

هدفك في هذا السيناريو: أن تنجو الحركة من أسابيعها الأولى الحرجة دون تدخل
عسكري بريطاني مباشر، ودون انهيار في الاستقرار الداخلي، وأن تبني موقعًا
شخصيًا يؤهلك للتقدّم داخل هيكل السلطة الجديد.
  `.trim(),
  events: scenario01Events,
  objectives: [
    {
      id: 'obj_avoid_british_intervention',
      descriptionAr: 'تجنّب أي تدخل عسكري بريطاني مباشر من قاعدة قناة السويس',
      optional: false,
      isMet: (state: GameState) =>
        state.diplomacy.find((d) => d.countryId === 'uk')?.tensionLevel !== undefined
          ? (state.diplomacy.find((d) => d.countryId === 'uk')!.tensionLevel < 70)
          : true,
    },
    {
      id: 'obj_stability',
      descriptionAr: 'حافظ على الاستقرار العام فوق مستوى الانهيار',
      optional: false,
      isMet: (state: GameState) => state.economic.publicStability >= 25,
    },
    {
      id: 'obj_reach_republic',
      descriptionAr: 'وصول الحدث الأخير: إعلان الجمهورية دون انقلاب مضاد',
      optional: false,
      isMet: (state: GameState) => state.currentEventIndex >= scenario01Events.length,
    },
    {
      id: 'obj_personal_standing',
      descriptionAr: '(اختياري) اربح ثقة ناصر الشخصية (ولاء ≥ 70) لتحسين موقعك في السيناريو القادم',
      optional: true,
      isMet: (state: GameState) => (state.characters['nasser']?.loyalty ?? 0) >= 70,
    },
  ],
  failureConditions: [
    {
      id: 'fail_stability_collapse',
      descriptionAr: 'انهيار الاستقرار العام (أقل من 15) يؤدي إلى فوضى تفتح الباب لتدخل خارجي',
      optional: false,
      isMet: (state: GameState) => state.economic.publicStability < 15,
    },
  ],
  initialMilitary: {
    units: [
      {
        id: 'unit_cairo_garrison',
        nameAr: 'حامية القاهرة',
        type: 'infantry',
        strength: 80,
        morale: 65,
        readiness: 70,
        ammunition: 90,
        fuel: 85,
        location: 'القاهرة',
        entrenched: true,
      },
      {
        id: 'unit_armor_reserve',
        nameAr: 'كتيبة مدرعات احتياطية',
        type: 'armor',
        strength: 60,
        morale: 60,
        readiness: 50,
        ammunition: 75,
        fuel: 70,
        location: 'العباسية',
        entrenched: false,
      },
    ],
    commandDelayHours: 3,
    supplyLineIntegrity: 75,
    reserveStrength: 55,
  },
  initialEconomic: {
    stateBudgetEgp: 180_000_000,
    taxRevenue: 95_000_000,
    militarySpendingShare: 22,
    civilianSpendingShare: 38,
    foreignCurrencyReserves: 150_000_000,
    agricultureOutputIndex: 100,
    industrialOutputIndex: 100,
    inflationRate: 4.2,
    unemploymentRate: 15,
    cottonExportVolume: 100,
    publicStability: 55,
  },
  initialPolitical: {
    headOfStateId: 'farouk',
    governmentApproval: 40,
    factionInfluence: {
      free_officers: 30,
      royal_court: 50,
      wafd: 35,
      muslim_brotherhood: 25,
      communist_left: 10,
      british_administration: 60,
      us_state_department: 20,
      independent: 10,
    },
    activeMinistries: [{ name: 'رئاسة الوزراء', ministerId: null }],
    martialLawActive: false,
    partiesLegal: true,
  },
  characterIds: ['naguib', 'nasser', 'amer', 'farouk', 'britishAmbassador'],
  nextScenarioId: 'scenario_02_1954',
};
