/**
 * Questions for the /faq page, grouped by topic. Answers follow the policy pages
 * (lib/policies.ts) — keep them in sync. `image` is shown, tilted, beside the
 * list while a question is hovered or open.
 */
import { site } from "./site";

export type Faq = { q: string; a: string; image: string; link?: { label: string; href: string } };
export type FaqTopic = { id: string; title: string; items: Faq[] };

export const FAQ: FaqTopic[] = [
  {
    id: "orders",
    title: "Orders & payment",
    items: [
      {
        q: "How do I order a watch?",
        a: `Add the watches you like to your bag and choose "Request to Order". We'll email you within one business day to confirm availability, delivery and payment. Your order is placed once you accept and pay.`,
        image: "/assets/product-2.webp",
        link: { label: "Terms & conditions", href: "/policies/terms" },
      },
      {
        q: "Which payment methods do you accept?",
        a: "Visa, Mastercard, American Express, PayPal and Apple Pay. Your order confirmation email includes a secure payment link.",
        image: "/assets/product-1.webp",
      },
      {
        q: "Can I use a discount code?",
        a: "Yes — mention the code (for example your welcome offer) when you request your order and we'll apply it to your confirmation. One code per order.",
        image: "/assets/product-4.webp",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Orders ship within one business day of payment. Standard delivery takes 3–5 business days, express 1–2 days, and international 5–10 days.",
        image: "/assets/video-thumb.webp",
        link: { label: "Shipping policy", href: "/policies/shipping" },
      },
      {
        q: "Is shipping free?",
        a: "Standard shipping is free and fully insured on every order over $500. Below that it's $15; express delivery is $35.",
        image: "/assets/arrival-1.webp",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. Any import duties or local taxes are confirmed in your order email before you pay, so there are no surprises at the door.",
        image: "/assets/arrival-4.webp",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & warranty",
    items: [
      {
        q: "Can I return my watch?",
        a: "Yes — return an unworn watch within 30 days of delivery for a full refund. We send you a free, insured return label.",
        image: "/assets/story-2b.webp",
        link: { label: "Returns & refunds", href: "/policies/returns" },
      },
      {
        q: "What does the 5-year warranty cover?",
        a: "The movement and any defect in materials or workmanship, worldwide, for five years. Normal wear, straps and accidental damage aren't covered.",
        image: "/assets/arrival-3.webp",
        link: { label: "Warranty & service", href: "/policies/warranty" },
      },
      {
        q: "My watch is running fast or slow. What should I do?",
        a: "Keep it away from magnets (phone cases, speakers) for a day and check again. If it's still more than a few seconds a day out, email us — it's covered by your warranty.",
        image: "/assets/arrival-5.webp",
      },
    ],
  },
  {
    id: "watches",
    title: "Watches & care",
    items: [
      {
        q: "How do I find the right strap size?",
        a: "Measure your wrist just above the wrist bone and add 1–1.5cm. Tell us your measurement when you order and we'll size metal bracelets before shipping.",
        image: "/assets/story-1.webp",
        link: { label: "Strap sizing guide", href: "/blog/how-to-find-your-strap-size" },
      },
      {
        q: "Can I swim with my watch?",
        a: "Watches rated 100m or more are fine for swimming with the crown pushed in or screwed down. Watches rated 30–50m should be kept to splashes and rain.",
        image: "/assets/hero-watch.webp",
        link: { label: "Water resistance explained", href: "/blog/water-resistance-explained" },
      },
      {
        q: "How often does a mechanical watch need servicing?",
        a: "Every 4–6 years. We'll clean, re-oil and regulate the movement and replace the seals; ask us for a fixed-price quote.",
        image: "/assets/feature-watch.webp",
      },
    ],
  },
  {
    id: "account",
    title: "Account & privacy",
    items: [
      {
        q: "Where are my bag and wishlist saved?",
        a: "In your browser, on your own device. They stay there between visits, but won't appear on another phone or computer.",
        image: "/assets/arrival-6.webp",
        link: { label: "Privacy policy", href: "/policies/privacy" },
      },
      {
        q: "How do I unsubscribe from emails?",
        a: `Use the unsubscribe link at the bottom of any newsletter, or email ${site.email} and we'll remove you.`,
        image: "/assets/arrival-2.webp",
      },
    ],
  },
];
