import { HistoricalEventCard } from '@/types';

/**
 * كل حدث هنا مبني على تسلسل موثق لثورة 23 يوليو 1952. القرارات المتاحة
 * للاعب صُممت بحيث يبقى "المسار التاريخي" (historicalOutcome: 'documented')
 * متاحًا دائمًا كخيار، بينما تُتاح خيارات بديلة موسومة صراحة كـ 'player_branch'.
 * دور اللاعب: ضابط شاب داخل التنظيم، وليس أحد الضباط الأحرار القياديين
 * المعروفين تاريخيًا — حتى لا يُزاح شخصيات حقيقية عن قراراتها الموثقة.
 */
export const scenario01Events: HistoricalEventCard[] = [
  {
    id: 'ev_1952_07_22_mobilization',
    dateAr: '٢٢ يوليو ١٩٥٢، مساءً',
    dateISO: '1952-07-22',
    location: 'مقرات متفرقة بالجيش المصري، القاهرة',
    historicalContext:
      'بعد تأجيل موعد التحرك الأصلي خشية انكشاف الخطة لدى قيادة الجيش الموالية للملك، يصدر تنظيم الضباط الأحرار أوامر تعبئة ليلية لوحدات موثوقة تمهيدًا للسيطرة على المواقع الحيوية في القاهرة.',
    image: null,
    involvedCharacterIds: ['nasser', 'amer'],
    playerRole: 'ضابط شاب مكلَّف بنقل أوامر التعبئة إلى وحدتك دون كشف الهدف الكامل للعملية',
    decisions: [
      {
        id: 'mobilize_quietly',
        labelAr: 'نفّذ الأوامر بدقة وحافظ على السرية التامة أمام جنودك',
        immediateEffects: [
          { target: 'military.reserveStrength', delta: 5 },
          { target: 'character.nasser.loyalty', delta: 5 },
        ],
        historicalOutcome: 'documented',
      },
      {
        id: 'question_orders',
        labelAr: 'استفسر عن طبيعة العملية من قيادتك المباشرة قبل التنفيذ',
        immediateEffects: [
          { target: 'character.nasser.loyalty', delta: -5 },
          { target: 'military.commandDelayHours', delta: 1 },
        ],
        historicalOutcome: 'player_branch',
        longTermFlags: ['flagged_as_cautious'],
      },
    ],
    immediateConsequenceAr: 'تتحرك الوحدات الموثوقة نحو مواقعها المحددة دون اشتباك يُذكر.',
    longTermConsequenceAr: 'مستوى السرية المحافَظ عليه في هذه الليلة يؤثر على مدى مفاجأة العملية صباح ٢٣ يوليو.',
    sources: [
      {
        source: 'مراجع تاريخية عامة عن الإعداد لثورة 23 يوليو 1952',
        date: '1952-07-22',
        confidence: 'documented',
      },
    ],
    confidence: 'documented',
  },

  {
    id: 'ev_1952_07_23_coup',
    dateAr: '٢٣ يوليو ١٩٥٢، الساعات الأولى من الفجر',
    dateISO: '1952-07-23',
    location: 'القيادة العامة للجيش المصري، كوبري القبة، القاهرة',
    historicalContext:
      'تسيطر وحدات الضباط الأحرار على مبنى القيادة العامة للجيش ومحطة الإذاعة والمطار والمواقع الحيوية الأخرى في عملية تكاد تكون خالية من إراقة الدماء. يُذاع أول بيان للثورة باسم اللواء محمد نجيب في السابعة صباحًا.',
    image: null,
    involvedCharacterIds: ['nasser', 'naguib', 'amer'],
    playerRole: 'قائد فصيلة مكلّفة بتأمين محيط مبنى القيادة العامة',
    decisions: [
      {
        id: 'secure_perimeter_no_force',
        labelAr: 'أمّن المحيط وتجنّب استخدام القوة إلا للضرورة القصوى',
        immediateEffects: [
          { target: 'economic.publicStability', delta: 3 },
          { target: 'political.governmentApproval', delta: 4 },
        ],
        historicalOutcome: 'documented',
      },
      {
        id: 'aggressive_lockdown',
        labelAr: 'افرض إغلاقًا مشددًا وتعامل بحزم مع أي مقاومة محتملة',
        immediateEffects: [
          { target: 'economic.publicStability', delta: -4 },
          { target: 'military.reserveStrength', delta: 3 },
        ],
        historicalOutcome: 'player_branch',
        longTermFlags: ['heavy_handed_reputation'],
      },
    ],
    immediateConsequenceAr:
      'تسقط القيادة العامة بيد الضباط الأحرار خلال ساعات، وتلتزم أغلب الوحدات الأخرى الحياد أو تنضم للحركة.',
    longTermConsequenceAr:
      'الطريقة التي تُدار بها الساعات الأولى تشكّل الانطباع العام الأول عن الحركة الجديدة لدى سكان القاهرة.',
    sources: [
      {
        source: 'مراجع تاريخية عامة عن أحداث فجر 23 يوليو 1952؛ نص البيان الأول للثورة',
        date: '1952-07-23',
        confidence: 'documented',
      },
    ],
    confidence: 'documented',
  },

  {
    id: 'ev_1952_07_26_abdication',
    dateAr: '٢٦ يوليو ١٩٥٢',
    dateISO: '1952-07-26',
    location: 'قصر رأس التين، الإسكندرية',
    historicalContext:
      'تحت إنذار من مجلس قيادة الثورة، يوقّع الملك فاروق الأول وثيقة التنازل عن العرش لصالح ابنه الرضيع أحمد فؤاد الثاني، ويغادر مصر على متن اليخت الملكي المحروسة متجهًا إلى المنفى في إيطاليا.',
    image: null,
    involvedCharacterIds: ['farouk', 'naguib'],
    playerRole: 'ضمن الطاقم العسكري المرافق لتنفيذ مراسم المغادرة في ميناء الإسكندرية',
    decisions: [
      {
        id: 'formal_departure',
        labelAr: 'التزم بمراسم رسمية تحفظ للملك السابق كرامته أثناء المغادرة',
        immediateEffects: [
          { target: 'political.governmentApproval', delta: 3 },
          { target: 'faction.royal_court', delta: 10 },
        ],
        historicalOutcome: 'documented',
      },
      {
        id: 'humiliate_departure',
        labelAr: 'اسمح بتسريب مشاهد مهينة للملك أمام الحشود المتجمعة',
        immediateEffects: [
          { target: 'political.governmentApproval', delta: 6 },
          { target: 'faction.royal_court', delta: -20 },
        ],
        historicalOutcome: 'player_branch',
        longTermFlags: ['royalist_resentment'],
      },
    ],
    immediateConsequenceAr: 'ينتهي حكم الأسرة العلوية الفعلي في مصر بعد ١٤٧ عامًا.',
    longTermConsequenceAr: 'طريقة التعامل مع خروج الملك تؤثر على موقف الفلول الملكية والدول الأوروبية من الحركة الجديدة.',
    sources: [
      {
        source: 'نص وثيقة التنازل عن العرش المؤرخة 26 يوليو 1952؛ مراجع تاريخية عامة',
        date: '1952-07-26',
        confidence: 'documented',
      },
    ],
    confidence: 'documented',
  },

  {
    id: 'ev_1952_09_agrarian_reform',
    dateAr: '٩ سبتمبر ١٩٥٢',
    dateISO: '1952-09-09',
    location: 'مجلس الوزراء، القاهرة',
    historicalContext:
      'يصدر القانون رقم ١٧٨ لسنة ١٩٥٢ بشأن الإصلاح الزراعي، الذي يحدد الملكية الزراعية الفردية بحد أقصى (٢٠٠ فدان مبدئيًا) ويوزّع الفائض على صغار الفلاحين، في أول تدخل بنيوي كبير للنظام الجديد في الاقتصاد.',
    image: null,
    involvedCharacterIds: ['naguib', 'nasser'],
    playerRole: 'عضو في لجنة متابعة تنفيذ القرار في إحدى المحافظات',
    decisions: [
      {
        id: 'gradual_implementation',
        labelAr: 'أشرف على تنفيذ تدريجي يراعي تعويض كبار الملاك',
        immediateEffects: [
          { target: 'economic.agricultureOutputIndex', delta: -2 },
          { target: 'economic.publicStability', delta: 5 },
        ],
        historicalOutcome: 'documented',
      },
      {
        id: 'rapid_confiscation',
        labelAr: 'ادفع نحو مصادرة سريعة دون انتظار آليات التعويض الكاملة',
        immediateEffects: [
          { target: 'economic.agricultureOutputIndex', delta: -8 },
          { target: 'economic.publicStability', delta: -6 },
          { target: 'political.governmentApproval', delta: 8 },
        ],
        historicalOutcome: 'player_branch',
        longTermFlags: ['radical_land_reform'],
      },
    ],
    immediateConsequenceAr: 'يبدأ تفكيك تدريجي لبنية الملكية الزراعية الكبرى التي هيمنت على الريف المصري لعقود.',
    longTermConsequenceAr: 'سرعة التنفيذ وطريقته تحددان حجم المعارضة من كبار الملاك وتأثيرها على الإنتاج الزراعي في المواسم التالية.',
    sources: [
      {
        source: 'نص القانون رقم 178 لسنة 1952 بشأن الإصلاح الزراعي',
        date: '1952-09-09',
        confidence: 'documented',
      },
    ],
    confidence: 'documented',
  },

  {
    id: 'ev_1953_01_parties_dissolved',
    dateAr: '١٦ يناير ١٩٥٣',
    dateISO: '1953-01-16',
    location: 'القاهرة',
    historicalContext:
      'يصدر مجلس قيادة الثورة قرارًا بحل جميع الأحزاب السياسية القائمة (الوفد وغيره) ومصادرة أموالها، ويُعلن عن هيئة التحرير كتنظيم سياسي وحيد بديل، في خطوة تُنهي عمليًا التعددية الحزبية التي سبقت الثورة.',
    image: null,
    involvedCharacterIds: ['naguib', 'nasser'],
    playerRole: 'ضمن فريق تنسيق أمني يتابع ردود فعل قواعد الأحزاب المنحلة',
    decisions: [
      {
        id: 'monitor_only',
        labelAr: 'اكتفِ بالمراقبة الأمنية دون اعتقالات واسعة',
        immediateEffects: [
          { target: 'political.partiesLegal', setValue: false },
          { target: 'economic.publicStability', delta: 2 },
        ],
        historicalOutcome: 'documented',
      },
      {
        id: 'mass_arrests',
        labelAr: 'نفّذ حملة اعتقالات واسعة ضد كوادر الأحزاب المنحلة',
        immediateEffects: [
          { target: 'political.partiesLegal', setValue: false },
          { target: 'economic.publicStability', delta: -8 },
          { target: 'political.governmentApproval', delta: -5 },
        ],
        historicalOutcome: 'player_branch',
        longTermFlags: ['harsh_crackdown_1953'],
      },
    ],
    immediateConsequenceAr: 'تنتهي الحياة الحزبية العلنية في مصر، ويصبح مجلس قيادة الثورة السلطة الفعلية الوحيدة دون منازع مؤسسي.',
    longTermConsequenceAr: 'هذا القرار يمهّد مباشرة لأزمة نجيب-ناصر حول طبيعة الحكم التي ستتفجر في سيناريو ١٩٥٤.',
    sources: [
      {
        source: 'قرار مجلس قيادة الثورة بحل الأحزاب السياسية، يناير 1953',
        date: '1953-01-16',
        confidence: 'documented',
      },
    ],
    confidence: 'documented',
  },

  {
    id: 'ev_1953_06_republic',
    dateAr: '١٨ يونيو ١٩٥٣',
    dateISO: '1953-06-18',
    location: 'القاهرة',
    historicalContext:
      'يُعلن مجلس قيادة الثورة إلغاء النظام الملكي رسميًا وقيام الجمهورية المصرية، ويتولى اللواء محمد نجيب رئاسة الجمهورية إلى جانب رئاسة الوزراء، في ختام المرحلة الانتقالية الأولى منذ ٢٣ يوليو.',
    image: null,
    involvedCharacterIds: ['naguib', 'nasser'],
    playerRole: 'حاضر ضمن القوة العسكرية المشاركة في احتفالات إعلان الجمهورية',
    decisions: [
      {
        id: 'accept_transition',
        labelAr: 'اقبل بهذه المرحلة كخطوة انتقالية نحو دستور دائم',
        immediateEffects: [
          { target: 'political.governmentApproval', delta: 5 },
        ],
        historicalOutcome: 'documented',
      },
    ],
    immediateConsequenceAr: 'تُعلن الجمهورية المصرية رسميًا، وتنتهي المرحلة الملكية التي استمرت منذ 1922 اسميًا ومنذ محمد علي فعليًا.',
    longTermConsequenceAr: 'يبدأ صراع خفي بين نجيب وناصر حول شكل السلطة النهائي في الجمهورية الجديدة — هذا هو موضوع السيناريو التالي.',
    sources: [
      {
        source: 'إعلان قيام الجمهورية المصرية، 18 يونيو 1953',
        date: '1953-06-18',
        confidence: 'documented',
      },
    ],
    confidence: 'documented',
  },
];
