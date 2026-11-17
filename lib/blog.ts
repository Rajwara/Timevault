/**
 * Blog posts ("The Journal"). Starter articles written for Time Vault — edit,
 * replace or add freely. Images are paths under /public.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; image: string; caption: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  image: string;
  featured?: boolean;
  body: Block[];
};

export const AUTHOR = {
  name: "Time Vault Team",
  bio: "Notes from our watchmakers and stylists on choosing, wearing and caring for a mechanical watch.",
};

export const CATEGORIES = ["Buying Guides", "Watch Care", "Inside the Watch", "Style"];

export const POSTS: Post[] = [
  {
    slug: "how-to-choose-your-first-automatic-watch",
    title: "How to Choose Your First Automatic Watch",
    excerpt: "Size, movement, water resistance and strap: the four decisions that matter most when buying your first mechanical watch.",
    category: "Buying Guides",
    date: "2026-11-10",
    image: "/assets/story-2a.webp",
    featured: true,
    body: [
      { type: "p", text: "An automatic watch is powered by your own movement. A weighted rotor inside the case spins as you move your wrist, winding the mainspring that drives the watch — no battery required." },
      { type: "p", text: "That small piece of engineering is why automatics are so loved, and why choosing your first one deserves a little thought. Here's what our team looks at first." },
      { type: "h2", text: "Start with the size" },
      { type: "p", text: "Case diameter is the number most people look at, but lug-to-lug length — the distance from the top of the case to the bottom — decides whether a watch actually fits. As a guide, the lugs shouldn't overhang the edges of your wrist." },
      { type: "list", items: ["Wrists under 16cm: look at 36–39mm cases", "Wrists of 16–18cm: 39–42mm suits most styles", "Wrists over 18cm: 42–44mm sits in proportion"] },
      { type: "quote", text: "“The right watch disappears on your wrist until you want to look at it.”" },
      { type: "h2", text: "Think about how you'll wear it" },
      { type: "p", text: "If it will be your only watch, choose something versatile: a steel case, a clean dial and at least 100m of water resistance will take you from the office to the beach. Our Field Automatic and Vault Naut were designed with exactly that in mind." },
      { type: "p", text: "If you already have an everyday watch, this is the moment for something with more character — a chronograph, a dress watch or a bold dial colour." },
      { type: "figure", image: "/assets/story-1.webp", caption: "A clean dial and a neutral strap work with almost anything." },
      { type: "h2", text: "Check the power reserve" },
      { type: "p", text: "The power reserve tells you how long a fully wound watch keeps running when you take it off. Around 40 hours covers a night on the bedside table; 70 hours or more means you can leave it for a whole weekend and pick it up still running." },
      { type: "h2", text: "Pick a strap you'll actually wear" },
      { type: "p", text: "A metal bracelet is the most durable, leather is the most classic, and rubber or nylon are the most comfortable in the heat. Every Time Vault watch uses quick-release pins, so you can change straps in seconds — and change your mind later." },
    ],
  },
  {
    slug: "how-to-find-your-strap-size",
    title: "How to Find Your Strap Size",
    excerpt: "Lug width, wrist size and fit: a two-minute guide to choosing a strap or bracelet that's comfortable all day.",
    category: "Buying Guides",
    date: "2026-10-30",
    image: "/assets/story-1.webp",
    body: [
      { type: "p", text: "A great watch on the wrong strap never feels right. The good news: getting the size right takes two measurements and two minutes." },
      { type: "h2", text: "1. Know your lug width" },
      { type: "p", text: "Lug width is the gap between the two lugs where the strap attaches. It's listed on every Time Vault product page, and it's usually 18, 20 or 22mm. A strap must match it exactly." },
      { type: "h2", text: "2. Measure your wrist" },
      { type: "list", items: ["Wrap a strip of paper or a soft tape measure around your wrist, just above the wrist bone", "Mark where it overlaps and measure the length in centimetres", "Add 1–1.5cm for a comfortable fit — more if you prefer a looser feel"] },
      { type: "h2", text: "3. Choose the fit" },
      { type: "p", text: "A watch should sit snug enough not to slide over your wrist bone, but loose enough to slip a finger underneath. Wrists swell slightly in heat and during the day, so if you're between holes, choose the looser one." },
      { type: "quote", text: "“If you're between two holes, go looser — your wrist changes size more than you think.”" },
      { type: "h2", text: "Sizing a bracelet" },
      { type: "p", text: "Metal bracelets are sized by removing links. Tell us your wrist measurement when you request your order and we'll size the bracelet for you before it ships, keeping the spare links in the box." },
    ],
  },
  {
    slug: "caring-for-your-mechanical-watch",
    title: "Caring for Your Mechanical Watch",
    excerpt: "Simple habits that keep a mechanical watch accurate and looking new for decades — plus when it really needs a service.",
    category: "Watch Care",
    date: "2026-10-18",
    image: "/assets/video-thumb.webp",
    body: [
      { type: "p", text: "A mechanical watch is built to outlive its owner. A few simple habits make sure it does." },
      { type: "h2", text: "Everyday habits" },
      { type: "list", items: ["Wind a manual or idle automatic watch at the same time each day, gently, until you feel resistance", "Never set the date between 9pm and 3am, when the date mechanism is engaged", "Keep it away from strong magnets — phone cases, speakers and laptop lids can magnetise a movement and make it run fast", "Wipe the case and bracelet with a soft cloth; rinse with fresh water after the sea or the pool"] },
      { type: "h2", text: "Water and the crown" },
      { type: "p", text: "Always check the crown is pushed in, or screwed down, before your watch gets wet. Never operate the crown or chronograph pushers underwater." },
      { type: "quote", text: "“Most water damage happens on dry land — with the crown left pulled out.”" },
      { type: "h2", text: "When to service" },
      { type: "p", text: "Every 4–6 years, a mechanical movement needs a full service: it's taken apart, cleaned, re-oiled, regulated, and the gaskets are replaced to keep it water resistant. Service it sooner if it starts gaining or losing more than a few seconds a day, or if you notice moisture under the crystal." },
      { type: "p", text: "Covered faults are repaired free under our 5-year warranty, and we keep servicing Time Vault watches at fixed prices for life." },
    ],
  },
  {
    slug: "water-resistance-explained",
    title: "Water Resistance, Explained",
    excerpt: "What 30m, 100m and 300m really mean — and why a “30m” watch shouldn't go swimming.",
    category: "Watch Care",
    date: "2026-09-29",
    image: "/assets/arrival-6.webp",
    body: [
      { type: "p", text: "The depth printed on a dial is one of the most misunderstood numbers in watchmaking. It describes the pressure a watch withstood in a laboratory test — not how deep you can safely take it." },
      { type: "h2", text: "What the ratings mean" },
      { type: "list", items: ["30m (3 bar): splashes and rain only — keep it out of the shower and pool", "50m (5 bar): brief swimming in calm water", "100m (10 bar): swimming and snorkelling", "200m and over: diving; true dive watches are tested to the ISO 6425 standard"] },
      { type: "h2", text: "Why the difference?" },
      { type: "p", text: "Movement in water — a dive, a stroke, a jet from the shower — creates pressure spikes well above the still-water test. Hot water and soap also soften the rubber gaskets that keep water out." },
      { type: "quote", text: "“Treat the rating as a measure of toughness, not a depth limit.”" },
      { type: "h2", text: "Keeping it water resistant" },
      { type: "p", text: "Gaskets age. Have the water resistance tested once a year if you swim with your watch, and every time the case is opened. Our Deep Diver 300 and Naut models are tested before they leave the studio." },
    ],
  },
  {
    slug: "how-a-chronograph-works",
    title: "How a Chronograph Works",
    excerpt: "Start, stop, reset: what the pushers and sub-dials on a chronograph actually do, and how to read a tachymeter.",
    category: "Inside the Watch",
    date: "2026-09-12",
    image: "/assets/arrival-2.webp",
    body: [
      { type: "p", text: "A chronograph is a watch with a built-in stopwatch. It's one of the most useful complications — and one of the most satisfying to use." },
      { type: "h2", text: "The pushers" },
      { type: "list", items: ["The top pusher (2 o'clock) starts and stops the timer", "The bottom pusher (4 o'clock) resets it to zero — only press it when the timer is stopped"] },
      { type: "h2", text: "The sub-dials" },
      { type: "p", text: "The large central seconds hand only moves when the chronograph is running. The small sub-dials count the elapsed minutes and hours, while a third usually shows the running seconds of the time itself." },
      { type: "figure", image: "/assets/arrival-3.webp", caption: "The Racer Tachymeter: chronograph seconds in red, minutes and hours on the sub-dials." },
      { type: "h2", text: "Reading a tachymeter" },
      { type: "p", text: "The scale around the bezel turns elapsed time into speed. Start the chronograph as you pass one kilometre marker and stop it at the next: the number the seconds hand points to on the tachymeter is your speed in km/h. 30 seconds for a kilometre? That's 120 km/h." },
      { type: "quote", text: "“A tachymeter turns a stopwatch into a speedometer.”" },
    ],
  },
  {
    slug: "dress-watch-or-sport-watch",
    title: "Dress Watch or Sport Watch?",
    excerpt: "When to wear which, how to mix them, and the one watch that can do both.",
    category: "Style",
    date: "2026-08-24",
    image: "/assets/story-2b.webp",
    body: [
      { type: "p", text: "The old rule said a dress watch for evenings and a sport watch for everything else. Today the lines are blurred — but the differences still matter." },
      { type: "h2", text: "The dress watch" },
      { type: "p", text: "Thin, simple and usually on leather: a dress watch slides under a shirt cuff and lets the outfit lead. Look for a slim case, a clean dial with few markings and a polished finish. Our Heritage Dress and Aurum Sunburst sit firmly here." },
      { type: "h2", text: "The sport watch" },
      { type: "p", text: "Bigger, tougher and built for use: rotating bezels, chronographs, luminous hands and serious water resistance. Pair it with knitwear, denim and tailoring that's a little more relaxed." },
      { type: "quote", text: "“Match the watch to the shirt cuff: if it won't slide under, it's a sport watch.”" },
      { type: "h2", text: "The one that does both" },
      { type: "list", items: ["A steel case of 38–41mm", "A slim profile under 12mm", "An integrated bracelet or quick-change straps", "At least 100m water resistance"] },
      { type: "p", text: "That's the brief behind the Vault Naut: sharp enough for a suit, tough enough for the weekend." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const sortedPosts = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Roughly 220 words per minute, at least 2 minutes. */
export const readTime = (p: Post) => {
  const words = p.body.reduce((n, b) => n + ("text" in b ? b.text : "items" in b ? b.items.join(" ") : b.caption).split(/\s+/).length, p.excerpt.split(/\s+/).length);
  return Math.max(2, Math.round(words / 220));
};
