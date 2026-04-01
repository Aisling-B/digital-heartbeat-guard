export interface Choice {
  id: string;
  text: string;
  type: "maintenance" | "genuine" | "surrogate" | "restore" | "let-go";
  obligationDelta: number;
  genuineCount?: boolean;
  description?: string;
  choiceImage?: string; // Added to support showing your response photo
}

export interface DayData {
  day: number;
  streakCount: number;
  title: string;
  narrative: string[];
  alexMessage?: string;
  alexImage?: string;
  systemAlert?: string;
  choices: Choice[];
  hourglass?: boolean;
  hourglassTime?: string;
}

export interface GameState {
  currentDay: number;
  obligationMeter: number;
  genuineConnections: number;
  maintenanceSnaps: number;
  totalVisits: number;
  choices: Record<number, string>;
  surrogateAccepted: boolean;
  streakRestored: boolean;
  streakAlive: boolean;
}

export const initialGameState: GameState = {
  currentDay: 0,
  obligationMeter: 45,
  genuineConnections: 0,
  maintenanceSnaps: 0,
  totalVisits: 0,
  choices: {},
  surrogateAccepted: false,
  streakRestored: false,
  streakAlive: true,
};

export const days: DayData[] = [
  {
    day: 0,
    streakCount: 120,
    title: "The Hourglass",
    narrative: [
      "The ⏳ is pulsing. You have 4 hours left.",
      "Alex just sent a snap. You can see it's a blurry photo of a ceiling fan. A 'Maintenance Snap'—content with zero meaning, sent purely to keep the number alive.",
      "Your phone buzzes again. 🔥 120 glows amber in the notification bar.",
      "What do you do?",
    ],
    alexMessage: "📸 [Blurry ceiling photo]",
    alexImage: "/snapchat-streak-images-01.png",
    systemAlert: "⏳ 4 hours remaining to maintain your 120-day streak",
    hourglass: true,
    hourglassTime: "4h left",
    choices: [
      {
        id: "d0-maintenance",
        text: "📸 Send a photo of your shoes",
        type: "maintenance",
        obligationDelta: 8,
        description: "Quick. Painless. The number survives.",
        choiceImage: "/snapchat-streak-images-shoes.png",
      },
      {
        id: "d0-genuine",
        text: "💬 Ask Alex how their day actually went",
        type: "genuine",
        obligationDelta: -5,
        genuineCount: true,
        description: "A real conversation. But it takes effort.",
        choiceImage: "/snapchat-experience-ai_you-good.png",
      },
    ],
  },
  {
    day: 1,
    streakCount: 121,
    title: "The Morning Ritual",
    narrative: [
      "Day 121. You woke up and your first thought wasn't 'Good morning'—it was 'Did I snap Alex yet?'",
      "The streak counter has become your alarm clock. A daily obligation disguised as friendship.",
      "Alex sends a dark photo. Probably taken under the covers at 6am. You can barely make out a pillow.",
    ],
    alexMessage: "📸 [Dark photo - pillow?]",
    alexImage: "/snapchat-streak-images-02.png",
    choices: [
      {
        id: "d1-maintenance",
        text: "📸 Send a photo of your breakfast (half-eaten toast)",
        type: "maintenance",
        obligationDelta: 10,
        description: "Content? Barely. But the algorithm is satisfied.",
        choiceImage: "/toast.png",
      },
      {
        id: "d1-genuine",
        text: "🎤 Send a voice note about that weird dream you had",
        type: "genuine",
        obligationDelta: -3,
        genuineCount: true,
        description: "Something personal. Something real.",
        choiceImage: "/voice-message.png",
      },
    ],
  },
  {
    day: 2,
    streakCount: 122,
    title: "The Double-Tap Dilemma",
    narrative: [
      "It's 11:47pm. You almost forgot.",
      "You're exhausted from revision. Your eyes sting. But the hourglass appeared 2 hours ago and you only just noticed.",
      "Alex hasn't sent anything today either. You're both waiting for the other to go first.",
      "This is the game now. Not friendship. Chicken.",
    ],
    hourglass: true,
    hourglassTime: "2h left",
    systemAlert: "⏳ WARNING: Streak expires in 2 hours",
    choices: [
      {
        id: "d2-maintenance",
        text: "📸 Black screen snap. Just... black.",
        type: "maintenance",
        obligationDelta: 15,
        description: "Zero effort. Maximum obligation.",
        choiceImage: "/snapchat-experience-ai_black-screen.png",
      },
      {
        id: "d2-genuine",
        text: "💬 'Hey, are we just doing this for the number now?'",
        type: "genuine",
        obligationDelta: -10,
        genuineCount: true,
        description: "The question neither of you wants to ask.",
        choiceImage: "/snapchat-experience-ai_just-a-number.png",
      },
    ],
  },
  {
    day: 3,
    streakCount: 123,
    title: "The Guilt Loop",
    narrative: [
      "Alex replied to your snap with a single word: 'lol'.",
      "Three letters. One syllable. Zero connection.",
      "You used to talk for hours. About everything. About nothing. Now your entire relationship fits inside a 10-second photo that disappears.",
      "Your obligation meter is climbing. You can feel it.",
    ],
    alexMessage: "lol",
    alexImage: "/snapchat-experience-ai_lol.png",
    choices: [
      {
        id: "d3-maintenance",
        text: "👍 React with an emoji. Done.",
        type: "maintenance",
        obligationDelta: 12,
        description: "An emoji is technically a response.",
      },
      {
        id: "d3-genuine",
        text: "📞 Actually call Alex on the phone",
        type: "genuine",
        obligationDelta: -15,
        genuineCount: true,
        description: "Remember phone calls? Your grandparents do.",
      },
    ],
  },
  {
    day: 4,
    streakCount: 124,
    title: "The Vacation Problem",
    narrative: [
      "Alex just posted on their story: '✈️ OFF TO SPAIN!! No wifi for a week 🌊'",
      "Your stomach drops. No wifi means no snaps. No snaps means...",
      "Then a DM appears from @jamie_2009: 'hey alex gave me their password to keep streaks going while they're away. i'll send u a snap every day lol'",
      "A surrogate. A stand-in. Someone pretending to be your best friend so a number doesn't reset.",
    ],
    systemAlert: "🔔 Alex is offline. Jamie has offered to maintain the streak.",
    choices: [
      {
        id: "d4-surrogate",
        text: "✅ Accept Jamie as streak keeper",
        type: "surrogate",
        obligationDelta: 20,
        description: "The number survives. But at what cost?",
      },
      {
        id: "d4-genuine",
        text: "❌ 'Nah, tell Alex I'll wait till they're back'",
        type: "genuine",
        obligationDelta: -8,
        genuineCount: true,
        description: "If the streak needs a stranger to survive, is it real?",
      },
    ],
  },
  {
    day: 5,
    streakCount: 125,
    title: "The Silence",
    narrative: [
      "Day 125. Alex is still in Spain.",
      "If you accepted Jamie, you've been trading snaps with someone you barely know—wearing Alex's digital identity like a mask.",
      "If you refused, the hourglass has been ticking for 18 hours. The streak is on life support.",
      "You check Alex's Snap Map. Last seen: Barcelona, 14 hours ago.",
      "You realize you're tracking your best friend's location to manage your anxiety about a number.",
    ],
    hourglass: true,
    hourglassTime: "6h left",
    choices: [
      {
        id: "d5-maintenance",
        text: "📸 Send another maintenance snap (to Jamie or the void)",
        type: "maintenance",
        obligationDelta: 15,
        description: "Keep the machine running.",
      },
      {
        id: "d5-genuine",
        text: "💬 Send Alex a real text message: 'Miss you. Hope Spain is amazing.'",
        type: "genuine",
        obligationDelta: -12,
        genuineCount: true,
        description: "Outside the app. Outside the game. Just... real.",
      },
    ],
  },
  {
    day: 6,
    streakCount: 0,
    title: "Game Over",
    narrative: [
      "🔥 → 💀",
      "The streak is dead. 120 days. Gone.",
      "You stare at the empty space where 🔥 126 used to be. It's just... Alex's name now. No number. No fire. No hourglass.",
      "Just a name. Like it was before all this started.",
      "Then a notification appears: '🔄 Streak Restore available! Only £0.99 to recover your 126-day streak!'",
      "£0.99. The price of 126 days of daily obligation.",
    ],
    systemAlert: "💀 Your 126-day streak with Alex has expired",
    choices: [
      {
        id: "d6-restore",
        text: "💳 Pay £0.99 to restore the streak",
        type: "restore",
        obligationDelta: 25,
        description: "The sunk-cost fallacy made purchasable.",
      },
      {
        id: "d6-let-go",
        text: "🕊️ Let it go. The number was never the friendship.",
        type: "let-go",
        obligationDelta: -20,
        genuineCount: true,
        description: "Freedom has never been so cheap.",
      },
    ],
  },
];
