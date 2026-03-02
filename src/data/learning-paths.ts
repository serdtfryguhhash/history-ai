export interface LearningPathDay {
  day: number;
  week: number;
  figureSlug: string;
  figureName: string;
  reading: string;
  reflectionQuestion: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  weeks: number;
  totalDays: number;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  coverColor: string;
  days: LearningPathDay[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "lp1",
    slug: "rise-and-fall-of-rome",
    title: "Rise and Fall of Rome",
    description: "Trace the arc of Rome from a small city-state to the greatest empire the ancient world ever knew, and understand why it fell.",
    weeks: 6,
    totalDays: 42,
    category: "Governance",
    difficulty: "intermediate",
    coverColor: "from-red-700 to-red-900",
    days: [
      { day: 1, week: 1, figureSlug: "romulus", figureName: "Romulus", reading: "The legendary founding of Rome and the significance of origin myths in shaping national identity.", reflectionQuestion: "How do founding myths shape a nation's character?" },
      { day: 2, week: 1, figureSlug: "julius-caesar", figureName: "Julius Caesar", reading: "Caesar's crossing of the Rubicon and the end of the Roman Republic.", reflectionQuestion: "When does ambition become dangerous for a democracy?" },
      { day: 3, week: 1, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "The Meditations and the burden of ruling the world's greatest empire.", reflectionQuestion: "Can power and philosophy coexist?" },
      { day: 4, week: 1, figureSlug: "cicero", figureName: "Cicero", reading: "The art of rhetoric and its role in Roman politics.", reflectionQuestion: "How does the power of speech shape political outcomes?" },
      { day: 5, week: 1, figureSlug: "cleopatra", figureName: "Cleopatra VII", reading: "Egypt's last pharaoh and her strategic alliance with Rome.", reflectionQuestion: "What role does diplomacy play when facing a superpower?" },
      { day: 6, week: 1, figureSlug: "hannibal-barca", figureName: "Hannibal Barca", reading: "The Punic Wars and Hannibal's crossing of the Alps.", reflectionQuestion: "What makes a military strategy brilliant versus reckless?" },
      { day: 7, week: 1, figureSlug: "augustus", figureName: "Augustus", reading: "How Octavian transformed the Republic into the Empire.", reflectionQuestion: "Can stability justify the loss of political freedom?" },
      { day: 8, week: 2, figureSlug: "nero", figureName: "Nero", reading: "Tyranny, the Great Fire of Rome, and the dangers of unchecked power.", reflectionQuestion: "How do societies allow tyrants to rise?" },
      { day: 9, week: 2, figureSlug: "spartacus", figureName: "Spartacus", reading: "The gladiator revolt and the institution of slavery in Rome.", reflectionQuestion: "What drives people to risk everything for freedom?" },
      { day: 10, week: 2, figureSlug: "constantine", figureName: "Constantine I", reading: "The conversion of Rome to Christianity and the Edict of Milan.", reflectionQuestion: "How does religion reshape political power?" },
      { day: 11, week: 2, figureSlug: "trajan", figureName: "Trajan", reading: "Rome at its territorial peak under Trajan.", reflectionQuestion: "Is there an ideal size for an empire or organization?" },
      { day: 12, week: 2, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "The Antonine Plague and crisis leadership.", reflectionQuestion: "How should leaders respond during a pandemic?" },
      { day: 13, week: 2, figureSlug: "julius-caesar", figureName: "Julius Caesar", reading: "The Gallic Wars and Roman expansion.", reflectionQuestion: "When does expansion become overextension?" },
      { day: 14, week: 2, figureSlug: "cicero", figureName: "Cicero", reading: "Cicero's defense of the Republic against Catiline.", reflectionQuestion: "How do you defend institutions from internal threats?" },
      { day: 15, week: 3, figureSlug: "augustus", figureName: "Augustus", reading: "The Pax Romana and what peace costs.", reflectionQuestion: "Is peace worth the price of individual liberty?" },
      { day: 16, week: 3, figureSlug: "constantine", figureName: "Constantine I", reading: "The founding of Constantinople and the split of the Empire.", reflectionQuestion: "Can dividing power ever strengthen an organization?" },
      { day: 17, week: 3, figureSlug: "hannibal-barca", figureName: "Hannibal Barca", reading: "The Battle of Cannae and tactical genius.", reflectionQuestion: "What can we learn from brilliant defeats?" },
      { day: 18, week: 3, figureSlug: "julius-caesar", figureName: "Julius Caesar", reading: "The assassination on the Ides of March.", reflectionQuestion: "Does political violence ever achieve its intended goals?" },
      { day: 19, week: 3, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "Stoic principles applied to governance.", reflectionQuestion: "Which philosophical principles best guide leaders?" },
      { day: 20, week: 3, figureSlug: "spartacus", figureName: "Spartacus", reading: "The legacy of slave revolts in the ancient world.", reflectionQuestion: "How do marginalized groups change history?" },
      { day: 21, week: 3, figureSlug: "nero", figureName: "Nero", reading: "The Year of the Four Emperors and political instability.", reflectionQuestion: "What happens when institutional trust collapses?" },
      { day: 22, week: 4, figureSlug: "trajan", figureName: "Trajan", reading: "Roman engineering and infrastructure as tools of empire.", reflectionQuestion: "How does infrastructure shape civilization?" },
      { day: 23, week: 4, figureSlug: "constantine", figureName: "Constantine I", reading: "The Council of Nicaea and religious authority.", reflectionQuestion: "Should governments shape religious doctrine?" },
      { day: 24, week: 4, figureSlug: "augustus", figureName: "Augustus", reading: "Propaganda and image-building in Rome.", reflectionQuestion: "How does propaganda shape historical legacy?" },
      { day: 25, week: 4, figureSlug: "cicero", figureName: "Cicero", reading: "The fall of the Republic through Cicero's eyes.", reflectionQuestion: "Are democracies inherently fragile?" },
      { day: 26, week: 4, figureSlug: "julius-caesar", figureName: "Julius Caesar", reading: "Military reform and its political consequences.", reflectionQuestion: "How does military power threaten civilian governance?" },
      { day: 27, week: 4, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "The frontier wars and managing decline.", reflectionQuestion: "How can leaders recognize and manage decline?" },
      { day: 28, week: 4, figureSlug: "cleopatra", figureName: "Cleopatra VII", reading: "The end of Ptolemaic Egypt and cultural absorption.", reflectionQuestion: "What happens when great civilizations are absorbed by larger ones?" },
      { day: 29, week: 5, figureSlug: "constantine", figureName: "Constantine I", reading: "Late Roman economic reforms and currency debasement.", reflectionQuestion: "What parallels exist between Roman currency debasement and modern monetary policy?" },
      { day: 30, week: 5, figureSlug: "augustus", figureName: "Augustus", reading: "The succession problem and hereditary power.", reflectionQuestion: "Why is succession planning so difficult for empires and organizations?" },
      { day: 31, week: 5, figureSlug: "trajan", figureName: "Trajan", reading: "The limits of Roman expansion in Mesopotamia.", reflectionQuestion: "How do empires determine their natural boundaries?" },
      { day: 32, week: 5, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "Choosing Commodus and the failure of meritocratic succession.", reflectionQuestion: "Does nepotism always lead to decline?" },
      { day: 33, week: 5, figureSlug: "hannibal-barca", figureName: "Hannibal Barca", reading: "Carthage's final destruction and the concept of total war.", reflectionQuestion: "What does the destruction of Carthage teach about how victors treat the vanquished?" },
      { day: 34, week: 5, figureSlug: "spartacus", figureName: "Spartacus", reading: "Roman social structure and inequality.", reflectionQuestion: "How does extreme inequality destabilize societies?" },
      { day: 35, week: 5, figureSlug: "nero", figureName: "Nero", reading: "Cultural patronage versus political misrule.", reflectionQuestion: "Can cultural achievement compensate for political failure?" },
      { day: 36, week: 6, figureSlug: "constantine", figureName: "Constantine I", reading: "The division between East and West.", reflectionQuestion: "Why did the Eastern Empire survive while the West fell?" },
      { day: 37, week: 6, figureSlug: "julius-caesar", figureName: "Julius Caesar", reading: "Caesar's legacy in Western civilization.", reflectionQuestion: "Which leaders have had the most lasting impact on civilization, and why?" },
      { day: 38, week: 6, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "Stoicism's influence on modern psychology and leadership.", reflectionQuestion: "Why has Stoicism experienced a modern revival?" },
      { day: 39, week: 6, figureSlug: "augustus", figureName: "Augustus", reading: "Roman law and its legacy in modern legal systems.", reflectionQuestion: "How does Roman law still influence your daily life?" },
      { day: 40, week: 6, figureSlug: "cicero", figureName: "Cicero", reading: "Republican ideals and the American founding.", reflectionQuestion: "How did Roman Republican ideals shape modern democracies?" },
      { day: 41, week: 6, figureSlug: "cleopatra", figureName: "Cleopatra VII", reading: "Women rulers in the ancient world and their erasure from history.", reflectionQuestion: "How has history been shaped by who writes it?" },
      { day: 42, week: 6, figureSlug: "marcus-aurelius", figureName: "Marcus Aurelius", reading: "Final reflections: What Rome teaches us about the arc of civilizations.", reflectionQuestion: "Is the fall of great civilizations inevitable, or preventable?" },
    ],
  },
  {
    id: "lp2",
    slug: "world-war-ii",
    title: "World War II",
    description: "Understand the deadliest conflict in human history through the leaders, soldiers, scientists, and civilians who lived it.",
    weeks: 8,
    totalDays: 56,
    category: "War & Strategy",
    difficulty: "intermediate",
    coverColor: "from-gray-700 to-gray-900",
    days: Array.from({ length: 56 }, (_, i) => {
      const figures = [
        { slug: "winston-churchill", name: "Winston Churchill" },
        { slug: "franklin-roosevelt", name: "Franklin D. Roosevelt" },
        { slug: "dwight-eisenhower", name: "Dwight D. Eisenhower" },
        { slug: "charles-de-gaulle", name: "Charles de Gaulle" },
        { slug: "albert-einstein", name: "Albert Einstein" },
        { slug: "alan-turing", name: "Alan Turing" },
        { slug: "mahatma-gandhi", name: "Mahatma Gandhi" },
      ];
      const readings = [
        "The rise of fascism in Europe and its warning signs.",
        "Military strategy and the fog of war.",
        "The home front and civilian resilience.",
        "Intelligence and code-breaking in modern warfare.",
        "The moral complexities of total war.",
        "Science as a weapon: from radar to the atomic bomb.",
        "Resistance movements and the power of defiance.",
        "The aftermath: rebuilding from the ashes.",
      ];
      const questions = [
        "How do democratic societies recognize authoritarian threats early?",
        "What role does morale play in military outcomes?",
        "How do civilians sustain hope during prolonged crisis?",
        "Is intelligence more important than brute force in conflict?",
        "Can war ever be morally justified?",
        "What responsibilities do scientists have for how their work is used?",
        "What makes nonviolent resistance effective against tyranny?",
        "How should victors treat the defeated?",
      ];
      const fig = figures[i % figures.length];
      return {
        day: i + 1,
        week: Math.floor(i / 7) + 1,
        figureSlug: fig.slug,
        figureName: fig.name,
        reading: readings[i % readings.length],
        reflectionQuestion: questions[i % questions.length],
      };
    }),
  },
  {
    id: "lp3",
    slug: "scientific-revolution",
    title: "Scientific Revolution",
    description: "From Copernicus to Newton, trace how humanity learned to question authority and trust evidence.",
    weeks: 4,
    totalDays: 28,
    category: "Science",
    difficulty: "beginner",
    coverColor: "from-blue-700 to-indigo-900",
    days: Array.from({ length: 28 }, (_, i) => {
      const figures = [
        { slug: "galileo-galilei", name: "Galileo Galilei" },
        { slug: "isaac-newton", name: "Isaac Newton" },
        { slug: "leonardo-da-vinci", name: "Leonardo da Vinci" },
        { slug: "nicolas-copernicus", name: "Nicolaus Copernicus" },
        { slug: "johannes-kepler", name: "Johannes Kepler" },
        { slug: "rene-descartes", name: "Rene Descartes" },
        { slug: "francis-bacon", name: "Francis Bacon" },
      ];
      const readings = [
        "The heliocentric revolution and challenging established truth.",
        "The development of the scientific method.",
        "Art and science as complementary ways of understanding.",
        "Mathematics as the language of nature.",
        "How instruments extend human perception.",
        "The conflict between faith and reason.",
        "From alchemy to chemistry: the evolution of inquiry.",
      ];
      const questions = [
        "What gives us the courage to challenge established wisdom?",
        "How does the scientific method apply to everyday decisions?",
        "Can creativity and rigorous analysis coexist?",
        "Why is mathematical literacy important for everyone?",
        "How do new tools change what we can discover?",
        "Where should we draw the line between faith and evidence?",
        "What superstitions do we still hold that evidence contradicts?",
      ];
      const fig = figures[i % figures.length];
      return {
        day: i + 1,
        week: Math.floor(i / 7) + 1,
        figureSlug: fig.slug,
        figureName: fig.name,
        reading: readings[i % readings.length],
        reflectionQuestion: questions[i % questions.length],
      };
    }),
  },
  {
    id: "lp4",
    slug: "age-of-exploration",
    title: "Age of Exploration",
    description: "Discover how European voyagers connected the world — and the devastating consequences for indigenous peoples.",
    weeks: 4,
    totalDays: 28,
    category: "Diplomacy",
    difficulty: "beginner",
    coverColor: "from-teal-700 to-cyan-900",
    days: Array.from({ length: 28 }, (_, i) => {
      const figures = [
        { slug: "christopher-columbus", name: "Christopher Columbus" },
        { slug: "ferdinand-magellan", name: "Ferdinand Magellan" },
        { slug: "marco-polo", name: "Marco Polo" },
        { slug: "zheng-he", name: "Zheng He" },
        { slug: "hernan-cortes", name: "Hernan Cortes" },
        { slug: "queen-isabella", name: "Queen Isabella I" },
        { slug: "vasco-da-gama", name: "Vasco da Gama" },
      ];
      const readings = [
        "The economic motivations behind exploration.",
        "Navigation technology and the age of sail.",
        "First contact: perspectives of explorers and indigenous peoples.",
        "The Columbian Exchange and its global impact.",
        "Colonialism and its lasting consequences.",
        "Trade routes that connected civilizations.",
        "The environmental impact of global exploration.",
      ];
      const questions = [
        "How do economic incentives drive discovery?",
        "What technologies today are as transformative as the compass was?",
        "How should we evaluate historical figures by the standards of their time vs. ours?",
        "What are the unintended consequences of connecting distant cultures?",
        "How do colonial legacies shape modern geopolitics?",
        "What role does trade play in building—or breaking—relationships between civilizations?",
        "How does human activity reshape ecosystems?",
      ];
      const fig = figures[i % figures.length];
      return {
        day: i + 1,
        week: Math.floor(i / 7) + 1,
        figureSlug: fig.slug,
        figureName: fig.name,
        reading: readings[i % readings.length],
        reflectionQuestion: questions[i % questions.length],
      };
    }),
  },
  {
    id: "lp5",
    slug: "ancient-civilizations",
    title: "Ancient Civilizations",
    description: "Journey through the cradles of civilization — Mesopotamia, Egypt, the Indus Valley, and China.",
    weeks: 6,
    totalDays: 42,
    category: "Governance",
    difficulty: "beginner",
    coverColor: "from-amber-700 to-yellow-900",
    days: Array.from({ length: 42 }, (_, i) => {
      const figures = [
        { slug: "ramesses-ii", name: "Ramesses II" },
        { slug: "hatshepsut", name: "Hatshepsut" },
        { slug: "hammurabi", name: "Hammurabi" },
        { slug: "confucius", name: "Confucius" },
        { slug: "sun-tzu", name: "Sun Tzu" },
        { slug: "siddhartha-gautama", name: "Siddhartha Gautama" },
        { slug: "cyrus-the-great", name: "Cyrus the Great" },
      ];
      const readings = [
        "The invention of writing and the birth of recorded history.",
        "Monumental architecture as a statement of power.",
        "The first legal codes and the concept of justice.",
        "Philosophy and ethics in the ancient world.",
        "Military strategy in the ancient world.",
        "Religion and spirituality across ancient cultures.",
        "Trade networks that connected the ancient world.",
      ];
      const questions = [
        "How did writing change human civilization?",
        "Why do civilizations build monuments?",
        "What makes a law just?",
        "Which ancient philosophical ideas are still relevant today?",
        "How has warfare evolved since ancient times?",
        "What role does spirituality play in societal cohesion?",
        "How does trade build bridges between cultures?",
      ];
      const fig = figures[i % figures.length];
      return {
        day: i + 1,
        week: Math.floor(i / 7) + 1,
        figureSlug: fig.slug,
        figureName: fig.name,
        reading: readings[i % readings.length],
        reflectionQuestion: questions[i % questions.length],
      };
    }),
  },
];

export function getPathBySlug(slug: string): LearningPath | undefined {
  return learningPaths.find((p) => p.slug === slug);
}

const PATH_PROGRESS_KEY = "history_ai_path_progress";

export interface PathProgress {
  pathId: string;
  completedDays: number[];
  startedAt: string;
  lastActivityAt: string;
}

export function getPathProgress(pathId: string): PathProgress | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(PATH_PROGRESS_KEY);
  if (!stored) return null;
  try {
    const all: Record<string, PathProgress> = JSON.parse(stored);
    return all[pathId] || null;
  } catch {
    return null;
  }
}

export function getAllPathProgress(): Record<string, PathProgress> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(PATH_PROGRESS_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function completePathDay(pathId: string, day: number): PathProgress {
  if (typeof window === "undefined") {
    return { pathId, completedDays: [day], startedAt: new Date().toISOString(), lastActivityAt: new Date().toISOString() };
  }
  const stored = localStorage.getItem(PATH_PROGRESS_KEY);
  let all: Record<string, PathProgress> = {};
  try {
    all = stored ? JSON.parse(stored) : {};
  } catch {
    all = {};
  }

  const existing = all[pathId] || {
    pathId,
    completedDays: [],
    startedAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
  };

  if (!existing.completedDays.includes(day)) {
    existing.completedDays.push(day);
  }
  existing.lastActivityAt = new Date().toISOString();

  all[pathId] = existing;
  localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(all));
  return existing;
}
