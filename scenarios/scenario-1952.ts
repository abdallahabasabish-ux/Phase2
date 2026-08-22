// scenarios/scenario-1952.ts
import { Scenario, HistoricalEvent, EventOption, GameState } from '../core/types';

// تعريف الشخصيات الرئيسية (اختصار للعرض)
export const characters_1952: Character[] = [
  { id: 'nasser', name: 'Gamal Abdel Nasser', arabicName: 'جمال عبد الناصر', birthYear: 1918, faction: 'Free Officers', influence: 70, loyalty: 100, traits: ['Charismatic', 'Nationalist', 'Calculating'], historicalRole: 'Leader of the Free Officers' },
  { id: 'naguib', name: 'Mohamed Naguib', arabicName: 'محمد نجيب', birthYear: 1901, faction: 'Free Officers', influence: 80, loyalty: 90, traits: ['Popular', 'Moderate', 'Honest'], historicalRole: 'Figurehead of the Revolution' },
  { id: 'farouk', name: 'King Farouk', arabicName: 'الملك فاروق', birthYear: 1920, faction: 'Monarchy', influence: 40, loyalty: 0, traits: ['Decadent', 'Weak-willed'], historicalRole: 'Last King of Egypt' }
];

// الحدث الأول: بيان الثورة
const event_23july: HistoricalEvent = {
  id: 'evt_1952_07_23',
  date: '1952-07-23',
  location: 'Cairo, Egypt',
  title: 'ثورة 23 يوليو - بيان الضباط الأحرار',
  description: 'في الساعة السابعة صباحاً، إذاعة القاهرة تذيع البيان رقم 1 للثورة. الضباط الأحرار يسيطرون على مراكز القيادة في القاهرة. الملك فاروق محاصر في قصر عابدين.',
  historicalContext: 'بعد سنوات من الإحباط من الاحتلال البريطاني، الفساد الملكي، والهزيمة في فلسطين 1948، يتحرك تنظيم الضباط الأحرار بقيادة جمال عبد الناصر للإطاحة بالنظام.',
  images: [{ id: 'img_nasser_broadcast', url: '/assets/placeholder_1952_broadcast.svg', caption: 'محاكاة لإذاعة بيان الثورة', metadata: { source: 'Historical reenactment description based on memoirs' } }],
  involvedFigures: ['nasser', 'naguib', 'farouk'],
  playerRole: 'أنت ضابط شاب في التنظيم السري. قرارك في هذه اللحظة سيحدد مسار السلطة.',
  options: [
    {
      id: 'opt_back_nasser',
      text: 'التشبث بقيادة جمال عبد الناصر (العقل المدبر)',
      description: 'عبد الناصر هو صانع التنظيم. تدعم رؤيته الاشتراكية والقومية المتطرفة.',
      immediateEffects: (state) => {
        state.politicalInfluence['FreeOfficers_Nasser'] = (state.politicalInfluence['FreeOfficers_Nasser'] || 50) + 30;
        state.player.politicalCapital += 10;
        state.activeFlags['nasser_ascendancy'] = true;
        return state;
      }
    },
    {
      id: 'opt_back_naguib',
      text: 'دعم اللواء محمد نجيب (الرمز الشعبي)',
      description: 'نجيب يحظى بحب الشعب والجيش. شخصيته المعتدلة تضمن انتقالاً سلساً للسلطة.',
      immediateEffects: (state) => {
        state.politicalInfluence['FreeOfficers_Naguib'] = (state.politicalInfluence['FreeOfficers_Naguib'] || 50) + 25;
        state.publicApproval += 5;
        state.activeFlags['naguib_figurehead'] = true;
        return state;
      }
    },
    {
      id: 'opt_mediate',
      text: 'محاولة التوسط مع الملك فاروق لتمرير الإصلاحات',
      description: 'خيار محفوف بالمخاطر. قد تحافظ على الاستقرار لكنك تخاطر بفقدان ثقة الثوار.',
      immediateEffects: (state) => {
        state.player.politicalCapital -= 15;
        state.activeFlags['counter_revolution_risk'] = true;
        return state;
      }
    }
  ],
  sourceMetadata: {
    source: 'مذكرات جمال عبد الناصر (فلسفة الثورة)، وأرشيف وثائق الضباط الأحرار.',
    dateKnown: '1952-07-23',
    locationKnown: 'القاهرة'
  },
  isPlayerCreatedAlternative: false
};

// تصدير السيناريو الكامل
export const scenario_1952: Scenario = {
  id: 'scenario_01_egypt_1952',
  period: { start: '1952-01-01', end: '1954-12-31' },
  title: 'مصر 1952 - جذور الثورة',
  description: 'تبدأ رحلتك كضابط في الجيش المصري. الاحتلال البريطاني لا يزال قائماً، والشارع يغلي. كيف ستتعامل مع كبرياء النظام الملكي ومطالب الشعب؟',
  initialGameState: {
    player: { /* ... بيانات البداية للاعب (رتبة: صاغ, نفوذ: 30) */ },
    politicalInfluence: { Monarchy: 40, FreeOfficers: 60, Wafd: 50 },
    publicApproval: 45,
    // ...
  },
  events: [event_23july /*, event_abolish_monarchy, event_evacuation_agreement... */],
  // ... بقية الخصائص
};
