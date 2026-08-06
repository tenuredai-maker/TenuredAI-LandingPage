export interface BriefMetadata {
  label: string;
  value: string;
  isBig?: boolean;
}

export interface BriefAnecdote {
  number: string;
  title: string;
  runtime: string;
  text: string[];
  punchline: string;
}

export interface BriefStat {
  number: string;
  label: string;
}

export interface BriefQA {
  question: string;
  answer: string;
  isHard?: boolean;
}

export interface BriefReachThrough {
  title: string;
  description: string;
  quote?: string;
}

export interface BriefRule {
  title: string;
  guideline: string;
  description: string;
}

export interface BriefReference {
  episode: string;
  description: string;
  quote: string;
}

export interface BriefSection {
  number?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  type: "text" | "anecdotes" | "stats" | "qa" | "reach-throughs" | "rules" | "redirect" | "clippables" | "references" | "arguments" | "appendix";
  text?: string;
  quote?: string;
  anecdotes?: BriefAnecdote[];
  stats?: BriefStat[];
  qa?: BriefQA[];
  reachThroughs?: BriefReachThrough[];
  rules?: BriefRule[];
  references?: BriefReference[];
  clippables?: { title: string; quote: string }[];
  arguments?: { title: string; description: string }[];
  appendixItems?: { name: string; host: string; strategy: string; tier: string }[];
}

export interface PodcastBrief {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  documentNumber: string;
  category: string;
  metadata: BriefMetadata[];
  introduction: string;
  sections: BriefSection[];
}

export const PODCAST_BRIEFS_DATA: PodcastBrief[] = [
  {
    id: "master",
    title: "The Universal Brief",
    subtitle: "Master Template",
    tagline: "The reusable briefing structure. Adapt per-pod by replacing the customization fields.",
    documentNumber: "Document 1",
    category: "Universal Template",
    metadata: [
      { label: "Field A", value: "Pod name + host" },
      { label: "Field B", value: "Audience profile" },
      { label: "Field C", value: "Format + runtime" },
      { label: "Field D", value: "Prior-episode references" },
      { label: "Field E", value: "Episode-specific objective" },
      { label: "Field F", value: "Pre-cleared CTAs" }
    ],
    introduction: "Every brief in this library follows the same six-section structure. The structure has been refined across more than forty internal mock interviews and three external coaching engagements. Departure from the structure is permitted only when a specific pod's format makes a section irrelevant — in which case the section is marked Not Applicable rather than dropped.",
    sections: [
      {
        number: "§ 01",
        title: "The opener",
        subtitle: "The first thirty seconds",
        intro: "Every podcast opens with some version of the question 'tell me about Tenured AI in your own words.' The answer is the most important thirty seconds of the entire interview, because it determines whether the host will conduct the rest of the conversation in our vocabulary or in theirs. The opener has to do three things in a single beat: name the company, name the problem, and name the wedge.",
        type: "redirect",
        text: "The canonical opener is 99 words and runs about 35 seconds at a normal speaking pace. It can be compressed to 60 words for fast-format pods (Hard Fork, Pivot) and expanded to 140 words for narrative pods (Acquired).",
        quote: "Tenured AI is the verification infrastructure company building the Sovereign Talent Ledger for the AI era. The problem we solve is the proficiency paradox — credentials have become uninformative because the underlying competencies they certify now change on a sub-annual cycle. Our wedge is the Performance Bond: every verified hire on our platform carries a real, financially-accountable bond. We don't tell employers a candidate is competent. We back our claim with our own capital. That's what makes the signal worth something — and that's what just got us into production underwriting with Chubb."
      },
      {
        number: "§ 02",
        title: "The three load-bearing anecdotes",
        subtitle: "What we want listeners to remember",
        intro: "Listeners remember stories. They forget statistics. The brief equips the spokesperson with three pre-rehearsed anecdotes that each carry one piece of load-bearing argument. The anecdotes are designed to be deployable in 90–180 seconds and to land independently of one another, so the spokesperson can lead with whichever one the conversation organically opens to.",
        type: "anecdotes",
        anecdotes: [
          {
            number: "Anecdote 1",
            title: "The University of Houston cup of coffee",
            runtime: "~2 min",
            text: [
              "The first conversation with the University of Houston happened in a coffee shop on Calhoun Boulevard. Dameon opened with a question: 'If a graduate of this university takes a job at a Fortune 500 firm at two hundred thousand dollars of compensation, what does this university get?' The administrator answered honestly: 'Nothing. Maybe a future donation if she remembers us. Probably not even that.'",
              "Dameon showed her the math on the back of the menu. Under our 40/40/20 architecture, the university would receive $80,000 of perpetual Innovation Fund yield from that single hire — paid in cash, recorded on a settlement ledger, recurring across the graduate's career.",
              "The administrator asked the question the rest of the conversation hinged on: 'What do you need from us?' Dameon's answer: 'Almost nothing.'"
            ],
            punchline: "Lands the institutional partnership thesis. Best opening anecdote for narrative-format pods."
          },
          {
            number: "Anecdote 2",
            title: "The $340,000 in four minutes",
            runtime: "~90 sec",
            text: [
              "Day three of the Grand Opening, June 21, 2026. First live B-300 auction in front of 300 people. Triple-89 verified quant engineer, NYC role, posted reserve of $275,000. Six firms bid. The auction closed at $340,000 in four minutes and thirteen seconds, with two snipe extensions in the final 90 seconds.",
              "The auction settled on the spot. The winning firm paid the $17,000 bond premium at settlement. The candidate's Personal Reserve received $68,000 within ninety seconds of close. The candidate's Alma Mater received $136,000 in Innovation Fund yield. The Texas Workforce Treasury received $68,000. End-to-end in under five minutes."
            ],
            punchline: "Lands the operational reality. Best anecdote for skeptical-investor pods where listeners need to see the platform actually clear."
          },
          {
            number: "Anecdote 3",
            title: "The CISO who asked the right question",
            runtime: "~2 min",
            text: [
              "During the day-one CISO panel at the Grand Opening, the Meridian Atlantic CISO was asked what had been hardest about onboarding to the Chubb pilot. The expected answer was a polite description of integration work.",
              "The actual answer was: 'The hardest part wasn't the integration — it was the internal conversation about which employees counted as \"AI-touchpoint.\" You forced us to produce our first complete inventory of AI-augmented roles. The integration didn't ask anything new of us. It just asked us to be honest with ourselves about what we already knew.'",
              "That sentence is the entire enterprise pilot thesis in one quote, delivered by a buyer, on stage, in front of three hundred people."
            ],
            punchline: "Lands the enterprise procurement thesis. Best anecdote when host asks about customer experience or pilot mechanics."
          }
        ]
      },
      {
        number: "§ 03",
        title: "The pre-cleared statistics",
        subtitle: "The numbers we are cleared to cite live",
        intro: "Every statistic below has been verified against the company's commercial records, cross-referenced against the Series A diligence package, and pre-cleared by General Counsel for unrestricted use in live media. Statistics outside this list require pre-clearance through the press desk before live citation.",
        type: "stats",
        stats: [
          { number: "21", label: "Patents filed" },
          { number: "$45M", label: "Series A raised" },
          { number: "$285M", label: "Post-money valuation" },
          { number: "$150K", label: "Default bond face" },
          { number: "5.0%", label: "Bond premium" },
          { number: "7%", label: "Aggregate claim rate" },
          { number: "15:1", label: "Bond leverage" },
          { number: "$340K", label: "First live auction close" },
          { number: "35%+", label: "Platinum tier credit" },
          { number: "$5.25M", label: "Fortune-500 example savings" },
          { number: "3.5×", label: "Pipeline vs forecast" },
          { number: "12", label: "Genesis Institution target" }
        ]
      },
      {
        number: "§ 04",
        title: "The hard questions",
        subtitle: "What the host might press on",
        intro: "Every brief contains a hard-question rehearsal section, in which the comms team anticipates the toughest questions the host might raise and pre-arms the spokesperson with the company's prepared answer. The universal hard-question bank below applies to nearly every pod and should be mastered before any appearance.",
        type: "qa",
        qa: [
          {
            question: "Isn't this just a credentialing platform with extra steps?",
            answer: "No, and the difference is structural. A credentialing platform sells a one-time certification and disengages. We sell a continuous underwriting relationship — the score is recomputed monthly, the bond is contractually live for twelve months, and the platform takes a financial loss when the signal fails. Credentialing platforms have no economic exposure to whether their certifications turn out to be accurate. We have $150,000 of capital exposure on every hire we facilitate. That is a category difference, not a feature difference.",
            isHard: true
          },
          {
            question: "What stops a competitor from copying this?",
            answer: "Three things, in order of difficulty. First, the actuarial reserve — we have spent eighteen months building the bond reserve to a target ratio of fifteen percent of aggregate face value outstanding, which is roughly double what conventional surety carriers maintain. Second, the regulator-grade integration with Chubb's Cyber Central platform — that integration took six months of joint engineering work and is now contractually exclusive at the data-stream level for the duration of the pilot. Third, the institutional partnerships under the 40/40/20 architecture — those relationships are governed by six-month committee processes that competitors will have to run for themselves. None of these moats is technological. All of them are operational. That's the moat we wanted.",
            isHard: true
          },
          {
            question: "What happens when the AI scoring rubric becomes outdated?",
            answer: "It already is. The Triple-Threat rubric is recomputed quarterly by our Methodology Advisory Council, which includes an experimental psychologist appointed by the University of Houston Faculty Senate during the Genesis Institution committee process. The rubric being outdated is not a bug we are trying to prevent — it is the operating reality we are trying to manage. A rubric that does not refresh is the proficiency paradox we are trying to solve. The Council's authority is structurally independent from the commercial side of the business for exactly this reason.",
            isHard: true
          },
          {
            question: "How do you avoid creating a two-tier labor market — the verified and the unverified?",
            answer: "This is the question I take most seriously, and the answer has to be honest. A two-tier market is, in some sense, what we are building — but it is the same two-tier market that has existed since credentials were invented. Our argument is that the existing two-tier system, based on lagging credentials, is already producing worse outcomes than a continuous-verification system would. The question isn't whether we have two tiers. The question is whether the tier you're in correctly reflects your current capability. We think continuous verification produces a fairer tier assignment than a four-year-old degree does.",
            isHard: true
          }
        ]
      },
      {
        number: "§ 05",
        title: "The reach-throughs",
        subtitle: "Where every conversation should land",
        intro: "Every podcast appearance has three reach-throughs — pre-agreed places the conversation should land before the runtime expires. The reach-throughs are tracked across appearances by the comms team to ensure consistent narrative coverage. Listeners who hear three different Tenured AI appearances should hear three different stories but the same three reach-throughs.",
        type: "reach-throughs",
        reachThroughs: [
          {
            title: "Reach-through 1",
            description: "The Chubb pilot is in production, not in pilot-marketing. Every appearance should arrive at the framing that the Chubb integration is live, integrated into Chubb's Cyber Central platform, and producing measurable combined-ratio improvement. This is the structural credibility anchor for everything else.",
            quote: "The Chubb pilot isn't a press release. It's a four-stream production integration with their Cyber Central underwriting platform, with backstop binder language signed by their general counsel, and combined-ratio improvement modeled across the first six months."
          },
          {
            title: "Reach-through 2",
            description: "The bond is what makes the business worth something. Listeners must come away understanding that we put real money behind every claim. The financial accountability is what makes the score a price rather than a marketing artifact.",
            quote: "The bond is not the business. The bond is the thing that makes the business worth something. Anyone can publish a score. Almost nobody can back their published claim with capital."
          },
          {
            title: "Reach-through 3",
            description: "This is institutional infrastructure, not a recruiting platform. Every appearance should land the framing that we are building underneath recruiting, underneath credentialing, underneath insurance. The category we are creating is not a product line. It is the layer under all of them.",
            quote: "We are not building a recruiting platform. We are building the underlying competence-pricing layer that the labor market builds on top of. Recruiting is a downstream surface of the system."
          }
        ]
      },
      {
        number: "§ 06",
        title: "The operational rules",
        subtitle: "What we do not say",
        intro: "Equally important to what the brief equips the spokesperson to say is what the brief instructs the spokesperson to not say. The following are operational rules of the Tenured AI press posture, applicable to every appearance regardless of audience.",
        type: "rules",
        rules: [
          {
            title: "Rule 1 · Pre-revenue projections",
            guideline: "Never cite forward revenue numbers live.",
            description: "We talk about contracted, pre-priced commercial agreements (the Chubb pilot, the named beta partners, the Genesis Institution settlement). We never publicly project forward ARR, GMV, or platform-mediated transaction volume. Forward-looking commentary is reserved for the investor and analyst call."
          },
          {
            title: "Rule 2 · Other insurers' names",
            guideline: "Never name a non-Chubb insurer publicly without clearance.",
            description: "We may say 'two other insurers have begun internal modeling against our published rate curve' — which is true and pre-cleared. We do not, under any circumstances, name specific second-tier insurers publicly. Naming a non-Chubb carrier without explicit written clearance from that carrier's communications team would violate the joint communications discipline of the entire pilot category."
          },
          {
            title: "Rule 3 · Genesis Institution candidates",
            guideline: "Do not name candidate universities still in committee.",
            description: "The University of Houston is named publicly as the first Genesis Institution. The other 11 founding-cohort candidates are in various stages of committee review. We say 'we have signed Letters of Intent with two additional research universities in the corridor and are in committee review at four more across the country.' We do not say which ones until each individual MOU is executed and the institution's communications office has cleared joint announcement language."
          },
          {
            title: "Rule 4 · Patent specifics",
            guideline: "Refer to the portfolio in aggregate, not individual filings.",
            description: "'Twenty-one filed and provisional patents covering the platform's core architecture' — fine. PAT-013, PAT-017, PAT-019 as architecture references  — fine. Detailed claim-by-claim discussion of any single filing — never live, and under NDA only."
          },
          {
            title: "Rule 5 · Cap table specifics",
            guideline: "Decline questions about founder ownership percentages.",
            description: "'Founder and employee equity retains majority voting and economic control through Series B' is the public framing. Specific founder ownership percentages, employee option pool size, and lead-investor pro-rata terms are confidential and decline-and-redirect material in live interviews."
          },
          {
            title: "Rule 6 · Personal Dameon biography",
            guideline: "Stay on the company. Bring the founder narrative back to the architecture.",
            description: "'I founded Tenured AI in Houston in 2024 after sixteen years across enterprise AI deployment and workforce-development consulting.' That is the canonical Dameon bio statement, and it is the version cleared for use across the entire library. Pre-2024 employer names are not for public attribution. Personal-life questions get redirected to the architecture within one sentence."
          }
        ]
      }
    ]
  },
  {
    id: "acquired",
    title: "Acquired",
    subtitle: "Ben Gilbert & David Rosenthal",
    tagline: "Three hours, two hosts, one company. Deep-history narrative arc.",
    documentNumber: "Document 2",
    category: "Tier A · Strategic VC",
    metadata: [
      { label: "Pod • Hosts", value: "Acquired • Ben Gilbert & David Rosenthal" },
      { label: "Audience profile", value: "Senior operators, partners at Tier 1 VC firms, public-market investors, sophisticated founders" },
      { label: "Format • Runtime", value: "~3 hours, deep-history narrative arc", isBig: true },
      { label: "Estimated reach", value: "~800K downloads in 30 days, ~3M trailing twelve-month" },
      { label: "Episode objective", value: "Establish Tenured AI as the canonical reference for the AI-era workforce-verification category" },
      { label: "Pre-cleared CTAs", value: "Manifesto essay link, Chubb pilot page, Genesis Institution program page" }
    ],
    introduction: "Ben and David's craft is the historical narrative. They will spend the first forty-five minutes on origin story, the next ninety minutes on technical architecture and strategic decisions, and the final thirty minutes on category and competitive landscape. The brief is structured to give each of those segments its own dedicated narrative engine.",
    sections: [
      {
        number: "§ 01",
        title: "Pod-specific opener · expanded version",
        subtitle: "The 140-word Acquired opener",
        intro: "The framing through Ben specifically is intentional — Ben is the more historically-minded of the two hosts and tends to anchor on the macroeconomic framing. David will follow with the financial-mechanics question, which is when the bond mechanics come out.",
        type: "redirect",
        quote: "The way I'd tell this story, Ben, is that for most of the past century, employers have hired workers using credentials as a risk-transfer instrument. A degree wasn't really proof of what you knew. It was a probabilistic filter on the variance of your future performance. That filter worked because the underlying competencies were durable across decades. Then generative AI shipped, and within eighteen months a four-year degree lost forty percent of its operational utility. The filter broke. What we built at Tenured AI is the replacement filter — except we didn't build a better credential, because better credentials were never the answer. We built a continuous-underwriting instrument that prices human capability the way a CDS prices corporate credit. We back our claims with our own capital. That's what makes our scores worth something, and that's what just got us into Chubb's production underwriting."
      },
      {
        number: "§ 02",
        title: "Prior-episode references",
        subtitle: "What Ben and David have previously published",
        intro: "Listeners will be primed by Ben and David's prior episodes on adjacent categories. Anchoring Tenured AI's narrative to these prior episodes is a high-leverage move; it puts our story in a conversation they have already had with their audience, which makes the new story load faster in the listener's mind.",
        type: "references",
        references: [
          {
            episode: "Berkshire Hathaway, Parts I & II",
            description: "Ben and David spent eight hours on the architecture of Berkshire's float — the structural advantage of holding insurance premiums between collection and claim. Our bond reserve is a different but parallel architecture. When Ben presses on the bond economics, the analogy to Berkshire's float is the right one — and they will recognize it.",
            quote: "The closest historical analog is what Buffett built with the insurance float at Berkshire."
          },
          {
            episode: "Visa",
            description: "They've covered the architecture of a network business in which the value comes from being the rails everyone else operates on. The Tenured AI thesis is the same architecture applied to human capability verification — we are not the buyer or the seller, we are the rails.",
            quote: "We are not the buyer or the seller in the talent market. We are the credit bureau, the reference rate, and the underwriting binder, all in one."
          },
          {
            episode: "Costco",
            description: "Their Costco episode highlighted the way a membership business achieves moat through institutional trust rather than feature differentiation. The Genesis Institution architecture is the analogous move in our category.",
            quote: "The Genesis Institution cohort is the institutional spine of the platform. It's what makes us trustworthy to the buyers, not what makes us featureful."
          },
          {
            episode: "Sequoia Capital",
            description: "Their Sequoia episode dealt directly with the question of how a firm sustains category authority across decades. Our intended posture in the workforce-verification category is structurally analogous.",
            quote: "We're trying to be the Sequoia of competence pricing. Not the biggest, not the loudest. The one whose endorsement is load-bearing."
          }
        ]
      },
      {
        number: "§ 03",
        title: "The deep-history segment",
        subtitle: "Forty-five minutes of origin myth",
        intro: "Ben and David will spend the first forty-five minutes of the episode on origin story. The history they want is not the company's marketing history. It is the founder's intellectual history — the formative experiences, the prior attempts, the moments of recognition. The brief equips Dameon to navigate this segment with the following pre-rehearsed arc.",
        type: "anecdotes",
        anecdotes: [
          {
            number: "Origin Beat 1",
            title: "The first failure",
            runtime: "~5 min",
            text: [
              "The first attempt at building this product was in 2021, three years before the company's formal founding. Dameon was consulting for a Fortune 500 industrial firm that wanted to deploy GPT-3 across its operations team. The firm asked him to design a competency assessment that would identify which operators were ready to work with the AI tools.",
              "He delivered a multiple-choice assessment. It was, in retrospect, the wrong product. Within six months of deployment, three of the operators who scored highest on the assessment caused material incidents in production. Three of the operators who scored lowest had been quietly handling the AI tools without incident.",
              "The assessment had been measuring the wrong thing entirely. The operators who scored well were the ones who could pass a test. The operators who handled the tools well were the ones who could recover from a hallucination at three in the morning. This was the moment the proficiency paradox became visible to him."
            ],
            punchline: "Lands the intellectual origin of the Proving Ground. Use when Ben asks about the moment he knew the standard answer was wrong."
          },
          {
            number: "Origin Beat 2",
            title: "The pilot's-license framing",
            runtime: "~3 min",
            text: [
              "The unlock came from an unexpected source: a conversation with his brother-in-law, a commercial pilot, at a family wedding in late 2022. Dameon described the competency assessment problem. His brother-in-law said something close to: 'You're measuring people the wrong way. Pilots aren't certified on whether they can fly under perfect conditions. We're certified on whether we can fly under chaos. Engine failure. Instrument failure. Weather collapse. The certification means something because it was earned under adversity.'",
              "That single sentence is the entire intellectual genesis of the Proving Ground. The adversarial-simulation architecture, the Chaos Injection Engine, the AIBS™ score under adversarial conditions — all of it traces back to that observation at a family wedding."
            ],
            punchline: "Lands the founder's intellectual humility — the idea came from somewhere else. Acquired audiences love this. Use early."
          },
          {
            number: "Origin Beat 3",
            title: "The bond insight",
            runtime: "~4 min",
            text: [
              "The bond insight came in late 2023, from reading nineteenth-century commercial law. Specifically, the surety-bond practice in U.S. railroad construction. The general contractors who built the transcontinental railroad were paid in advance against the completion of bonded segments — and the bond was issued by a surety company that took a direct financial loss if the segment was not completed to spec.",
              "The structural insight was that the surety bond converted what would otherwise have been an unenforceable claim ('we will build this on schedule') into a financial covenant ('we will pay you $X if we don't'). The conversion is what made the entire transcontinental railroad financeable — without it, the bond market would not have absorbed the construction debt.",
              "The application to credentialing was immediate: a score without a bond is the railroad contractor without surety. A score with a bond is the railroad contractor with surety. The bond is what makes the claim financeable."
            ],
            punchline: "Lands the bond architecture. David will press on the historical analog — be ready to discuss the surety-bond mechanic in detail."
          }
        ]
      },
      {
        number: "§ 04",
        title: "Acquired-specific hard questions",
        subtitle: "What Ben and David will press on",
        intro: "Beyond the universal hard-question bank, Acquired's format produces a specific category of hard question: the historical-analog stress test. Ben in particular will press for whether the company's architecture has a clean historical analog and what failure modes that analog suggests.",
        type: "qa",
        qa: [
          {
            question: "If the closest historical analog is the surety bond, why didn't a surety company build this product?",
            answer: "The right answer is honest: a surety company would not have built this product because surety companies underwrite against contracts, not against people. Their actuarial models do not have the data infrastructure to price a person's continuing performance. We built our company at the intersection of three skill sets that have not historically lived inside any one institution — workforce assessment, adversarial AI evaluation, and underwriting actuarial modeling. A surety company would have needed to acquire two of three, and the labor-market and AI components don't exist as acquirable companies at sufficient maturity.",
            isHard: true
          },
          {
            question: "What's the historical failure mode of this category? If something like this was tried before and failed, what was the failure mode?",
            answer: "The honest historical analog is the early-2000s 'skills passport' movement — a category of products that proposed continuous skills credentials anchored in employer-issued micro-certifications. The category failed because the credentialing institutions and the labor-market institutions could not align their economic incentives. The skills passports paid the credential issuers but had no economic relationship with the workers being credentialed. Our 40/40/20 architecture is specifically designed to avoid that failure mode by aligning the worker, the alma mater, the state, and the platform on a single settlement.",
            isHard: true
          },
          {
            question: "What's the Berkshire-float analog? Are you really running an insurance company in disguise?",
            answer: "It's the right question and the right analog. We are, structurally, running an insurance company. The Performance Bond is a financial guarantee. The bond reserve operates as float between premium collection and claim settlement. The bond loss reserve is audited quarterly against expected claim experience. The difference between us and a conventional surety carrier is the operating leverage of the platform share — the 40/40/20 dividend creates a perpetual revenue stream that subsidizes the small underwriting loss on each bond. The platform makes the insurance product viable; the insurance product makes the platform credible. They are inseparable.",
            isHard: true
          }
        ]
      },
      {
        number: "§ 05",
        title: "Acquired reach-throughs and CTAs",
        subtitle: "Where the three-hour conversation should land",
        intro: "Beyond the universal reach-throughs, the Acquired-specific reach-throughs are about establishing the long-tail narrative ownership of the category. The episode is a discovery asset for the next decade of operators and investors interested in this space. The CTAs are scaled accordingly: long-form essay, depth content, not short-form lead capture.",
        type: "reach-throughs",
        reachThroughs: [
          {
            title: "Durability",
            description: "Ben and David's archives are durable in a way that other podcast archives are not. The episode is intended to be the canonical reference Operators forward to one another for the next five years. Optimize the conversation for that durability."
          },
          {
            title: "CTA: The Manifesto Essay",
            description: "End-of-episode CTA should direct listeners to the long-form Sovereign Manifesto essay, not to a product landing page. The Manifesto is the long-form artifact that completes the Acquired listening experience for the most engaged segment of the audience."
          },
          {
            title: "CTA: Chubb Pilot Architecture",
            description: "Secondary CTA for the insurance-curious segment of the audience: the Chubb pilot announcement essay, which contains the four-stream data exchange architecture and the actuarial economics in publication-ready detail."
          }
        ]
      }
    ]
  },
  {
    id: "bigtech",
    title: "Big Technology",
    subtitle: "Alex Kantrowitz",
    tagline: "Workforce + future-of-work flagship. Journalist-led, hard-question forward.",
    documentNumber: "Document 3",
    category: "Tier A · Future of Work",
    metadata: [
      { label: "Pod • Host", value: "Big Technology Podcast • Alex Kantrowitz" },
      { label: "Audience profile", value: "Tech press, senior product leaders, CIOs, public-market and crossover investors, knowledge workers concerned about displacement" },
      { label: "Format • Runtime", value: "~60 min, journalist-led interview, hard-question forward", isBig: true },
      { label: "Estimated reach", value: "~250K downloads in 30 days, syndicated through Big Technology newsletter (~100K subscribers)" },
      { label: "Episode objective", value: "Convert the displacement frame into the verification frame — pivot from 'AI is replacing workers' to 'AI made credentials uninformative'" },
      { label: "Pre-cleared CTAs", value: "Manifesto essay, Genesis Institution page, Personal Reserve explainer" }
    ],
    introduction: "Alex's editorial DNA is journalism, not commentary. He will press on numbers, he will ask the skeptical-investor question, and he will not let a non-answer pass. The brief assumes a tighter, more rapid back-and-forth than the Acquired format, with the spokesperson expected to land each point in 60–90 seconds rather than 180–300.",
    sections: [
      {
        number: "§ 01",
        title: "Pod-specific opener · compressed",
        subtitle: "The 60-word Big Technology opener",
        intro: "Compressed for journalist-led format.",
        type: "redirect",
        quote: "Tenured AI is the verification infrastructure for the AI era. The problem we solve is that credentials have become uninformative — generative AI changed the knowledge half-life of corporate skills from fifteen years to under eighteen months. The replacement isn't a better credential. It's a continuous-underwriting product. Every hire on our platform carries a real bond. We back our claims with capital. Chubb just took us into production underwriting."
      },
      {
        number: "§ 02",
        title: "The frame redirect",
        subtitle: "Workforce displacement → workforce verification",
        intro: "Alex will likely open with some version of 'AI is displacing knowledge workers — what's Tenured AI doing about it?' The brief equips Dameon to redirect this frame within the first ninety seconds. The redirect is the single highest-leverage move of the entire appearance.",
        type: "reach-throughs",
        reachThroughs: [
          {
            title: "The redirect, executed in three sentences",
            description: "The first sentence acknowledges the framing without endorsing it. The second sentence introduces the actual problem. The third sentence shifts the conversation to the architecture.",
            quote: "Alex, the displacement framing is the conversation most people are having, and I understand why. But the displacement is the symptom — it isn't the disease. The disease is that we no longer have a way to tell whether someone can actually do AI-augmented knowledge work. The credential broke before the labor market did. What we're building is the replacement instrument that lets the labor market function again — not as a barrier against AI, but as a verification layer that operates with AI."
          },
          {
            title: "The redirect's purpose",
            description: "The redirect is not a deflection — Alex will detect a deflection and press harder. The redirect is an honest reframe. It accepts the listener's concern, names a deeper problem that incorporates the listener's concern, and offers an architectural answer. Listeners walk away with a more sophisticated frame than the one they brought to the conversation."
          },
          {
            title: "The reach-back",
            description: "Late in the conversation, the spokesperson should reach back to the displacement frame and acknowledge what is true about it — knowledge workers genuinely need a way to demonstrate their continued value in an AI-augmented economy. The Personal Reserve mechanic is the platform's direct answer to that need.",
            quote: "For the worker who is asking — appropriately — 'how do I demonstrate my continued value in an AI-augmented economy,' the answer the platform gives is the Personal Reserve. Verified work creates a continuing financial relationship between the worker and the platform that scales with their measurable competence. The worker is not replaced — the worker is repriced."
          }
        ]
      },
      {
        number: "§ 03",
        title: "Big Technology-specific hard questions",
        subtitle: "What Alex will press on",
        intro: "Alex's hard-question repertoire is the journalist's: he wants the number, he wants the skeptic's counter-narrative addressed, and he wants the founder to acknowledge the limit of their own claim. The brief pre-arms for the three most likely lines.",
        type: "qa",
        qa: [
          {
            question: "You're describing a system that puts more pressure on workers, not less. Why is that a good thing?",
            answer: "It's the right question and the answer is that the pressure already exists — what the system does is make it legible and pay the worker for it. Workers are already being measured continuously by every employer, every recruiter, every internal performance review. The measurement is just being conducted invisibly, with credentials that don't actually predict performance, and the workers don't get paid for it. What we do is make the measurement explicit, give the worker portable ownership of the results, and pay them a Personal Reserve when their measured performance produces commercial value. The pressure isn't new. The compensation is.",
            isHard: true
          },
          {
            question: "Your bond mechanic sounds like it externalizes the risk of bad hires onto workers. Isn't this just making the labor market more brutal?",
            answer: "No, and the structure is the opposite. The bond pays out from us to the employer, not from the worker to the employer. The worker is never financially liable for bond payouts. The platform absorbs the loss. What the bond does is make the employer indifferent to whether they hire a verified worker or an unverified one — because the verified worker comes with a financial backstop that the unverified one doesn't. That converts the verified worker's score into a price premium they can capture on the market. The bond protects the worker's wage premium, not the employer's downside.",
            isHard: true
          },
          {
            question: "What's the failure mode? What happens when this doesn't work?",
            answer: "There are two failure modes I take seriously. The first is adverse selection — if the platform attracts a disproportionately weak worker pool, the bond claim rate exceeds our actuarial assumption, the reserve is depleted, and the platform's underwriting credibility collapses. We protect against this with conservative reserve ratios (fifteen percent of aggregate face value, double what conventional surety carriers maintain) and with the Chubb backstop on Platinum tier claims. The second failure mode is methodological obsolescence — if the scoring rubric stops predicting real-world performance, the entire signal collapses. We protect against this with the Methodology Advisory Council's quarterly review and its structural independence from commercial pricing. Both failure modes are real. Both are managed. Neither is theoretical comfort — they are operational realities I think about on a daily basis.",
            isHard: true
          }
        ]
      },
      {
        number: "§ 04",
        title: "Big Technology reach-throughs and CTAs",
        subtitle: "Where the hour should land",
        intro: "Actions tailored to convert chief product officers, CIOs, and tech press.",
        type: "reach-throughs",
        reachThroughs: [
          {
            title: "Worker Perspective",
            description: "Alex's audience includes a significant population of knowledge workers concerned about their own displacement. The episode should land an argument the listener can take back to their own career situation. The Personal Reserve is the most concrete worker-facing argument; the portable Sovereign Passport is the second."
          },
          {
            title: "Newsletter Cross-Post",
            description: "Alex frequently publishes a written companion piece to top-tier episodes. The brief anticipates this and equips Dameon to suggest the Manifesto essay as a natural companion piece for Big Technology readers. Subtle CTA, but high-conversion: Big Technology newsletter subscribers are the highest-quality early-product audience in the workforce-tech category."
          },
          {
            title: "CTA: Long-form Manifesto",
            description: "Primary CTA for this audience. The Manifesto essay is structured to convert the same skeptical-curious posture that listeners arrive at the podcast with."
          }
        ]
      }
    ]
  },
  {
    id: "foi",
    title: "Future of Insurance",
    subtitle: "Bryan Falchuk",
    tagline: "The Chubb-pilot conversion engine. Technical actuarial conversation.",
    documentNumber: "Document 4",
    category: "Tier A · InsurTech & Risk",
    metadata: [
      { label: "Pod • Host", value: "Future of Insurance Podcast • Bryan Falchuk" },
      { label: "Audience profile", value: "Chief Underwriting Officers, Chief Actuaries, Chief Risk Officers, head-of-product at Tier 1–3 P&C and specialty insurers; senior reinsurance executives; insurance regulators" },
      { label: "Format • Runtime", value: "~45 min, technical-conversation format, audience expects underwriting fluency", isBig: true },
      { label: "Estimated reach", value: "~80K downloads per episode; small but highly targeted decision-making audience" },
      { label: "Episode objective", value: "Generate inbound from Chief Underwriting Officers at non-Chubb carriers — the highest-leverage commercial outcome" },
      { label: "Pre-cleared CTAs", value: "Chubb pilot announcement essay, the bond actuarial detail essay, enterprise@tenured.ai for direct pilot inquiries" }
    ],
    introduction: "This is the highest-leverage commercial appearance in the entire podcast cycle. Bryan's audience is not the general public; it is the operating roster of senior underwriting executives who will, within twelve months, either build their own Tenured AI Assurance-equivalent pilots or quietly cede the category to Chubb. The brief assumes underwriting fluency and lands hard on the actuarial substance.",
    sections: [
      {
        number: "§ 01",
        title: "Pod-specific opener · actuarial-fluent",
        subtitle: "The technical opener",
        intro: "Actuarial vocabulary, no audience-translation overhead.",
        type: "redirect",
        quote: "Tenured AI is the verification infrastructure for AI-augmented workforces, and we are operating a continuous-underwriting product line in production at Chubb. The product is structured as a tiered actuarial-backstop pilot — Silver fifteen percent, Gold twenty-five percent, Platinum thirty-five percent plus, with the Platinum tier carrying a Tenured AI bond backstop up to five million per claim and twenty million per insured per policy year. We built this category because the 2026 generative-AI exclusion created an uncovered exposure that traditional surety couldn't price. The continuous data feed gives the underwriting team an actuarial signal that updates daily rather than annually. Bryan, this audience knows why that matters."
      },
      {
        number: "§ 02",
        title: "The underwriting-substance segment",
        subtitle: "What a CUO listening on a Tuesday morning needs to hear",
        intro: "Bryan's audience is making procurement-adjacent listening decisions during their morning commute. The substance needs to be deployable into a Monday-morning meeting with their reinsurance treaty broker. The brief equips Dameon to land the four substantive arguments any senior underwriter will run against the pilot.",
        type: "arguments",
        arguments: [
          {
            title: "The combined-ratio argument",
            description: "Chubb's actuarial team projects approximately four percentage points of combined-ratio improvement across the pilot book versus the non-pilot Cyber/E&&O book, net of premium credits returned to insureds. This is the metric every CUO needs to hear. The improvement reflects three mechanisms: PAT-017 proof availability in claim adjudication, suppression of nuisance claims under documentation pressure, and reduction in adverse selection from the pre-filtered insured pool."
          },
          {
            title: "The reserve-composition argument",
            description: "The Tenured AI bond reserve is composed of three sources: accumulated unclaimed bond premiums, an explicit reserve allocation from the platform's 40/40/20 share, and the Chubb reinsurance capacity arrangement against the actuarial book. The reserve ratio target is fifteen percent of aggregate face value outstanding, which is roughly double what conventional surety carriers maintain on similar risk profiles. Conservative by design, in service of confidence-building during the first three years."
          },
          {
            title: "The data-cadence argument",
            description: "The behavior being underwritten — AI competency in production environments — changes daily, not annually. A one-time audit at policy binding tells the underwriter nothing about the firm's posture six months later. The four continuous data streams (daily AICI roster, real-time AIOI-ED webhook, continuous PAT-017 Kafka topic at 12–40M proofs/day per Platinum firm, monthly TS-005 disparity report) are the only configuration that produces actuarially defensible pricing for a risk category that moves on a sub-annual cycle."
          },
          {
            title: "The defensive-litigation argument",
            description: "PAT-017 proof retention is policy term plus seven years. The proofs are litigation-ready documentation that compresses median forensic-reconstruction litigation cost by ten to twenty million dollars over a three-year period at a representative Fortune 500 insured. The defensive-litigation savings are typically the line item that gets the CFO over the line on procurement."
          }
        ]
      },
      {
        number: "§ 03",
        title: "FOI-specific hard questions",
        subtitle: "The underwriter's cross-examination",
        intro: "Bryan's audience is sophisticated enough to ask hard underwriting questions on the spot. The brief pre-arms for the three most likely lines, which are diagnostic of whether the appearance will convert to inbound from non-Chubb carriers.",
        type: "qa",
        qa: [
          {
            question: "Your bond claim rate at seven percent seems aggressive for an unproven actuarial category. What's the loss-development pattern look like at twelve months?",
            answer: "The seven-percent figure is from the first two thousand bonds issued in the corridor pilot — about thirteen months of data, with the latest cohort still inside the bond term. The claim development is front-loaded, as expected: roughly sixty percent of claims occur in the first six months of the bond term, with the score-drift trigger producing the majority of claim events. Twelve-month loss development trails the IBNR projection by about two percentage points, which is conservative against our actuarial reserve assumption. We are tracking this monthly with Chubb's reinsurance treaty group. Happy to share the development triangle under NDA with serious underwriting inquiries.",
            isHard: true
          },
          {
            question: "How does this differ from a professional liability product? You're underwriting a person's continuing competence — why isn't this just E&O on the individual?",
            answer: "It's a fair structural question and the answer is that the Performance Bond is a different financial instrument than E&O. E&O indemnifies against a claim brought by a third party. The Performance Bond indemnifies the employer against the failure of the worker's continued performance, regardless of whether a third-party claim is brought. The trigger conditions are mechanical events on the platform — score drift, verified incident, misrepresentation, ninety-day departure — not third-party legal claims. The product sits structurally closer to a surety bond than to professional liability. The naming is deliberate.",
            isHard: true
          },
          {
            question: "If this works, every carrier in the Cyber/E&O space will want this data. How does the exclusive arrangement with Chubb hold up at scale?",
            answer: "Two answers. First, the exclusivity is contractual at the production data-stream level for the duration of the Phase 3 validation period — through approximately Q3 2027. The exclusivity covers the Cyber Central integration specifically, not the existence of the dataset. Second, the platform's strategic posture is that the long-term success of the category depends on a competitive ecosystem of underwriters, not on permanent exclusivity with one carrier. We expect to license the data feed to additional Tier 1 carriers post-Phase 3, on commercial terms that preserve Chubb's first-mover position while opening the category to broader competition. The exclusivity protects the pilot. The post-pilot architecture opens the market.",
            isHard: true
          }
        ]
      },
      {
        number: "§ 04",
        title: "FOI reach-throughs and CTAs",
        subtitle: "The inbound objective",
        intro: "Action pathways for underwriters.",
        type: "reach-throughs",
        reachThroughs: [
          {
            title: "Inbound Engagement",
            description: "Bryan, the strategic posture we have is that the category will be a healthier category if there are three or four major underwriters operating against the same data infrastructure rather than one. We are taking inbound from non-Chubb carriers actively. We are not under exclusivity beyond the production integration with Chubb. Any CUO listening to this on a Tuesday morning who wants the underwriter-level conversation should reach the enterprise pilot team directly.",
            quote: "Bryan, the strategic posture we have is that the category will be a healthier category if there are three or four major underwriters operating against the same data infrastructure rather than one. We are taking inbound from non-Chubb carriers actively. We are not under exclusivity beyond the production integration with Chubb. Any CUO listening to this on a Tuesday morning who wants the underwriter-level conversation should reach the enterprise pilot team directly."
          },
          {
            title: "CTA: Direct Line",
            description: "Primary CTA for this appearance, named explicitly in audio. Bryan's audience will not click a website link from a podcast — they will email enterprise@tenured.ai directly. Make it easy."
          },
          {
            title: "CTA: Chubb Pilot Architecture",
            description: "Secondary CTA for the technical-detail audience. The essay contains the four-stream data architecture, the tier mechanics, and the actuarial economics at the depth a CUO will want to review before the underwriter-level conversation."
          }
        ]
      }
    ]
  },
  {
    id: "twentyvc",
    title: "20VC",
    subtitle: "Harry Stebbings",
    tagline: "Rapid-fire founder philosophy + downstream founder deal flow. Clip-friendly answers.",
    documentNumber: "Document 5",
    category: "Tier A · Investor / Founder",
    metadata: [
      { label: "Pod • Host", value: "20VC Podcast • Harry Stebbings" },
      { label: "Audience profile", value: "Tier 1–3 VC partners and principals, growth-stage founders, ambitious early-stage founders, sophisticated angels" },
      { label: "Format • Runtime", value: "~75 min, rapid-fire, clip-friendly, philosophy + tactics blend", isBig: true },
      { label: "Estimated reach", value: "~600K downloads in first 30 days; high downstream social media clip-out velocity" },
      { label: "Episode objective", value: "Establish Dameon as a 'must-meet' founder for future fundraising and seed Series B-stage syndicate conversations" },
      { label: "Pre-cleared CTAs", value: "Manifesto essay, Series A release page, the Grand Opening recap essay" }
    ],
    introduction: "Harry's format is famously fast — he asks rapid-fire founder-philosophy questions in tight 60-to-90-second cycles. The brief is structured for short, quotable answers rather than for narrative deep-dives. Every answer should be clippable on its own. Harry's clip-out machine is the highest-leverage social distribution channel of any pod in this lineup.",
    sections: [
      {
        number: "§ 01",
        title: "The clippable bank",
        subtitle: "Quotes Harry's team will pull",
        intro: "Harry's production team clips approximately fifteen to twenty discrete moments from every episode for downstream distribution on X, LinkedIn, and TikTok. The brief seeds the spokesperson with twelve pre-engineered clippable answers, designed to land in 25–45 seconds each. The clippable bank is the most heavily-prepared section of any 20VC brief.",
        type: "clippables",
        clippables: [
          { title: "On the bond", quote: "The bond is not the business. The bond is the thing that makes the business worth something. Anyone can publish a score. Almost nobody is willing to back their published claim with capital." },
          { title: "On the moat", quote: "Our moat is not technological. It is operational. We have a fifteen-percent reserve ratio, a regulator-grade insurance integration, and committee processes at twelve research universities. None of that is build-from-scratch in less than three years." },
          { title: "On the proficiency paradox", quote: "The more aggressively we credential workers, the less informative each credential becomes. The world keeps changing faster than the credential can refresh. That's the proficiency paradox, and it's the only problem we are trying to solve." },
          { title: "On the Series A", quote: "This is the rare Series A where every line in the use-of-proceeds memo connects to a contract we can hold in our hands. We didn't ask our investors to underwrite a thesis. We asked them to underwrite a balance sheet of pre-priced commercial relationships." },
          { title: "On founders facing AI displacement", quote: "The right question for any founder today is not 'is AI going to replace me.' The right question is 'what does the infrastructure look like for a labor market where AI and humans are co-employed.' Build the infrastructure. Don't fight the substitution." },
          { title: "On the Houston-NYC corridor", quote: "We launched in Houston-NYC because that's where the consequences of unverified AI competence are concentrated. A bad decision in energy or finance compounds through automated systems into catastrophic downstream effects. The actuarial case is easiest where the stakes are highest." },
          { title: "On the institutional partnership", quote: "What I said to the University of Houston in a coffee shop on Calhoun Boulevard was: under our settlement architecture, you become a perpetual financial stakeholder in your alumni's lifetime success. Not at graduation. Not in the alumni magazine. Forever." },
          { title: "On building under stress", quote: "The thing nobody tells you about building infrastructure for a regulated category is that you spend the first eighteen months convincing your investors you're not building a product, you're building a moat. Then you spend the next eighteen months proving the moat is load-bearing." },
          { title: "On the team", quote: "The single hire that made the architecture work was the actuarial lead from a Tier 1 commercial reinsurer. Twenty-seven years of property-and-casualty underwriting. The day she joined, our bond reserve modeling stopped looking like a startup spreadsheet and started looking like a balance sheet." },
          { title: "On the future", quote: "Five years from now, the question 'what's your bond?' will be as routine in a hiring conversation as 'what's your salary?' has been for the past hundred years. That's not a prediction. That's the operating endgame of the architecture." },
          { title: "On the Chubb pilot", quote: "The Chubb pilot is the moment our claim about the bond became a claim Chubb's underwriting team was willing to back with their own reinsurance treaty. That conversion — from our claim to a counterparty's underwriting — is the structural credibility event of the entire company history." },
          { title: "On the founders he learned from", quote: "The founder I learned the most from was a surety executive who has been underwriting construction bonds for thirty-eight years. He told me on a long flight: 'Don't build a startup. Build a balance sheet. The startup is the marketing of the balance sheet.' I have thought about that sentence every day since." }
        ]
      },
      {
        number: "§ 02",
        title: "The Harry-specific hard questions",
        subtitle: "What rapid-fire looks like",
        intro: "Harry's hard-question format is short and demands a short answer. Long answers will get cut short by the host. The brief equips Dameon to deliver one-sentence answers to the three most likely Harry questions, each landing in under fifteen seconds.",
        type: "qa",
        qa: [
          {
            question: "Lead investor walks tomorrow. What do you do?",
            answer: "We have $45M of cash in the bank from the close and three of four syndicate members already pre-committed to a Series B pro-rata. The lead walking is bad signaling and it would be a serious event — but it would not be a survival event. We are funded through 2027 against current burn.",
            isHard: true
          },
          {
            question: "Biggest mistake of the company so far?",
            answer: "Under-investing in enterprise onboarding capacity ahead of the Grand Opening. We are now operating at 3.5× the pipeline volume we forecast — the constraint isn't demand, it's our ability to onboard well. That's a high-class problem, but it's a problem I should have seen coming.",
            isHard: true
          },
          {
            question: "What's the single biggest risk to the business?",
            answer: "Methodological obsolescence in the Triple-Threat scoring rubric. If the rubric stops predicting real-world performance, the entire signal collapses. The Methodology Council's quarterly review is the architectural defense — but the risk is real and I think about it every day.",
            isHard: true
          }
        ]
      },
      {
        number: "§ 03",
        title: "20VC reach-throughs and CTAs",
        subtitle: "The founder downstream",
        intro: "Strategic directions tailored for a venture and founder audience.",
        type: "reach-throughs",
        reachThroughs: [
          {
            title: "Fundraising Signal",
            description: "The episode is, in part, a forward-looking signal to Series B-stage syndicate members. The brief equips Dameon to mention the Series B is anticipated for late 2027 / early 2028 — without committing to terms or naming target investors. The mention is the highest-leverage forward signaling move available in this format."
          },
          {
            title: "Founder Community",
            description: "Harry's audience includes the next cohort of founders who will eventually become Tenured AI customers and partners. The episode should land a generous founder-to-founder posture — Dameon is available to brief other founders in regulated-category build-outs on the lessons of the bond architecture."
          },
          {
            title: "CTA: The Manifesto Essay",
            description: "Primary CTA for this audience. Founders who clip the conversation will need the long-form artifact to share with their own teams."
          }
        ]
      }
    ]
  },
  {
    id: "appendix",
    title: "Appendix",
    subtitle: "5 Additional Targets",
    tagline: "Five additional podcast targets briefed at one-row depth.",
    documentNumber: "Appendix",
    category: "Target Roster",
    metadata: [],
    introduction: "Each appendix entry should be expanded into a full brief at least 14 days before the recording date. The one-row entries are not stand-ins for full briefs — they are starting points. The comms team's standing rule is that no Tier A appearance is recorded without a full six-section brief reviewed against the master template structure.",
    sections: [
      {
        title: "Remaining Target Roster",
        type: "appendix",
        appendixItems: [
          {
            name: "Invest Like the Best",
            host: "Patrick O'Shaughnessy",
            tier: "Tier A",
            strategy: "Strategic VC / asset-management audience adjacent to Acquired's. Patrick's editorial DNA is the long-form investor interview. Brief should center on the Performance Bond as a financial instrument and on the actuarial architecture as a competitive moat. The opener should emphasize Tenured AI as an 'infrastructure-layer investment in a category that did not previously exist' — Patrick's repeated framing."
          },
          {
            name: "All-In",
            host: "Chamath, Sacks, Calacanis, Friedberg",
            tier: "Tier B",
            strategy: "Highest-reach mixed-investor panel; tonally aggressive. Panel-format pods do not run conventional briefs — the spokesperson is one of four voices in a moderated debate. Brief should prepare Dameon to defend the bond architecture against the most likely Chamath-style attack (regulatory naivety) and the most likely Sacks-style attack (founder-narrative skepticism). The Friedberg axis is friendly territory and should be used to anchor the architecture conversation."
          },
          {
            name: "InsurTech NY",
            host: "David Gritz & Tony Lew",
            tier: "Tier A",
            strategy: "Insurance-industry trade audience; Future of Insurance lookalike. Higher technical fluency than Bryan's audience; lower direct-CUO concentration. Brief should treat as a more compressed version of the Future of Insurance brief, with the Phase 3 actuarial-validation timeline as the load-bearing forward signal. CTA is direct to enterprise@tenured.ai for underwriter inquiries; same as Future of Insurance."
          },
          {
            name: "Hard Fork",
            host: "Kevin Roose & Casey Newton",
            tier: "Tier A",
            strategy: "Mainstream tech-press flagship; New York Times audience reach. Kevin and Casey will press on the worker-displacement framing harder than Alex Kantrowitz will, with less actuarial fluency to redirect through. Brief should compress the Big Technology frame-redirect to under sixty seconds and lead with the Personal Reserve mechanic as the worker-facing argument. Avoid technical depth on bond mechanics in this format — the audience will not retain it."
          },
          {
            name: "Pivot",
            host: "Kara Swisher & Scott Galloway",
            tier: "Tier B",
            strategy: "Op-ed-format pod with very high cultural reach; political-economic frame heavy. Kara will press hard on whether the platform is reinforcing existing labor-market inequality. The brief's two-tier-labor-market answer is the load-bearing response. Scott will probe the Series A valuation versus operating revenue — the canonical answer is 'priced against signed commercial agreements, not against forward forecast.' Brief should treat as the highest-risk-of-misframe appearance in the lineup; pre-coaching session recommended before booking."
          }
        ]
      }
    ]
  }
];
