import type { Locale } from "@/state/locale";

/** Traduções das citações (LinkedIn original em PT em `about.ts`). */
type NonPt = Exclude<Locale, "pt">;

const T: Record<string, Partial<Record<NonPt, string>>> = {
  aline: {
    en: "A great professional!",
    es: "¡Una gran profesional!",
    zh: "非常优秀的专业人士！",
    de: "Ein großartiger Profi!",
    ja: "素晴らしいプロフェッショナルです！",
  },
  leandro: {
    en: "I thank Pedro for his dedicated effort in running simulation surveys to identify and fix bugs, managing communication between developer and user. Thanks, Pedro!",
    es: "Agradezco a Pedro por su esfuerzo dedicado al realizar levantamientos de simulaciones para identificar y corregir bugs, gestionando la comunicación entre desarrollador y usuario. ¡Gracias, Pedro!",
    zh: "感谢 Pedro 在开展模拟调研以识别和修复缺陷、协调开发者与用户沟通方面所付出的努力。谢谢 Pedro！",
    de: "Ich danke Pedro für seinen engagierten Einsatz bei Simulationserhebungen zur Fehleranalyse und -behebung und für die Steuerung der Kommunikation zwischen Entwickler und Nutzer. Danke, Pedro!",
    ja: "バグの特定・修正のためのシミュレーション調査を行い、開発者と利用者の間のコミュニケーションを取りまとめてくれた Pedro の尽力に感謝します。ありがとう、Pedro！",
  },
  "bryan-ribeiro-rovani": {
    en: "Pedro was a colleague at Banana Brasil whom I was glad to meet and work with. Whenever I needed support he was attentive and willing to help improve things. I especially want to highlight his speed at solving problems, how fast he learns, how organized he was in his work at BNB, and his commitment to the company.",
    es: "Pedro fue un profesional en Banana Brasil a quien tuve el gusto de conocer y con quien trabajé. Siempre que fue necesario me apoyó y se mostró atento a aportar mejoras. Destaco su rapidez para resolver problemas, su capacidad de aprender rápido, su organización en el desempeño en BNB y su compromiso con la organización.",
    zh: "Pedro 在 Banana Brasil 是一位我很荣幸结识并共事的同事。每当我需要支持时，他都会细心协助并乐于推动改进。我特别想强调他解决问题的速度、学习能力、在 BNB 工作中的条理以及对公司的投入。",
    de: "Pedro war bei Banana Brasil ein Kollege, den ich gern kennengelernt habe und mit dem ich gearbeitet habe. Wenn nötig, hat er mich unterstützt und Verbesserungen eingebracht. Besonders hervorheben möchte ich seine Geschwindigkeit bei der Problemlösung, seine schnelle Lernfähigkeit, seine strukturierte Arbeitsweise bei BNB und sein Engagement für das Unternehmen.",
    ja: "Pedro は Banana Brasil で知り合えて一緒に働けた喜びのあるプロです。必要なときはいつもサポートし、改善に前向きでした。問題解決の速さ、学習の速さ、BNB での業務の整理、組織へのコミットメントを特に強調したいです。",
  },
  "moises-moura": {
    en: "I had the privilege of getting to know and work with Pedro over the last 3 years. He is an excellent professional, always helpful, very detail-oriented and committed to his responsibilities.",
    es: "Tuve el privilegio de conocer y trabajar con Pedro en los últimos 3 años. Es un excelente profesional, siempre servicial, con gran atención al detalle y comprometido con sus responsabilidades.",
    zh: "过去三年我有幸认识并与 Pedro 共事。他是一位出色的专业人士，总是乐于助人，注重细节并对自己的职责非常投入。",
    de: "Ich hatte das Privileg, Pedro in den letzten 3 Jahren kennenzulernen und mit ihm zu arbeiten. Er ist ein exzellenter Profi, immer hilfsbereit, sehr detailorientiert und verantwortungsbewusst.",
    ja: "ここ3年間、Pedro と知り合い一緒に働けたことは光栄でした。優秀なプロフェッショナルで、いつも親切で、細部に気を配り、責任感が強い方です。",
  },
  "joao-pedro-redondo": {
    en: "Great professional, dedicated and proficient.",
    es: "Gran profesional, dedicado y competente.",
    zh: "优秀的专业人士，敬业且能力突出。",
    de: "Großartiger Profi, engagiert und kompetent.",
    ja: "優れたプロフェッショナルで、献身的で実力があります。",
  },
  "eduardo-hiroshi": {
    en: "Pedro Henrique is an excellent professional who was always willing to help us as president of Unidev, and put great effort into making our consultancy the best at the university. Even though we worked together only briefly, I gained experience and knowledge I will carry through my whole career; besides being a good friend, he is a great leader.",
    es: "Pedro Henrique es un excelente profesional, siempre dispuesto a ayudarnos como presidente de Unidev, además de mostrar gran esfuerzo para que nuestra consultoría fuera la mejor de la universidad. Aunque trabajé poco tiempo con él, gané experiencia y conocimiento que llevaré toda mi carrera; además de un buen amigo, es un gran líder.",
    zh: "Pedro Henrique 是一位出色的专业人士，在担任 Unidev 主席期间始终愿意帮助我们，并为让咨询社成为全校最佳付出了巨大努力。虽然共事时间不长，但我获得了将伴随整个职业生涯的经验与知识；除了是好友，他也是一位出色的领导者。",
    de: "Pedro Henrique ist ein exzellenter Profi, der uns als Präsident von Unidev immer unterstützt hat und sich stark dafür eingesetzt hat, unsere Beratung zur besten der Universität zu machen. Obwohl wir nur kurz zusammenarbeiteten, habe ich Erfahrung und Wissen gewonnen, die ich meine ganze Karriere mitnehme; neben einem guten Freund ist er ein großartiger Führer.",
    ja: "Pedro Henrique は優秀なプロフェッショナルで、Unidev の代表として私たちをいつも助け、学内で最高のコンサルになるよう大きな努力をしました。一緒に働いた時間は短くても、キャリア全体に活かせる経験と知識を得ました。良き友人であると同時に、素晴らしいリーダーです。",
  },
  "diego-franca": {
    en: "Pedro is dedicated, confident and inspiring. He is always motivated to take on new challenges, and when he commits to something, he does it and does it well. It is surprising how fast Pedro learns. His ability to listen, motivate people and roll up his sleeves alongside them makes him an outstanding leader. He manages tasks with ease and intelligence and always analyzes situations from different angles to find efficient solutions.",
    es: "Pedro es una persona dedicada, segura e inspiradora. Siempre está motivado para nuevos retos y, cuando se propone algo, lo hace y lo hace bien. Sorprende la velocidad con la que aprende. Su capacidad de escuchar, motivar y trabajar codo a codo con el equipo lo hace un líder excepcional. Gestiona tareas con facilidad e inteligencia y analiza las situaciones desde distintos ángulos para hallar soluciones eficientes.",
    zh: "Pedro 专注、自信且鼓舞人心。他总是积极迎接新挑战，一旦承诺就会做好。他学习新事物的速度快得惊人。善于倾听、激励他人并亲力亲为，使他成为杰出的领导者。他能轻松而明智地管理任务，并从多角度分析问题以寻找高效方案。",
    de: "Pedro ist engagiert, selbstbewusst und inspirierend. Er ist immer motiviert, neue Herausforderungen anzunehmen, und wenn er sich etwas vornimmt, erledigt er es und zwar gut. Erstaunlich ist, wie schnell Pedro Neues lernt. Seine Fähigkeit zuzuhören, Menschen zu motivieren und mit anzupacken, macht ihn zu einem herausragenden Führer. Er steuert Aufgaben souverän und intelligent und betrachtet Situationen aus vielen Blickwinkeln, um effiziente Lösungen zu finden.",
    ja: "Pedro は献身的で自信に満ち、人を鼓舞します。新しい挑戦に常に前向きで、一度決めたことはきちんとやり遂げます。学習の速さには驚かされます。人の話を聞き、動機づけ、一緒に手を動かす姿勢が際立ったリーダーです。タスクを的確かつ知的に進め、状況を多角的に分析して効率的な解決策を見つけます。",
  },
  "felipe-machado": {
    en: "Pedro Levorato is a great leader. I worked with him leading Junior Consultancy UNIDEV and in a short time we achieved excellent results.",
    es: "Pedro Levorato es un gran líder. Trabajé con él al frente de la Consultoría Junior UNIDEV y en poco tiempo logramos excelentes resultados.",
    zh: "Pedro Levorato 是一位出色的领导者。我与他在 UNIDEV 青年咨询社共事，短时间内就取得了很好的成果。",
    de: "Pedro Levorato ist ein großartiger Führer. Ich habe mit ihm die Junior-Beratung UNIDEV geführt und in kurzer Zeit starke Ergebnisse erzielt.",
    ja: "Pedro Levorato は素晴らしいリーダーです。ジュニアコンサル UNIDEV のリーダーとして一緒に働き、短期間で大きな成果を上げました。",
  },
  "murilo-coleta-marques": {
    en: "Pedro is that person with great energy who transforms the environment, motivates everyone, is extremely responsible and never refuses to help—someone you can count on for anything; he never let me down. He is very understanding, knows how to deal with people and analyzes situations he faces extremely well.",
    es: "Pedro es esa persona de buena energía que transforma el ambiente, motiva a todos, es extremadamente responsable y no niega ayuda a nadie; alguien en quien puedes contar para todo, nunca me dejó solo. Además, es muy comprensivo, sabe tratar a las personas y analiza muy bien las situaciones en las que se encuentra.",
    zh: "Pedro 是那种充满正能量、能带动氛围、激励大家的人，极其负责且从不拒绝帮助他人——任何事都可以依靠他，从未让我失望。他非常善解人意，善于与人相处，也能很好地分析所面临的局面。",
    de: "Pedro ist jemand mit guter Energie, der das Umfeld verändert, alle motiviert, äußerst verantwortungsbewusst ist und niemandem Hilfe verweigert—jemand, auf den man sich in allem verlassen kann; er hat mich nie im Stich gelassen. Er ist sehr einfühlsam, kann mit Menschen umgehen und analysiert die Situationen, in denen er steckt, sehr gut.",
    ja: "Pedro は場の空気を変え、みんなを励ます良いエネルギーの人で、非常に責任感があり誰にも手を差し伸べないことはありません。何でも頼れる存在で、一度も見捨てられませんでした。人の気持ちを理解し、人付き合いが上手で、置かれた状況もよく分析します。",
  },
  "joao-vieira": {
    en: "I had the chance to meet Pedro at university, where he showed himself to be very proactive and focused, taking on several leadership and management roles. As a leader he has a very interesting profile: he seeks to help everyone around him and bring out the best in each person.",
    es: "Tuve la oportunidad de conocer a Pedro en la universidad, donde se mostró muy proactivo y enfocado, ocupando varios cargos de liderazgo y gestión. Como líder tiene un perfil muy interesante: busca ayudar a quienes lo rodean y sacar lo mejor de cada persona.",
    zh: "我在大学里认识了 Pedro，他非常主动、专注，担任过多个领导与管理职务。作为领导者，他的风格很有意思：致力于帮助身边的人并激发每个人的潜能。",
    de: "Ich lernte Pedro an der Universität kennen; er wirkte sehr proaktiv und fokussiert und übernahm mehrere Führungs- und Managementrollen. Als Führer hat er ein spannendes Profil: er hilft den Menschen um sich herum und holt das Beste aus jedem Einzelnen heraus.",
    ja: "大学で Pedro を知る機会があり、非常に主体的で集中力があり、複数のリーダー・マネジメントの役を担っていました。リーダーとして周囲を支え、一人ひとりから最善を引き出そうとする姿勢が印象的でした。",
  },
  "lucas-matheus-canal": {
    en: "Even in the short time I studied and did projects with Levorato, I saw how responsible he is—in managing resources and people and in encouraging everyone in the group. He was born to lead; without a doubt his strongest point is teamwork, and his administrative side is very strong. From what we studied and the work we did over this one year, you can already tell how much he has to offer.",
    es: "Por el poco tiempo que estudié e hice trabajos con Levorato ya vi lo responsable que es, tanto en gestión de recursos y personas como al incentivar al grupo; nació con don de líder. Sin duda su mejor punto es el trabajo en equipo que logra llevar adelante; su función administrativa es muy buena. Por lo que vimos en clase y los trabajos de este año ya se nota lo bueno que tiene.",
    zh: "虽然和 Levorato 一起学习、做项目的时间不长，但我已看出他非常负责——无论是资源与人事管理，还是对组员的激励。他天生具备领导力；毫无疑问最突出的是团队协作能力，管理方面也很强。就这一年的学习和作业来看，已经能看出他的优秀。",
    de: "In der kurzen Zeit, in der ich mit Levorato studiert und Projekte gemacht habe, habe ich gesehen, wie verantwortungsbewusst er ist—bei Ressourcen- und Personalführung und bei der Motivation der Gruppe. Führung liegt ihm im Blut; sein stärkster Punkt ist Teamarbeit, und administrativ ist er sehr stark. Aus dem, was wir gelernt und in diesem Jahr gemacht haben, sieht man schon, was in ihm steckt.",
    ja: "Levorato と短い期間しか学んだり課題を一緒にしませんでしたが、リソースや人のマネジメント、グループの励まし方など、いかに責任感があるかが分かりました。生まれつきリーダー向きで、間違いなく最大の強みはチームワークです。管理面も非常に良く、この1年の学びと課題からすでに彼の良さが伝わります。",
  },
  "felipe-defendi": {
    en: "Pedro Levorato is a natural leader! In my experience with him at Junior Consultancy Unidev, he always tried to involve every member as much as possible, encouraging everyone, setting goals and working hard to meet them. It was not easy—he had to manage many young people who had not even entered the job market yet, i.e. people who were \"unprepared\"—and for that and more I have the utmost respect for him.",
    es: "¡Pedro Levorato es un líder nato! En mi experiencia con él en la consultoría Junior Unidev, siempre intentó involucrar al máximo a todos los integrantes, animando a todos, fijando metas y esforzándose por cumplirlas. No crean que era fácil: tenía que administrar a muchos jóvenes que ni siquiera habían entrado al mercado laboral, es decir, personas \"despreparadas\", y por eso y mucho más le tengo el máximo respeto.",
    zh: "Pedro Levorato 是天生的领导者！在 Junior 咨询社 Unidev 与他共事时，他总是尽力让每位成员参与，鼓励大家、设定目标并努力达成。这并不容易——他要管理许多尚未进入职场的年轻人，也就是所谓「尚未准备好」的人——因此我对他充满敬意。",
    de: "Pedro Levorato ist ein geborener Führer! In meiner Zeit mit ihm bei der Junior-Beratung Unidev hat er immer versucht, alle Mitglieder maximal einzubinden, alle zu motivieren, Ziele zu setzen und hart daran zu arbeiten. Das war nicht einfach—er musste viele junge Menschen führen, die noch gar nicht im Arbeitsmarkt standen, also „unvorbereitete“ Menschen—deshalb habe ich höchsten Respekt vor ihm.",
    ja: "Pedro Levorato は生まれながらのリーダーです！ジュニアコンサル Unidev での経験では、常にメンバー全員を巻き込もうとし、励まし、目標を立て、達成に向けて走り抜きました。簡単ではありませんでした。まだ社会に出ていない若者、いわば「未熟な」人たちをまとめる必要があったからです。その点を含め、彼を最大限に尊敬します。",
  },
  "rodrigo-simao": {
    en: "While I was part of consultancy UnidevTI, Pedro was its president and was the one who helped our consultancy break project records compared to previous years—he managed and motivated every consultant to participate and complete projects successfully.",
    es: "Durante el período en que participé en la consultoría UnidevTI, Pedro era el presidente y fue quien hizo que nuestra consultoría batiera récords de proyectos frente a años anteriores; fue quien gestionó y motivó a todos los consultores a participar y completar los proyectos con éxito.",
    zh: "我参与 UnidevTI 咨询社期间，Pedro 担任主席，正是他带领我们打破了往年项目数量的纪录——他管理并激励所有顾问参与并成功完成项目。",
    de: "Als ich bei der Beratung UnidevTI dabei war, war Pedro ihr Präsident und hat dazu beigetragen, dass wir Rekorde bei Projekten gegenüber früheren Jahren brachen—er hat alle Berater geführt und motiviert, teilzunehmen und Projekte erfolgreich abzuschließen.",
    ja: "UnidevTI コンサルに参加していた頃、Pedro は代表で、過去の年と比べてプロジェクト件数の記録を更新させた中心人物でした。全コンサルタントが参加しプロジェクトを成功裏に終えられるよう管理し、動機づけてくれました。",
  },
  "thiago-dantas-teixeira": {
    en: "We worked together for a few months at UnidevTI while Pedro was president, and my impression was of someone highly motivated and creative. Under his leadership UnidevTI achieved great results and stood out compared with other consultancies. In short, his leadership style deserves to be highlighted because it motivated other members to reach the results we achieved.",
    es: "Trabajamos algunos meses en UnidevTI mientras Pedro era presidente y la percepción que tuve fue de alguien muy motivado y creativo. Durante su gestión UnidevTI tuvo excelentes resultados y destacó frente a otras consultorias. En resumen, su estilo de liderazgo debe destacarse, porque motivó a los demás miembros a alcanzar los resultados obtenidos.",
    zh: "Pedro 担任主席期间，我们在 UnidevTI 共事数月，我的印象是他非常有动力和创意。在他的带领下，UnidevTI 取得了出色成绩，在众多咨询社中脱颖而出。简而言之，他的领导方式值得称道，因为他激励其他成员达成了这些成果。",
    de: "Wir arbeiteten einige Monate bei UnidevTI zusammen, während Pedro Präsident war, und mein Eindruck war: sehr motiviert und kreativ. Unter seiner Führung erzielte UnidevTI starke Ergebnisse und hob sich von anderen Beratungen ab. Kurz gesagt: Sein Führungsstil sollte hervorgehoben werden, weil er die anderen Mitglieder zu den erzielten Ergebnissen motivierte.",
    ja: "Pedro が代表だった頃、数か月 UnidevTI で一緒に働きましたが、非常にモチベーションが高く創造的な方だと感じました。その下で UnidevTI は大きな成果を上げ、他のコンサルに比べて目立つ存在になりました。要するに、得られた成果に他のメンバーを動かしたリーダーシップは特筆に値します。",
  },
  "lucas-zuin-cossitt": {
    en: "Pedro is a very good leader; he excels at project management and at evolving projects. During my time with him at UnidevTI we had an outstanding performance thanks to him.",
    es: "Pedro es un muy buen líder, se desenvuelve bien en la gestión de proyectos y en su evolución. En mi período de contacto con él en UnidevTI tuvimos un desempeño sensacional gracias a él.",
    zh: "Pedro 是非常优秀的领导者，擅长项目管理与项目推进。在 UnidevTI 与他共事期间，多亏他我们取得了出色的表现。",
    de: "Pedro ist ein sehr guter Führer; er kann Projekte hervorragend steuern und weiterentwickeln. In meiner Zeit mit ihm bei UnidevTI hatten wir dank ihm eine hervorragende Leistung.",
    ja: "Pedro は非常に優れたリーダーで、プロジェクトの管理と発展が得意です。UnidevTI で彼と関わった期間は、彼のおかげで素晴らしい成果を上げました。",
  },
};

export function recommendationQuoteText(
  id: string,
  textPt: string,
  locale: Locale
): string {
  if (locale === "pt") return textPt;
  const row = T[id];
  if (!row) return textPt;
  const next = row[locale as NonPt];
  return next ?? row.en ?? textPt;
}
