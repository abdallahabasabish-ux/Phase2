import { HistoricalCharacter } from '@/types';

/**
 * ملاحظة توثيقية: التواريخ والمناصب أدناه موثقة في المصادر التاريخية
 * العامة لثورة 23 يوليو 1952 (انظر حقل sources في كل شخصية).
 * السمات الشخصية (personality) مبنية على تفسير تاريخي (plausible) وليست
 * قياسات رقمية موثقة — هي أداة لعبية لمحاكاة ردود الفعل، ويجب عدم قراءتها
 * كحكم تأريخي قاطع على الشخص.
 */
export const characters1952: Record<string, HistoricalCharacter> = {
  naguib: {
    id: 'naguib',
    fullNameAr: 'محمد نجيب',
    fullNameEn: 'Muhammad Naguib',
    portrait: {
      assetPath: null,
      caption: 'اللواء محمد نجيب، القائد الاسمي لحركة الجيش، 1952',
      source: 'يُضاف لاحقًا من أرشيف مرخّص',
      photographerOrCollection: null,
      dateTaken: '1952',
      locationTaken: 'القاهرة',
      licenseStatus: 'requires_licensing',
    },
    biography:
      'ضابط بارز شارك في حرب فلسطين 1948 وأصيب فيها. اختاره تنظيم الضباط الأحرار كواجهة علنية للحركة بحكم رتبته الأعلى وشعبيته، وأصبح أول رئيس للجمهورية المصرية عام 1953.',
    position: 'القائد العام المعلن لحركة الجيش (يوليو 1952)',
    faction: 'free_officers',
    influence: 70,
    loyalty: 60,
    relationships: [
      { characterId: 'nasser', relationTag: 'شريك قيادي متوتر', strength: 40 },
    ],
    personality: { pragmatism: 40, authoritarianism: 20, riskTolerance: 30, populism: 60 },
    historicalRole: 'الواجهة الرسمية للثورة أمام الشعب والجيش والقصر',
    decisionPreferences: [
      'يفضل الحفاظ على شكل دستوري وشرعية علنية',
      'أقل ميلًا من ناصر للحسم الأحادي داخل مجلس قيادة الثورة',
    ],
    sources: [
      {
        source: 'سجلات مجلس قيادة الثورة العامة؛ مراجع تاريخية عن ثورة 1952',
        date: '1952-07-23',
        confidence: 'documented',
      },
    ],
  },

  nasser: {
    id: 'nasser',
    fullNameAr: 'جمال عبد الناصر',
    fullNameEn: 'Gamal Abdel Nasser',
    portrait: {
      assetPath: null,
      caption: 'يوزباشي جمال عبد الناصر، المنظم الفعلي لتنظيم الضباط الأحرار',
      source: 'يُضاف لاحقًا من أرشيف مرخّص',
      photographerOrCollection: null,
      dateTaken: '1952',
      locationTaken: 'القاهرة',
      licenseStatus: 'requires_licensing',
    },
    biography:
      'ضابط شارك في حرب فلسطين 1948 وتأثر بتجربة الحصار في الفالوجة. المؤسس والمحرك الفعلي لتنظيم الضباط الأحرار منذ أواخر الأربعينيات، ورئيس مجلس قيادة الثورة الفعلي رغم بقائه خلف الواجهة في الأشهر الأولى.',
    position: 'العضو المنظم الفعلي لمجلس قيادة الثورة',
    faction: 'free_officers',
    influence: 80,
    loyalty: 75,
    relationships: [
      { characterId: 'naguib', relationTag: 'شريك قيادي متوتر', strength: 40 },
      { characterId: 'amer', relationTag: 'حليف مقرّب', strength: 85 },
    ],
    personality: { pragmatism: 70, authoritarianism: 55, riskTolerance: 60, populism: 75 },
    historicalRole: 'العقل التنظيمي والاستراتيجي للحركة',
    decisionPreferences: [
      'يفضل تركيز القرار داخل مجلس قيادة الثورة',
      'حذر شديد تجاه أي تدخل بريطاني مباشر',
    ],
    sources: [
      {
        source: 'مراجع تاريخية عامة عن تنظيم الضباط الأحرار وثورة 1952',
        date: '1952-07-23',
        confidence: 'documented',
      },
    ],
  },

  amer: {
    id: 'amer',
    fullNameAr: 'عبد الحكيم عامر',
    fullNameEn: 'Abdel Hakim Amer',
    portrait: null,
    biography: 'ضابط من الحلقة الأولى لتنظيم الضباط الأحرار ومن أقرب المقربين لعبد الناصر.',
    position: 'عضو مجلس قيادة الثورة',
    faction: 'free_officers',
    influence: 55,
    loyalty: 90,
    relationships: [{ characterId: 'nasser', relationTag: 'حليف مقرّب', strength: 85 }],
    personality: { pragmatism: 45, authoritarianism: 40, riskTolerance: 65, populism: 40 },
    historicalRole: 'قائد ميداني وحلقة وصل داخل صفوف الجيش',
    decisionPreferences: ['يميل لدعم قرارات ناصر مباشرة'],
    sources: [
      { source: 'مراجع تاريخية عامة عن مجلس قيادة الثورة', date: '1952', confidence: 'documented' },
    ],
  },

  farouk: {
    id: 'farouk',
    fullNameAr: 'الملك فاروق الأول',
    fullNameEn: 'King Farouk I',
    portrait: null,
    biography:
      'آخر ملوك مصر الفعليين من الأسرة العلوية. حكمه اتسم بأزمات متتالية: هزيمة 1948، فضائح فساد، وتوتر متصاعد مع البريطانيين والأحزاب. تنازل عن العرش في 26 يوليو 1952 وغادر مصر إلى المنفى.',
    position: 'ملك مصر والسودان',
    faction: 'royal_court',
    influence: 50,
    loyalty: 0,
    relationships: [],
    personality: { pragmatism: 30, authoritarianism: 60, riskTolerance: 20, populism: -30 },
    historicalRole: 'رأس النظام الملكي المستهدف بالثورة',
    decisionPreferences: ['يميل للتفاوض على مخرج آمن شخصيًا أكثر من المواجهة'],
    sources: [
      {
        source: 'مراجع تاريخية عامة؛ نص خطاب التنازل عن العرش 26 يوليو 1952',
        date: '1952-07-26',
        confidence: 'documented',
      },
    ],
  },

  britishAmbassador: {
    id: 'britishAmbassador',
    fullNameAr: 'السفير البريطاني في القاهرة',
    fullNameEn: 'British Ambassador to Cairo (Sir Ralph Stevenson)',
    portrait: null,
    biography:
      'مثّل المصالح البريطانية في مصر خلال أحداث يوليو 1952، وسط قاعدة عسكرية بريطانية ضخمة في منطقة قناة السويس واتفاقية 1936 التي لا تزال سارية اسميًا.',
    position: 'سفير بريطانيا لدى مصر',
    faction: 'british_administration',
    influence: 65,
    loyalty: 0,
    relationships: [],
    personality: { pragmatism: 75, authoritarianism: 30, riskTolerance: 25, populism: -50 },
    historicalRole: 'مراقبة الحدث وتقييم ما إذا كان يهدد المصالح البريطانية في القناة',
    decisionPreferences: ['يفضل عدم التدخل العسكري المباشر طالما لم تُهدَّد قاعدة القناة والرعايا البريطانيون'],
    sources: [
      {
        source: 'مراجع تاريخية عامة عن الموقف البريطاني من ثورة 1952',
        date: '1952-07',
        confidence: 'plausible',
        uncertaintyNote: 'تفاصيل المداولات الداخلية للسفارة البريطانية غير موثقة بالكامل في مصادر عامة',
      },
    ],
  },
};
