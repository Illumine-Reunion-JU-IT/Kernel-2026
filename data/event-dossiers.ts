export interface TimelineDetail {
  prelims?: string;
  finals?: string;
  date?: string;
  time?: string;
  venue?: string;
}

export interface RuleItem {
  prefix?: string;
  highlight?: string;
  suffix?: string;
}

export interface FormatRound {
  roundTitle: string;
  points: RuleItem[];
}

export interface ContactPerson {
  name: string;
  phone: string;
  role?: string;
}

export interface EventDossier {
  edition: string;
  categoryBadge: string;
  lastRegistrationDate?: string;
  mode: string;
  teamSize: string;
  prizePool: string;
  timeline: TimelineDetail;
  overviewSummary: RuleItem[];
  rules: RuleItem[];
  format: FormatRound[];
  contacts: ContactPerson[];
}

export const EVENT_DOSSIERS: Record<string, EventDossier> = {
  "mogoj-dholai": {
    edition: "KERNEL '26",
    categoryBadge: "CODING",
    lastRegistrationDate: "31ST MARCH",
    mode: "Hybrid",
    teamSize: "1-3",
    prizePool: "6,000",
    timeline: {
      prelims: "TBD",
      finals: "TBA",
      time: "10:00 am - 1:00 pm",
      venue: "Computer Lab 1, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "An elite ", highlight: "algorithmic problem-solving contest", suffix: ", designed to test analytical limits, " },
      { prefix: "data structure mastery, and ", highlight: "computational complexity optimization", suffix: " under strict time constraints. " },
      { prefix: "Participants tackle multi-tiered problems ranging from ", highlight: "dynamic programming to graph theory", suffix: " on standard ICPC scoring." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "1 to 3 members", suffix: " from any recognized university or college." },
      { prefix: "Participants must connect to the contest server; ", highlight: "plagiarism and AI-assisted code generation", suffix: " will lead to immediate disqualification." },
      { prefix: "Standard ICPC-style rules apply: ranking is determined by ", highlight: "total solved problems and penalty time", suffix: "." },
      { prefix: "Languages permitted: ", highlight: "C++, C, Java, and Python 3", suffix: "." },
      { prefix: "Finalists must carry ", highlight: "valid student ID cards", suffix: " for onsite verification." },
    ],
    format: [
      {
        roundTitle: "Round 1: Online Preliminary Qualifier",
        points: [
          { prefix: "A 2.5-hour algorithmic coding challenge hosted on the ", highlight: "live contest platform", suffix: "." },
          { prefix: "Top 25 qualifying teams will advance to the ", highlight: "on-campus Grand Finale", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: On-Campus Grand Finale",
        points: [
          { prefix: "A high-intensity ", highlight: "3-hour onsite showdown", suffix: " with hidden evaluation test cases." },
          { prefix: "Scoreboard will be frozen during the ", highlight: "final 60 minutes", suffix: " to heighten suspense." },
        ],
      },
    ],
    contacts: [
      { name: "Ankit Kundu", phone: "6295529281" },
      { name: "Rahul Pandey", phone: "8961716604" },
    ],
  },

  hojohborolo: {
    edition: "KERNEL '26",
    categoryBadge: "SOFTWARE CHALLENGE",
    lastRegistrationDate: "1ST APRIL",
    mode: "On-Campus",
    teamSize: "1-4",
    prizePool: "6,000",
    timeline: {
      prelims: "Idea Pitch: TBD",
      finals: "Hack Sprint: TBA",
      time: "11:00 am - 3:00 pm",
      venue: "Smart Classroom, SMCC 3rd Floor",
    },
    overviewSummary: [
      { prefix: "A creative software challenge where teams build ", highlight: "quirky, unusual, and entertaining software", suffix: " rather than traditional corporate tools. " },
      { prefix: "Participants must combine ", highlight: "unconventional UX, technical absurdity, and creative engineering", suffix: " to build prototypes that surprise, amuse, and captivate the jury." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "1 to 4 members", suffix: "." },
      { prefix: "Software must focus on ", highlight: "entertainment, absurdity, and quirky creativity", suffix: " rather than enterprise utilities." },
      { prefix: "All code must be authored within the ", highlight: "4-hour official hack window", suffix: "; open-source libraries may be leveraged but core logic must be fresh." },
      { prefix: "Any tech stack is allowed: ", highlight: "Web, Mobile, CLI, IoT, Browser Extensions, or Game Engines", suffix: "." },
      { prefix: "Judging criteria: ", highlight: "Creativity (40%), Execution (30%), Entertainment & Demo (30%)", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Round 1: Rapid 4-Hour Prototyping Sprint",
        points: [
          { prefix: "The secret thematic creative constraints are revealed at the ", highlight: "opening bell", suffix: "." },
          { prefix: "Teams have exactly 4 hours to build and push their prototype to a ", highlight: "public repository", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: Live Stage Jury Demonstration",
        points: [
          { prefix: "A 5-minute live demo on stage where teams demonstrate their ", highlight: "working quirky software", suffix: " to the jury." },
          { prefix: "Followed by a quick ", highlight: "2-minute interactive Q&A session", suffix: "." },
        ],
      },
    ],
    contacts: [
      { name: "Swarnendu Bannerjee", phone: "9564027954" },
      { name: "Ansh Kumar Singh", phone: "9775607310" },
    ],
  },

  "data-nilaam": {
    edition: "KERNEL '26",
    categoryBadge: "MACHINE LEARNING",
    lastRegistrationDate: "1ST APRIL",
    mode: "Hybrid",
    teamSize: "2-4",
    prizePool: "6,000",
    timeline: {
      prelims: "Data Auction: TBD",
      finals: "Model Submission: TBA",
      time: "10:00 am - 12:00 pm (Auction) · 12:30 pm - 4:30 pm (Build)",
      venue: "Smart Lab, Dept. of IT, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "An elite machine learning challenge where teams run ", highlight: "NovoCredit, a simulated digital lender", suffix: ", and bid on masked dataset features in a live auction. " },
      { prefix: "Participants must balance ", highlight: "feature acquisition budgets against predictive accuracy", suffix: " to maximize credit card portfolio profit on hidden test sets." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "2 to 4 members", suffix: "." },
      { prefix: "Each team is allocated a fixed bank of ", highlight: "virtual auction tokens", suffix: " to bid on masked feature blocks." },
      { prefix: "No team may exceed their virtual budget; ", highlight: "strategic bid allocation", suffix: " is required." },
      { prefix: "Final models will be evaluated against an unseen ", highlight: "private ground-truth test dataset", suffix: "." },
      { prefix: "Teams must submit clean code notebooks and a short ", highlight: "auction strategy report", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Round 1: Live Interactive Data Auction",
        points: [
          { prefix: "A real-time auction room where feature subsets, correlation matrices, and noisy signals are ", highlight: "auctioned off in 15-minute intervals", suffix: "." },
          { prefix: "Teams must decide which data to buy and which to skip under ", highlight: "time pressure", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: ML Pipeline & Risk Evaluation Benchmark",
        points: [
          { prefix: "Teams engineer features and train predictive credit-scoring models with their ", highlight: "purchased dataset", suffix: "." },
          { prefix: "Submissions scored on ", highlight: "ROC-AUC, profit simulation, and default risk penalty", suffix: "." },
        ],
      },
    ],
    contacts: [
      { name: "Rishav Chowdhury", phone: "8276991374" },
      { name: "Debarun Patra", phone: "8582922525" },
    ],
  },

  "speaker-session": {
    edition: "KERNEL '26",
    categoryBadge: "INDUSTRY TALKS",
    lastRegistrationDate: "10TH APRIL",
    mode: "In-Person",
    teamSize: "Individual / Open",
    prizePool: "Swag & Access",
    timeline: {
      date: "TBA",
      time: "11:00 am - 1:00 pm (Talks) · 2:00 pm - 4:00 pm (Fireside)",
      venue: "University Auditorium, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "An engaging high-level symposium featuring ", highlight: "seasoned industry experts, tech leaders, and alumni", suffix: ", sharing real-world engineering experiences. " },
      { prefix: "Delving into ", highlight: "distributed systems, AI frontiers, and architectural paradigms", suffix: " shaping the modern technology landscape." },
    ],
    rules: [
      { prefix: "Open to ", highlight: "all registered students, engineers, and campus visitors", suffix: "." },
      { prefix: "Attendees must present their digital registration pass at the ", highlight: "auditorium entrance", suffix: "." },
      { prefix: "Interactive audience Q&A is encouraged; please follow ", highlight: "session moderator cues", suffix: "." },
      { prefix: "Exclusive ", highlight: "1-on-1 networking opportunities", suffix: " available in the post-session lounge." },
    ],
    format: [
      {
        roundTitle: "Segment 1: Keynote Engineering Discourses",
        points: [
          { prefix: "Deep-dive technical talks delivered by ", highlight: "distinguished engineering directors and researchers", suffix: "." },
          { prefix: "Covering real-world scale, performance bottlenecks, and systems design.", highlight: "", suffix: "" },
        ],
      },
      {
        roundTitle: "Segment 2: Alumni Fireside & Open Q&A",
        points: [
          { prefix: "An unscripted conversational panel followed by ", highlight: "direct microphone access for audience questions", suffix: "." },
          { prefix: "Informal networking and mentorship exchange.", highlight: "", suffix: "" },
        ],
      },
    ],
    contacts: [
      { name: "Swarnendu Bannerjee", phone: "9564027954" },
      { name: "Debarun Patra", phone: "8582922525" },
    ],
  },

  "hack-sangram": {
    edition: "KERNEL '26",
    categoryBadge: "HACKATHON",
    lastRegistrationDate: "30TH MARCH",
    mode: "On-Campus",
    teamSize: "2-4",
    prizePool: "20,000",
    timeline: {
      prelims: "Track Selection: TBD",
      finals: "12-Hour Sprint: TBA",
      time: "9:00 am - 9:00 pm (Sprint) · 9:30 pm (Demos)",
      venue: "Main Computer Center, Dept. of IT",
    },
    overviewSummary: [
      { prefix: "A high-octane 12-hour build sprint where teams turn ", highlight: "raw ideas into functional, production-ready prototypes", suffix: " from scratch under single-day pressure. " },
      { prefix: "Participants enjoy ", highlight: "full freedom of tech stack and domain", suffix: " with direct evaluation from industry juries." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "2 to 4 members", suffix: "." },
      { prefix: "All code must be authored during the ", highlight: "12-hour hackathon timeframe", suffix: "; commit logs will be verified." },
      { prefix: "Open tech stack: ", highlight: "Web, AI/ML, Cloud, IoT, Systems, Mobile, or Blockchain", suffix: "." },
      { prefix: "A ", highlight: "working prototype is mandatory", suffix: " for final stage demonstration; slide-only pitches are disqualified." },
      { prefix: "Judging criteria: ", highlight: "Innovation (30%), Technical Execution (35%), Design & Utility (20%), Pitch (15%)", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Phase 1: Sprint Kickoff & Mid-Evaluation",
        points: [
          { prefix: "Problem tracks announced and sprint commences at 9:00 am.", highlight: "", suffix: "" },
          { prefix: "Mandatory ", highlight: "mid-point checkpoint with industry mentors", suffix: " to review technical feasibility." },
        ],
      },
      {
        roundTitle: "Phase 2: Live Pitch & Working Demo",
        points: [
          { prefix: "A ", highlight: "4-minute live working demonstration", suffix: " followed by 2 minutes of technical interrogation by judges." },
          { prefix: "Winners announced immediately during the ", highlight: "midnight closing ceremony", suffix: "." },
        ],
      },
    ],
    contacts: [
      { name: "Kaustav Mandal", phone: "+91 89182 21701" },
      { name: "Prama Roy", phone: "+91 82933 31677" },
    ],
  },
  bgmi: {
    edition: "KERNEL '26",
    categoryBadge: "ESPORTS",
    lastRegistrationDate: "TBA",
    mode: "Online / Arena",
    teamSize: "Squad (4)",
    prizePool: "30,000",
    timeline: {
      prelims: "TBD",
      finals: "TBA",
      time: "TBA",
      venue: "Online / Campus Esports Arena",
    },
    overviewSummary: [
      { prefix: "KRAFTON India Esports presents the ", highlight: "College Campus Tour: BGMI Championship", suffix: " at KERNEL 1.0. " },
      { prefix: "Battlegrounds Mobile India brings collegiate squads into an intense battle royale showdown with a massive ", highlight: "₹30,000 prize pool", suffix: ". " },
      { prefix: "Open for all collegiate teams across India to drop into the battlegrounds and claim the championship.", highlight: "", suffix: "" },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "4 players (Squad)", suffix: " with optional 1 substitute." },
      { prefix: "All players must play on ", highlight: "mobile devices only", suffix: " (emulators, tablets/iPads, and triggers are strictly prohibited)." },
      { prefix: "Use of third-party software, hacks, or ", highlight: "cheating tools will result in permanent disqualification", suffix: "." },
      { prefix: "Teams must join custom room lobbies ", highlight: "15 minutes prior", suffix: " to match schedule." },
      { prefix: "Scoring is determined by ", highlight: "standard BGIS / Krafton point system", suffix: " (placement points + finish points)." },
    ],
    format: [
      {
        roundTitle: "Round 1: Online Qualifiers",
        points: [
          { prefix: "Registered squads battle across multiple lobbies in ", highlight: "classic Erangel and Miramar maps", suffix: "." },
          { prefix: "Top-ranking squads from each group advance to the ", highlight: "Grand Finals", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: Grand Finals",
        points: [
          { prefix: "Elite squads compete over ", highlight: "5 intense consecutive matches", suffix: " for the ₹30,000 prize purse." },
          { prefix: "Matches streamed live with ", highlight: "real-time caster telemetry", suffix: "." },
        ],
      },
    ],
    contacts: [
      { name: "Organizing Committee", phone: "+91 82769 91374" },
    ],
  },
  "real-cricket": {
    edition: "KERNEL '26",
    categoryBadge: "ESPORTS",
    lastRegistrationDate: "TBA",
    mode: "Online / Arena",
    teamSize: "Solo (1v1)",
    prizePool: "10,000",
    timeline: {
      prelims: "TBD",
      finals: "TBA",
      time: "TBA",
      venue: "Online / Campus Esports Arena",
    },
    overviewSummary: [
      { prefix: "KRAFTON India Esports presents the ", highlight: "College Campus Tour: Real Cricket Championship", suffix: " at KERNEL 1.0. " },
      { prefix: "The ultimate mobile cricket esports tournament featuring a ", highlight: "₹10,000 prize pool", suffix: ". " },
      { prefix: "Experience realistic cricket simulations, tactical bowling, and strategic shot execution on the digital pitch.", highlight: "", suffix: "" },
    ],
    rules: [
      { prefix: "Tournament is conducted in ", highlight: "Solo 1v1 multiplayer format", suffix: "." },
      { prefix: "Players must compete on official ", highlight: "Real Cricket mobile client", suffix: " updated to the latest version." },
      { prefix: "Disconnections or deliberate quits during active overs will result in ", highlight: "forfeiture of the match", suffix: "." },
      { prefix: "Fair play policy is strictly enforced; ", highlight: "exploits or modified APKs", suffix: " will result in immediate disqualification." },
    ],
    format: [
      {
        roundTitle: "Round 1: Knockout Qualifiers",
        points: [
          { prefix: "Head-to-head ", highlight: "5-over quick matches", suffix: " in a single-elimination bracket." },
          { prefix: "Winners advance through the bracket to the ", highlight: "Championship Round", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: Championship Finals",
        points: [
          { prefix: "Top finalists battle in a ", highlight: "Best-of-3 10-over showdown", suffix: " to determine the champion." },
          { prefix: "The victor claims the lion's share of the ", highlight: "₹10,000 prize pool", suffix: "." },
        ],
      },
    ],
    contacts: [
      { name: "Organizing Committee", phone: "+91 82769 91374" },
    ],
  },
};
