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
  brochureUrl?: string;
  timeline: TimelineDetail;
  overviewSummary: RuleItem[];
  rules: RuleItem[];
  format: FormatRound[];
  contacts: ContactPerson[];
}

export const EVENT_DOSSIERS: Record<string, EventDossier> = {
  "mogoj-dholai": {
    edition: "KERNEL '26",
    categoryBadge: "COMPETITIVE PROGRAMMING",
    lastRegistrationDate: "10TH DECEMBER",
    mode: "Hybrid (Online Qualifier + Onsite Finale)",
    teamSize: "Individual (1 Member)",
    prizePool: "6,000",
    brochureUrl: "/details/mogoj-dholai.pdf",
    timeline: {
      prelims: "11 Dec 2026 (8:00 PM – 9:00 PM IST, Online)",
      finals: "19 Dec 2026 (12:00 PM – 2:00 PM IST, Onsite)",
      time: "12:00 pm - 2:00 pm IST (2-Hour Onsite Finale)",
      venue: "SMCC Building, JU Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "An elite ", highlight: "algorithmic problem-solving contest", suffix: " hosted under Kernel 1.0 by the Department of IT, Jadavpur University." },
      { prefix: "Designed to test analytical limits, data structure mastery, and computational complexity optimization under strict time constraints, evaluated strictly under ", highlight: "standard ICPC scoring rules", suffix: "." },
    ],
    rules: [
      { prefix: "Open to undergraduate and postgraduate students from any recognized university across ", highlight: "all streams", suffix: "." },
      { prefix: "Participation format is ", highlight: "strictly individual (1 member)", suffix: "; team entries are not permitted." },
      { prefix: "Standard ICPC-style scoring rules apply: rankings determined by ", highlight: "total problems solved and cumulative penalty time", suffix: "." },
      { prefix: "Permitted programming languages: ", highlight: "C++, C, Java, and Python 3", suffix: "." },
      { prefix: "Participants must connect to the official contest server; ", highlight: "plagiarism and AI-assisted code generation are strictly prohibited", suffix: " and result in immediate disqualification." },
      { prefix: "Finalists must bring their own laptops and carry ", highlight: "valid student ID cards", suffix: " for onsite verification." },
    ],
    format: [
      {
        roundTitle: "Round 1: Online Preliminary Qualifier (11 Dec 2026 • 8:00–9:00 PM IST)",
        points: [
          { prefix: "A 1-hour standard competitive programming coding challenge featuring standard CP problems of varying difficulty in unsorted order.", highlight: "", suffix: "" },
          { prefix: "Hosted on the live contest platform (official link sent via email); the ", highlight: "top 75 participants", suffix: " advance to the On-Campus Grand Finale." },
        ],
      },
      {
        roundTitle: "Round 2: On-Campus Grand Finale (19 Dec 2026 • 12:00–2:00 PM IST)",
        points: [
          { prefix: "A high-intensity 2-hour onsite ICPC-style showdown at SMCC Building, JU Salt Lake Campus with hidden test cases.", highlight: "", suffix: "" },
          { prefix: "Live scoreboard is ", highlight: "frozen during the final 60 minutes", suffix: " of the contest to heighten suspense." },
        ],
      },
    ],
    contacts: [
      { name: "Soumyadeep Roy Chowdhury", phone: "+91 9163746705" },
      { name: "Ayush Bhakta", phone: "+91 9903752006" },
    ],
  },

  hojohborolo: {
    edition: "KERNEL '26",
    categoryBadge: "SOFTWARE CHALLENGE",
    lastRegistrationDate: "10TH DECEMBER",
    mode: "Hybrid (Online OA + Onsite Sprint)",
    teamSize: "2-3 Members",
    prizePool: "6,000",
    brochureUrl: "/details/hojohborolo.pdf",
    timeline: {
      prelims: "11 Dec 2026 (7:00 PM – 10:00 PM, Online OA)",
      finals: "19 Dec 2026 (2:00 PM – 5:00 PM, Onsite Sprint)",
      time: "2:00 pm - 5:00 pm IST (3-Hour Sprint)",
      venue: "SMCC Building, JU Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "A fast-paced, non-stop creative software challenge where teams build ", highlight: "quirky, unusual, and wildly entertaining software", suffix: " rather than traditional corporate utilities." },
      { prefix: "Inspired by internet experiments and digital absurdity, participants combine unconventional UX with creative engineering, prioritizing ", highlight: "joy, humor, and creative UI over conventional hackathon metrics", suffix: "." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "2 to 3 members", suffix: " (minimum 2, maximum 3)." },
      { prefix: "Projects must prioritize creative UI, absurdity, and humor; evaluated strictly on ", highlight: "entertainment value rather than system scalability", suffix: "." },
      { prefix: "All core logic must be authored during the official 3-hour hack window; ", highlight: "frequent, small commits", suffix: " to a public repository throughout the sprint are strongly encouraged." },
      { prefix: "Round 1 (Prelims): The use of Large Language Models (LLMs) is ", highlight: "strictly discouraged", suffix: "." },
      { prefix: "Round 2 (Finale): Given the fast 3-hour build window, the use of LLMs is ", highlight: "welcomed and credited", suffix: "; leveraging AI tools is not penalized." },
      { prefix: "Any tech stack is welcome: ", highlight: "Web, Mobile, CLI, IoT, Browser Extensions, or Game Engines", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Round 1 (Prelims): Online Dev Qualifier (11 Dec 2026 • 7:00–10:00 PM IST)",
        points: [
          { prefix: "A 30-minute online MCQ assessment taken in one continuous sitting within the 3-hour flexible window.", highlight: "", suffix: "" },
          { prefix: "Strictly one attempt per team exclusively from the ", highlight: "team leader's account", suffix: " (+4 marks correct, -1 mark incorrect). Top 20 teams advance." },
        ],
      },
      {
        roundTitle: "Round 2: Non-Stop Rapid Prototyping Sprint & Live Showcase (19 Dec 2026 • 2:00–5:00 PM IST)",
        points: [
          { prefix: "Secret thematic constraints revealed at opening bell; teams build their quirky prototype from scratch during the ", highlight: "official 3-hour window", suffix: "." },
          { prefix: "Delivered via a ", highlight: "5-minute live stage demo", suffix: " followed by a 2-minute interactive Q&A session with the jury." },
        ],
      },
    ],
    contacts: [
      { name: "Ankit Roy", phone: "+91 9433481219" },
      { name: "Rajdeep Dhar", phone: "+91 8670825911" },
    ],
  },

  "data-nilaam": {
    edition: "KERNEL '26",
    categoryBadge: "MACHINE LEARNING",
    lastRegistrationDate: "11TH DECEMBER",
    mode: "Hybrid (Online Prelim + Onsite Finale)",
    teamSize: "2-4 Members",
    prizePool: "6,000",
    brochureUrl: "/details/data-nilaam.pdf",
    timeline: {
      prelims: "12 Dec 2026 (6:00 PM – 9:00 PM IST, Online)",
      finals: "19 Dec 2026 (5:00 PM – 8:00 PM IST, Onsite)",
      time: "5:00 pm - 8:00 pm IST (3-Hour Onsite Finale)",
      venue: "SMCC Building, JU Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "A machine learning competition about the value of data where teams run ", highlight: "NovaCredit, a simulated digital lender", suffix: ", deciding for 10,000 applicants which of four credit cards to offer or decline." },
      { prefix: "Every finalist team starts with a basic dataset, free previews, and 1,000 coins; ", highlight: "exclusive datasets are sold in live auctions", suffix: " during the finale to boost predictive profit." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "2 to 4 members", suffix: "." },
      { prefix: "For the finale, at least one team member needs a ", highlight: "Kaggle account ready by 17 December 2026", suffix: " to receive purchased private datasets." },
      { prefix: "Modeling runs on ", highlight: "free Kaggle CPU notebooks", suffix: " (no GPU, no installs); any library available on Kaggle and any AI assistant is allowed." },
      { prefix: "Final notebook must start with the standard checksum cell, run under 10 minutes with internet off, print the fairness table, and be declared before the lock.", highlight: "", suffix: "" },
      { prefix: "Strict fair play: no outside data or cross-team sharing; using ", highlight: "sex in the model results in immediate disqualification", suffix: "." },
      { prefix: "Finale scoring is a published formula: ", highlight: "1000 × (profit / best profit) + 0.1 × coins left − 20 × (default rate penalty over 14.5%)", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Round 1: Online Preliminary MCQ (12 Dec 2026 • 6:00–9:00 PM IST)",
        points: [
          { prefix: "A 30-minute online MCQ assessment taken on Unstop with flexible start between 6:00 PM and 8:30 PM.", highlight: "", suffix: "" },
          { prefix: "Attempted once by the team leader on behalf of the team; the ", highlight: "Top 25 teams", suffix: " advance to the onsite finale." },
        ],
      },
      {
        roundTitle: "Round 2: Onsite Finale & Live Data Auctions (19 Dec 2026 • 5:00–8:00 PM IST)",
        points: [
          { prefix: "5:00 PM briefing, 5:15 PM market opens with live data auctions and open shop on the event portal.", highlight: "", suffix: "" },
          { prefix: "8:00 PM prediction lock and notebook declaration; results revealed at ≈8:30 PM after official notebook verification.", highlight: "", suffix: "" },
        ],
      },
    ],
    contacts: [
      { name: "Debarun Patra", phone: "+91 8582922525" },
      { name: "Naireet Sadhukhan", phone: "+91 9875625835" },
    ],
  },

  "hack-sangram": {
    edition: "KERNEL '26",
    categoryBadge: "HACKATHON",
    lastRegistrationDate: "16TH DECEMBER",
    mode: "Hybrid (Online IDEATE + Onsite Finale)",
    teamSize: "2-4 (Min. 1 Female)",
    prizePool: "10,000",
    brochureUrl: "/details/hack-sangram.pdf",
    timeline: {
      prelims: "25 Nov – 16 Dec 2026 (IDEATE PPT, Online)",
      finals: "20 Dec 2026 (8:00 AM – 8:00 PM IST, 12 Hours)",
      time: "8:00 am - 8:00 pm IST (12-Hour Sprint)",
      venue: "SMCC Building, JU Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "An inter-college, 12-hour open-innovation hackathon hosted under Kernel 1.0 by the Department of IT, Jadavpur University, challenging teams to build ", highlight: "working prototypes for bold, real-world challenges", suffix: "." },
      { prefix: "Features 5 official problem statements: ", highlight: "The 60-Second Chaos Engine, Uncooperative AI, Proof of Follow-Through, Death to Dashboards, and The Bot-Only Economy", suffix: "." },
    ],
    rules: [
      { prefix: "Teams must consist of 2–4 members, including ", highlight: "at least one female candidate", suffix: "; cross-college teams are permitted." },
      { prefix: "Compulsory dual registration: Every participant must register through Unstop and complete the ", highlight: "fee verification Google Form (₹50 per person)", suffix: "." },
      { prefix: "Original work: All solutions must be developed during the allotted 12-hour hackathon duration; ", highlight: "previously developed projects cannot be presented", suffix: "." },
      { prefix: "Open-source libraries, APIs, and AI-assisted development tools are permitted, provided ", highlight: "any pre-existing code or templates are declared", suffix: "." },
      { prefix: "Working prototype mandatory: Teams must demonstrate their live working prototype to the judging panel; ", highlight: "slide-only pitches are disqualified", suffix: "." },
      { prefix: "Official evaluation parameters: Technical Implementation (25%), Functionality (25%), Innovation (20%), Practical Impact (15%), Presentation & Q&A (10%), Surprise Challenge (5%).", highlight: "", suffix: "" },
    ],
    format: [
      {
        roundTitle: "Round 1: IDEATE — Online Screening Round (25 Nov – 16 Dec 2026)",
        points: [
          { prefix: "Registered teams submit a 5–7 slide idea deck on Unstop covering problem statement, solution, tech stack, and impact plan.", highlight: "", suffix: "" },
          { prefix: "The ", highlight: "top 25–30 teams", suffix: " advance to the Offline Grand Finale; results declared 17 Dec 2026 at 8:00 PM IST." },
        ],
      },
      {
        roundTitle: "Round 2: INNOVATE — Offline Grand Finale (20 Dec 2026 • 8:00 AM – 8:00 PM IST)",
        points: [
          { prefix: "A 12-hour continuous prototype sprint at SMCC Building, JU Salt Lake Campus with mid-point mentor checkpoints.", highlight: "", suffix: "" },
          { prefix: "Final live working demonstration to the judging panel followed by award ceremony (Winner: ₹5,000, 1st Runner-Up: ₹3,000, 2nd Runner-Up: ₹2,000).", highlight: "", suffix: "" },
        ],
      },
    ],
    contacts: [
      { name: "Prama Ray", phone: "+91 8293331677" },
      { name: "Kaustav Mondal", phone: "+91 8918221701" },
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
      { name: "Organizing Committee", phone: "+91 8276991374" },
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
      { name: "Organizing Committee", phone: "+91 8276991374" },
    ],
  },
};
