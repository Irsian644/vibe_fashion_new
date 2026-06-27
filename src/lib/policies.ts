import { site } from "./site";

export type Policy = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const policies: Record<string, Policy> = {
  shipping: {
    slug: "shipping",
    title: "Shipping & Delivery",
    intro:
      "Everything you need to know about how and when your Vibe Fashion order arrives.",
    sections: [
      {
        heading: "Delivery times",
        body: [
          `We ship within ${site.shipping.domestic} and regionally (${site.shipping.region}).`,
          "Delivery times and tracking are confirmed in our Instagram DMs once your order is placed.",
        ],
      },
      {
        heading: "Shipping costs",
        body: [
          "Shipping cost is confirmed when you order — just message us and we'll let you know.",
        ],
      },
      {
        heading: "Payment",
        body: [
          "Payment options and details are shared when we confirm your order in our DMs.",
        ],
      },
      {
        heading: "Packaging",
        body: [
          "Every order is wrapped with care so it arrives looking as good as it did in the photos.",
        ],
      },
    ],
  },
  returns: {
    slug: "returns",
    title: "Returns & Exchanges",
    intro: "Changed your mind? No stress — here's how returns work.",
    sections: [
      {
        heading: "Returns",
        body: [
          "You can return unworn items with their original tags attached. The return window is confirmed when you order.",
          "To start a return, just message us on Instagram with your order details.",
        ],
      },
      {
        heading: "Condition",
        body: [
          "Items must be unworn, unwashed and in their original condition with tags.",
          "For hygiene reasons, earrings and other pierced accessories cannot be returned.",
        ],
      },
      {
        heading: "Exchanges",
        body: [
          "Want a different size or colour? Message us and we'll arrange an exchange where stock allows.",
          "Because many pieces are one-of-one, an exchange may not always be possible — but we'll always find a solution.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Once we receive and check your return, we'll process your refund or store credit promptly.",
          "Original shipping costs are non-refundable.",
        ],
      },
    ],
  },
};

export const policySlugs = Object.keys(policies);
