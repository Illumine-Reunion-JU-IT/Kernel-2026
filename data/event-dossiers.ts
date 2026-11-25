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
    edition: "KERNEL 1.0",
    categoryBadge: "COMPETITIVE PROGRAMMING",
    lastRegistrationDate: "10TH DEC 2026",
    mode: "Hybrid (Online + Onsite)",
    teamSize: "Individual (Solo Entry)",
    prizePool: "6,000 + Certificates",
    timeline: {
      prelims: "11 Dec 2026 · 8:00 PM – 9:00 PM IST (Online)",
      finals: "19 Dec 2026 (Onsite Finale)",
      time: "12:00 PM – 2:00 PM IST (2 Hours)",
      venue: "SMCC Building, Jadavpur University, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "An elite ", highlight: "algorithmic problem-solving contest", suffix: " hosted under Kernel 1.0 by the Dept. of IT, Jadavpur University. " },
      { prefix: "Designed to test analytical limits, data structure mastery, and ", highlight: "computational complexity optimization", suffix: " across problems from DP to graph theory " },
      { prefix: "under ", highlight: "standard ICPC scoring rules", suffix: "." },
    ],
    rules: [
      { prefix: "Strictly ", highlight: "individual participation (Solo Entry)", suffix: "; open to UG & PG students across all streams. Register on Unstop by 10 Dec 2026, 11:59 PM IST." },
      { prefix: "Every registered participant must join the ", highlight: "official Discord channel (discord.gg/XTCetvVU5Y)", suffix: " for contest announcements and updates." },
      { prefix: "Standard ICPC-style rules apply in both rounds: rankings are determined by ", highlight: "total problems solved and cumulative penalty time", suffix: "." },
      { prefix: "Permitted languages: ", highlight: "C++, C, Java, and Python 3", suffix: ". Plagiarism and AI-assisted code generation lead to immediate disqualification." },
      { prefix: "Qualified finalists must bring their ", highlight: "own laptops and valid student ID cards", suffix: " for onsite verification." },
      { prefix: "Prize Pool (₹6,000 + Certificates): ", highlight: "Winner ₹3,000 · 1st Runner-Up ₹2,000 · 2nd Runner-Up ₹1,000", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Round 1: Online Preliminary Qualifier (11 Dec 2026)",
        points: [
          { prefix: "1-hour standard CP contest (", highlight: "8:00 PM – 9:00 PM IST", suffix: ") featuring problems of varying difficulty in unsorted order; link sent via email." },
          { prefix: "Top 75 participants from Round 1 advance to the ", highlight: "On-Campus Grand Finale", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: On-Campus Grand Finale (19 Dec 2026)",
        points: [
          { prefix: "High-intensity ", highlight: "2-hour onsite ICPC-style showdown (12:00 PM – 2:00 PM IST)", suffix: " at SMCC Building, JU Salt Lake Campus with hidden test cases." },
          { prefix: "Live scoreboard will be ", highlight: "frozen during the final 60 minutes", suffix: " to heighten suspense." },
        ],
      },
    ],
    contacts: [
      { name: "Soumyadeep Roy Chowdhury", phone: "+91 9163746705" },
      { name: "Ayush Bhakta", phone: "+91 9903752006" },
    ],
  },

  hojohborolo: {
    edition: "KERNEL 1.0",
    categoryBadge: "CREATIVE SOFTWARE CHALLENGE",
    lastRegistrationDate: "11TH DEC 2026",
    mode: "Hybrid (Online OA + On-Campus)",
    teamSize: "2–3 Members",
    prizePool: "6,000 + Certificates",
    timeline: {
      prelims: "11 Dec 2026 · 7:00 PM – 10:00 PM IST (Online OA)",
      finals: "19 Dec 2026 (Rapid Prototyping Sprint)",
      time: "2:30 PM – 5:00 PM IST (2.5 Hours)",
      venue: "SMCC Building, Jadavpur University, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "Where Logic Takes a Backseat and Absurdity Compiles — a fast-paced, non-stop creative software challenge to build ", highlight: "quirky, unusual, and wildly entertaining software", suffix: ". " },
      { prefix: "Inspired by playful internet experiments and digital absurdity, teams combine ", highlight: "unconventional UX and creative engineering", suffix: " prioritizing joy and humor over corporate metrics." },
    ],
    rules: [
      { prefix: "Teams must consist of ", highlight: "2 to 3 members", suffix: "; compulsory registration on Unstop for team verification and eligibility." },
      { prefix: "Entertainment over utility: submissions are evaluated strictly on ", highlight: "creative UI, absurdity, humor, and entertainment value", suffix: "." },
      { prefix: "Fresh code & incremental commits: all core logic must be authored during Round 2 with ", highlight: "frequent small commits to a public GitHub repo", suffix: " (pre-built/forked templates prohibited)." },
      { prefix: "Round-wise LLM policy: ", highlight: "Round 1 strictly discourages LLMs", suffix: "; Round 2 welcomes and credits AI/LLM tools." },
      { prefix: "Any tech stack welcome (Web, Mobile, CLI, IoT, Browser Extensions, Game Engines). ", highlight: "Winners declared 20 Dec 2026", suffix: " (₹3,000 / ₹2,000 / ₹1,000)." },
    ],
    format: [
      {
        roundTitle: "Round 1 (Prelims): Online Dev Qualifier (11 Dec 2026)",
        points: [
          { prefix: "30-minute MCQ assessment taken in one sitting within the ", highlight: "7:00 PM – 10:00 PM IST", suffix: " window (+4 / -1 marking)." },
          { prefix: "Strictly ", highlight: "one attempt per team exclusively from the team leader's account", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: Non-Stop Rapid Prototyping Sprint (19 Dec 2026)",
        points: [
          { prefix: "Secret thematic creative constraints revealed at opening bell; ", highlight: "2.5-hour non-stop sprint (2:30 PM – 5:00 PM IST)", suffix: " at SMCC Building." },
          { prefix: "Submit a short ", highlight: "recorded demo video and public GitHub repository link", suffix: " before the window closes." },
        ],
      },
    ],
    contacts: [
      { name: "Ankit Roy", phone: "+91 9433481219" },
      { name: "Rajdeep Dhar", phone: "+91 8670825911" },
    ],
  },

  "data-nilaam": {
    edition: "KERNEL 1.0",
    categoryBadge: "MACHINE LEARNING",
    lastRegistrationDate: "11TH DEC 2026",
    mode: "Hybrid (Online MCQ + Onsite Finale)",
    teamSize: "2–4 Members (Free Entry)",
    prizePool: "6,000 + Certificates",
    timeline: {
      prelims: "12 Dec 2026 · 6:00 PM – 9:00 PM IST (Online MCQ)",
      finals: "19 Dec 2026 (Onsite Finale)",
      time: "5:00 PM – 8:00 PM IST (3 Hours · Results ≈ 8:30 PM)",
      venue: "SMCC Building, Jadavpur University, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "Build the bank. Buy the data. Teams run ", highlight: "NovaCredit, a new digital lender", suffix: ", deciding which of four credit cards (or decline) to offer 10,000 applicants. " },
      { prefix: "Starting with 1,000 coins, teams buy exclusive datasets in ", highlight: "live auctions (datanilam-kernel.illumine-ju-it.in)", suffix: " and train models on Kaggle CPU notebooks where unspent coins boost final scores." },
    ],
    rules: [
      { prefix: "Teams of ", highlight: "2 to 4 members (Free Entry)", suffix: " across all UG/PG streams; register on Unstop by 11 Dec 2026, 11:59 PM IST. At least one member needs a Kaggle account by 17 Dec." },
      { prefix: "Bring your own charged laptops logged into Kaggle; train on ", highlight: "free Kaggle CPU notebooks (no GPU, no installs, internet off, <10 mins)", suffix: "; AI assistants allowed." },
      { prefix: "To bid in auctions, your best Kaggle leaderboard score must reach ", highlight: "1,190 (build a real model first)", suffix: "." },
      { prefix: "Fair play: no outside data or file sharing between teams; ", highlight: "using sex in the model disqualifies", suffix: " (notebooks are re-run)." },
      { prefix: "Published scoring formula (no judges): ", highlight: "1000 × (profit ÷ best profit) + 0.1 × coins left − 20 × (default rate % > 14.5%)", suffix: ". Prizes: ₹3,000 / ₹2,000 / ₹1,000." },
    ],
    format: [
      {
        roundTitle: "Round 1: Online Preliminary MCQ (12 Dec 2026)",
        points: [
          { prefix: "30-minute MCQ assessment on Unstop (", highlight: "6:00 PM – 9:00 PM IST flexible start", suffix: "); attempted once by the team leader only." },
          { prefix: "Top ", highlight: "25 teams advance", suffix: " to the onsite finale." },
        ],
      },
      {
        roundTitle: "Round 2: Onsite Finale & Live Data Auction (19 Dec 2026)",
        points: [
          { prefix: "5:00 PM briefing & starter notebook; ", highlight: "5:15 PM market & live auctions open", suffix: " on the portal; datasets delivered privately to your Kaggle account." },
          { prefix: "8:00 PM prediction lock (checksum cell + fairness table required); ", highlight: "≈ 8:30 PM results & reveal", suffix: "." },
        ],
      },
    ],
    contacts: [
      { name: "Debarun Patra", phone: "+91 8582922525" },
      { name: "Naireet Sadhukhan", phone: "+91 9875625835" },
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
      { name: "Swarnendu Bannerjee", phone: "+91 9564027954" },
      { name: "Debarun Patra", phone: "+91 8582922525" },
    ],
  },

  "hack-sangram": {
    edition: "KERNEL 1.0",
    categoryBadge: "12-HOUR HACKATHON",
    lastRegistrationDate: "16TH DEC 2026",
    mode: "Hybrid (Online IDEATE + Offline Finale)",
    teamSize: "2–4 Members (Min. 1 Female)",
    prizePool: "10,000 Cash + Certificates",
    timeline: {
      prelims: "25 Nov – 16 Dec 2026 (Online IDEATE · Closes 11:59 PM IST)",
      finals: "20 Dec 2026 (Results 17 Dec, 8:00 PM IST)",
      time: "8:00 AM – 8:00 PM IST (12 Hours)",
      venue: "SMCC Building, Jadavpur University, Salt Lake Campus",
    },
    overviewSummary: [
      { prefix: "Think. Build. Innovate. — an inter-college, ", highlight: "12-hour open-innovation hackathon", suffix: " hosted under Kernel 1.0 by the Dept. of IT, Jadavpur University. " },
      { prefix: "Two-stage arena: an online ideation screening across ", highlight: "5 official problem statements", suffix: " followed by an intense 12-hour on-campus Grand Finale." },
    ],
    rules: [
      { prefix: "Teams of ", highlight: "2–4 members (minimum 1 female candidate)", suffix: "; cross-college teams permitted. Register via Unstop by 16 Dec 2026, 11:59 PM IST." },
      { prefix: "Every registered participant must join the ", highlight: "official Discord channel (discord.gg/XTCetvVU5Y)", suffix: " for announcements and coordination." },
      { prefix: "All code developed during the 12-hour finale; ", highlight: "open-source libraries, APIs, and AI-assisted tools", suffix: " allowed if explicitly declared." },
      { prefix: "5 Problem Statements: ", highlight: "60-Second Chaos Engine · Uncooperative AI · Proof of Follow-Through · Death to Dashboards · The Bot-Only Economy", suffix: "." },
      { prefix: "Judging Criteria: ", highlight: "Innovation (20%) · Technical (25%) · Prototype (25%) · Impact (15%) · Presentation (10%) · Surprise Challenge (5%)", suffix: "." },
      { prefix: "Prize Pool (₹10,000 Cash + Certificates): ", highlight: "Winner ₹5,000 · 1st Runner-Up ₹3,000 · 2nd Runner-Up ₹2,000", suffix: "." },
    ],
    format: [
      {
        roundTitle: "Round 1: IDEATE — Online Screening (25 Nov – 16 Dec 2026)",
        points: [
          { prefix: "Select 1 of the 5 problem statements and submit a ", highlight: "5–7 slide PDF/PPT deck on Unstop", suffix: " (problem, solution, innovation, tech stack, plan, impact)." },
          { prefix: "Top 25–30 teams shortlisted; ", highlight: "results declared on 17 Dec 2026 at 8:00 PM IST", suffix: "." },
        ],
      },
      {
        roundTitle: "Round 2: INNOVATE — Offline Grand Finale (20 Dec 2026)",
        points: [
          { prefix: "12-hour on-campus sprint (", highlight: "8:00 AM – 8:00 PM IST", suffix: ") at SMCC Building, JU Salt Lake Campus; all registered team members must attend." },
          { prefix: "Submit source code, documentation, and final presentation, followed by a ", highlight: "live working demo to the judging panel", suffix: "." },
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
