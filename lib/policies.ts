/**
 * Store policies — DRAFTS written for Time Vault. Check every timeframe, fee and
 * condition against how the business actually runs, fill in the legal details
 * (company name, registered address, governing law) and have them reviewed by a
 * lawyer before launch. The policy pages read everything from this file.
 */
import { site } from "./site";

export type PolicyBlock = string | { list: string[] };
export type PolicySection = { id: string; title: string; body: PolicyBlock[] };
export type PolicyIcon = "return" | "swap" | "truck" | "clock" | "shield" | "lock" | "user" | "tool" | "doc";
export type Policy = {
  slug: string;
  tab: string;
  title: string;
  intro: string;
  updated: string; // ISO date
  points: { icon: PolicyIcon; title: string; text: string }[];
  sections: PolicySection[];
};

const EMAIL = site.email;
const NAME = site.displayName;

export const POLICIES: Policy[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "privacy",
    tab: "Privacy",
    title: "Privacy Policy",
    intro: `How ${NAME} collects, uses and protects your personal information when you browse our site, join our list or order a watch.`,
    updated: "2026-11-17",
    points: [
      { icon: "lock", title: "Only what we need", text: "We collect the details needed to answer you and deliver your order, and nothing more." },
      { icon: "user", title: "Never sold", text: "We don't sell or rent your personal information to anyone, ever." },
      { icon: "doc", title: "Your data, your call", text: `Ask to see, correct or delete your data at any time by emailing ${EMAIL}.` },
    ],
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: [
          `${NAME} ("we", "us") sells wristwatches online. We are responsible for the personal information described in this policy.`,
          `Questions about privacy can be sent to ${EMAIL}. [Add your company's legal name and registered address here.]`,
        ],
      },
      {
        id: "what-we-collect",
        title: "What we collect",
        body: [
          "We only collect information you give us or that your browser sends automatically:",
          {
            list: [
              "Contact details — your name, email address, phone number and delivery address when you request an order or contact us.",
              "Newsletter sign-ups — the email address you enter in the welcome offer or footer form.",
              "Order details — the watches you request, prices, and our correspondence with you.",
              "Technical data — your IP address, browser type and the pages requested, recorded in our hosting provider's server logs.",
            ],
          },
          "We do not collect payment card details on this website.",
        ],
      },
      {
        id: "how-we-use-it",
        title: "How we use it",
        body: [
          "We use your information to:",
          {
            list: [
              "Reply to your questions and confirm, ship and support your order",
              "Provide warranty service and process returns",
              "Send our newsletter, if you asked for it — every email has an unsubscribe link",
              "Keep the site secure and working, and prevent fraud",
              "Meet our legal and accounting obligations",
            ],
          },
        ],
      },
      {
        id: "storage-cookies",
        title: "Cookies and local storage",
        body: [
          "We don't use advertising or analytics cookies. To make the site work, your browser stores a few small items on your own device (local storage):",
          { list: ["Your shopping bag and wishlist", "Whether you have already seen or closed the welcome offer"] },
          "This information never leaves your device and isn't sent to us. You can clear it at any time in your browser settings.",
        ],
      },
      {
        id: "sharing",
        title: "Who we share it with",
        body: [
          "We share personal information only with service providers who help us run the business, and only what they need:",
          { list: ["Couriers, to deliver your order", "Our website host, to serve the site", "Our email provider, to send order emails and the newsletter", "Payment providers, when you pay for an order"] },
          "We may also disclose information when the law requires it. We never sell your data.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep it",
        body: [
          "We keep order records for as long as tax and accounting law requires, and warranty records for the length of your warranty. Newsletter details are kept until you unsubscribe. Everything else is deleted when we no longer need it.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: [
          "Depending on where you live, you may have the right to:",
          { list: ["Access the personal information we hold about you", "Correct anything that is wrong", "Ask us to delete it", "Object to or restrict how we use it", "Withdraw consent to marketing at any time"] },
          `To make a request, email ${EMAIL}. We will reply within 30 days. You can also complain to your local data protection authority.`,
        ],
      },
      {
        id: "security",
        title: "Security",
        body: ["The site is served over an encrypted (HTTPS) connection and access to customer information is limited to the people who need it. No system is perfectly secure, so please contact us straight away if you think your information has been misused."],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: ["We may update this policy from time to time. The date at the top of the page shows when it last changed."],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "terms",
    tab: "Terms",
    title: "Terms & Conditions",
    intro: `The terms that apply when you use the ${NAME} website and order a watch from us. Please read them before placing an order.`,
    updated: "2026-11-17",
    points: [
      { icon: "doc", title: "Order by request", text: "Send an order request; it becomes a contract once we confirm it by email." },
      { icon: "shield", title: "5-year warranty", text: "Every watch is covered for five years against manufacturing defects." },
      { icon: "return", title: "30-day returns", text: "Changed your mind? Return an unworn watch within 30 days." },
    ],
    sections: [
      {
        id: "about",
        title: "About these terms",
        body: [
          `These terms apply to your use of this website and to every order you place with ${NAME}. By placing an order you agree to them. [Add your company's legal name, registration number and registered address here.]`,
          "Nothing in these terms affects your statutory rights as a consumer.",
        ],
      },
      {
        id: "orders",
        title: "Placing an order",
        body: [
          "Add watches to your bag and choose “Request to Order”. This sends us an order request — it is not yet a contract.",
          "We will reply by email within one business day to confirm availability, the final price, delivery and how to pay. The contract between us starts when you accept that confirmation and pay.",
          "We may decline an order, for example if a watch is out of stock or a price was shown in error. If we do, you won't be charged.",
        ],
      },
      {
        id: "prices",
        title: "Prices and payment",
        body: [
          "Prices are shown in US dollars. Sale prices are valid while stated or while stock lasts.",
          "Any import duties or local taxes for your country are shown in your order confirmation before you pay.",
          "Discount codes, such as the welcome offer, apply to one order, can't be combined with other offers unless we say so, and have no cash value.",
        ],
      },
      {
        id: "delivery",
        title: "Delivery",
        body: [
          "Delivery times and costs are explained in our Shipping policy. Risk in the watch passes to you on delivery; ownership passes once we have received full payment.",
        ],
      },
      {
        id: "returns-warranty",
        title: "Returns and warranty",
        body: ["You can return an unworn watch within 30 days of delivery, as set out in our Returns policy. Every watch also carries our 5-year warranty, described in our Warranty policy."],
      },
      {
        id: "products",
        title: "Product information",
        body: [
          "We describe and photograph every watch as accurately as we can. Colours can look slightly different on different screens, and small variations in hand-finished materials are normal.",
          "Water resistance ratings refer to the condition of the watch when new, with the crown pushed in or screwed down.",
        ],
      },
      {
        id: "site-use",
        title: "Using this website",
        body: [
          "All text, photographs, logos and design on this site belong to us or our licensors. You may view and share pages for personal use, but not copy or republish them commercially without permission.",
          "We work to keep the site available and accurate but can't promise it will always be uninterrupted or error-free.",
        ],
      },
      {
        id: "liability",
        title: "Our liability",
        body: ["We are responsible for loss or damage you suffer that is a foreseeable result of us breaking these terms. We are not responsible for losses that were not foreseeable, or for business losses. Nothing in these terms limits liability that cannot be limited by law."],
      },
      {
        id: "law",
        title: "Governing law",
        body: ["These terms are governed by the laws of [your country or state]. If a dispute arises, please contact us first — most problems can be solved quickly by email."],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "returns",
    tab: "Returns",
    title: "Returns & Refunds",
    intro: "Every watch should feel right on your wrist. If it doesn't, here is how returns, exchanges and refunds work.",
    updated: "2026-11-17",
    points: [
      { icon: "return", title: "30-day returns", text: "Return an unworn watch within 30 days of delivery for a full refund." },
      { icon: "truck", title: "Free return shipping", text: "We send you a prepaid, insured label — returns cost you nothing." },
      { icon: "swap", title: "Easy exchanges", text: "Prefer a different model or strap? We'll exchange it instead." },
    ],
    sections: [
      {
        id: "how-to-return",
        title: "How to start a return",
        body: [
          `Email ${EMAIL} with your order number and the watch you'd like to return. We'll send a prepaid, insured shipping label and packing instructions within one business day.`,
          "Pack the watch in its original box with the warranty card, manual and any extra links or straps, then drop it off with the courier.",
        ],
      },
      {
        id: "conditions",
        title: "Return conditions",
        body: [
          "To be accepted for a refund or exchange, a watch must be:",
          { list: ["Returned within 30 days of delivery", "Unworn, with no scratches, marks or signs of use", "With protective films and tags still attached", "In its original box with all accessories and paperwork", "Not resized — bracelets shortened at your request can't be returned"] },
        ],
      },
      {
        id: "refunds",
        title: "Refunds",
        body: [
          "We inspect every returned watch within 3 business days of receiving it, then refund the full price to your original payment method. Depending on your bank, the money can take a further 5–10 business days to appear.",
          "If a return doesn't meet the conditions above, we'll contact you and send the watch back to you.",
        ],
      },
      {
        id: "exchanges",
        title: "Exchanges",
        body: ["Want a different model, dial or strap? Tell us when you start your return and we'll reserve the replacement. If it costs more, we'll invoice the difference; if it costs less, we'll refund it."],
      },
      {
        id: "faulty",
        title: "Damaged or faulty watches",
        body: [
          `If your watch arrives damaged or develops a fault, email ${EMAIL} within 7 days of delivery with photos. We'll arrange a free collection and a repair, replacement or full refund — your choice.`,
          "After that, faults are covered by our 5-year warranty.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "shipping",
    tab: "Shipping",
    title: "Shipping & Delivery",
    intro: "How we pack, insure and deliver your watch, how long it takes and what it costs.",
    updated: "2026-11-17",
    points: [
      { icon: "truck", title: "Free over $500", text: "Free insured shipping on every order over $500." },
      { icon: "clock", title: "Ships in 1 day", text: "Orders leave our studio within one business day of payment." },
      { icon: "shield", title: "Fully insured", text: "Every parcel is insured for its full value until it reaches you." },
    ],
    sections: [
      {
        id: "times-costs",
        title: "Delivery times and costs",
        body: [
          "Orders are dispatched within one business day once payment has cleared.",
          { list: ["Standard: 3–5 business days — free on orders over $500, otherwise $15", "Express: 1–2 business days — $35", "International: 5–10 business days — cost confirmed in your order email"] },
          "Delivery times are estimates and can be longer during holidays or customs checks.",
        ],
      },
      {
        id: "insurance",
        title: "Insurance and signature",
        body: ["Every parcel is insured for its full value and needs a signature on delivery, so it is never left on a doorstep. If you won't be home, you can ask the courier to redirect it to a pickup point."],
      },
      {
        id: "tracking",
        title: "Tracking your order",
        body: ["You'll receive a tracking link by email as soon as your watch is dispatched. If anything looks wrong, reply to that email and we'll chase it with the courier for you."],
      },
      {
        id: "customs",
        title: "Customs, duties and taxes",
        body: ["For international orders, any import duties or local taxes are confirmed in your order email before you pay, so there are no surprises on delivery."],
      },
      {
        id: "lost-damaged",
        title: "Lost or damaged parcels",
        body: [`If your parcel is lost, or arrives damaged, email ${EMAIL} within 7 days. Because every parcel is insured, we'll send a replacement or refund you in full once the courier confirms the loss.`],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "warranty",
    tab: "Warranty",
    title: "Warranty & Service",
    intro: `Every ${NAME} watch is built to last decades. Our 5-year international warranty covers it while you find out.`,
    updated: "2026-11-17",
    points: [
      { icon: "shield", title: "5 years, worldwide", text: "Covers the movement and any manufacturing defect, in any country." },
      { icon: "tool", title: "Free repairs", text: "Covered repairs, parts and return shipping are free of charge." },
      { icon: "clock", title: "Service for life", text: "After the warranty, we keep servicing your watch at fair, fixed prices." },
    ],
    sections: [
      {
        id: "coverage",
        title: "What's covered",
        body: [
          "For five years from the date of delivery, we cover:",
          { list: ["The movement — including timekeeping outside the stated accuracy", "Defects in materials or workmanship of the case, dial, hands and crown", "Bracelet clasps and folding buckles", "Water resistance, provided the watch hasn't been opened by anyone else"] },
        ],
      },
      {
        id: "not-covered",
        title: "What's not covered",
        body: [
          "The warranty doesn't cover normal wear or accidents, such as:",
          { list: ["Scratches and scuffs on the case, crystal or bracelet", "Straps, which wear with use (replacements are available)", "Damage from knocks, drops or strong magnetic fields", "Water damage when the crown wasn't pushed in or screwed down", "Watches opened, repaired or modified by anyone other than us or an authorised watchmaker"] },
        ],
      },
      {
        id: "how-to-claim",
        title: "How to make a claim",
        body: [
          `Email ${EMAIL} with your order number, a short description of the problem and, if you can, a photo or video. We'll reply within one business day with an insured shipping label.`,
          "We aim to return repaired watches within 3–4 weeks. If a watch can't be repaired, we'll replace it with the same or an equivalent model.",
        ],
      },
      {
        id: "servicing",
        title: "Servicing your watch",
        body: [
          "Like a car, a mechanical watch needs a service every 4–6 years: the movement is cleaned, oiled and regulated, and the seals are replaced to keep it water resistant.",
          "Services within the warranty period are free if they are needed to fix a covered fault. After that, we offer servicing at fixed prices — ask us for a quote.",
        ],
      },
      {
        id: "transfer",
        title: "Gifts and second owners",
        body: ["The warranty belongs to the watch, not the buyer, so it transfers to anyone you give or sell the watch to. They just need the original order number."],
      },
    ],
  },
];

export const getPolicy = (slug: string) => POLICIES.find((p) => p.slug === slug);
