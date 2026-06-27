/**
 * UI message dictionaries. `en` is the source of truth for keys; `sq` (Albanian,
 * Kosovo standard) must mirror its shape. Add a key to both when adding copy.
 *
 * Product/category/policy *content* lives with the data (products.ts, policies.ts)
 * as `*_sq` fields — this file is for UI chrome and page copy only.
 */

export type Locale = "en" | "sq";
export const LOCALES: Locale[] = ["en", "sq"];
export const DEFAULT_LOCALE: Locale = "en";

export const messages = {
  en: {
    // ── Global chrome ──────────────────────────────────────────
    "nav.shop": "Shop",
    "nav.bags": "Bags",
    "nav.dresses": "Dresses",
    "nav.jackets": "Jackets",
    "nav.accessories": "Accessories",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.search": "Search products",
    "nav.saved": "Saved items",
    "nav.home": "Home",
    "nav.announce": "Hand-picked in Prishtinë · Order via Instagram DM",
    "nav.categories": "Categories",
    "nav.shopByBrand": "Shop by brand",
    "nav.viewEverything": "View everything →",
    "nav.brandNote": "Every branded piece is verified authentic before it's listed.",
    "nav.langLabel": "Language",

    // ── Buttons / common ───────────────────────────────────────
    "cta.orderInstagram": "Order via Instagram",
    "cta.orderInstagramCopied": "Copied — paste it in our DM",
    "cta.shopCollection": "Shop the collection",
    "cta.exploreBags": "Explore bags",
    "cta.shopNow": "Shop now",
    "cta.messageUs": "Message us",
    "cta.viewAll": "View all",
    "cta.quickView": "Quick view",
    "cta.addWishlist": "Add to wishlist",
    "cta.removeWishlist": "Remove from wishlist",
    "cta.saveWishlist": "Save to wishlist",
    "cta.savedWishlist": "Saved to wishlist",
    "cta.followUs": "Follow",
    "common.from": "from",
    "common.colour": "Colour",
    "common.size": "Size",
    "common.sizeGuide": "Size guide",

    // ── Hero ───────────────────────────────────────────────────
    "hero.eyebrow": "New summer drop · 2026",
    "hero.line1": "Affordable luxury,",
    "hero.line2": "for the way you live.",
    "hero.sub":
      "Designer-inspired & authentic bags, dresses and jackets — hand-picked in Prishtinë and shipped to your door.",

    // ── Marquee ────────────────────────────────────────────────
    "marquee.items": "Authentic Michael Kors|Guess|Zara|Puma|Order on Instagram|Hand-picked in Prishtinë|Shipped across the region",

    // ── Categories / home sections ─────────────────────────────
    "cat.bags": "Bags",
    "cat.dresses": "Dresses",
    "cat.jackets": "Jackets",
    "cat.accessories": "Accessories",
    "cat.bags.blurb": "Saddle, quilted & signature",
    "cat.jackets.blurb": "Shearling & statement",
    "cat.dresses.blurb": "Soft & feminine",
    "home.newArrivals.eyebrow": "Just dropped",
    "home.newArrivals.title": "New arrivals",
    "home.newArrivals.viewAll": "View all products",

    // ── Shop the look ──────────────────────────────────────────
    "look.eyebrow": "Styled by Vibe",
    "look.title1": "One outfit.",
    "look.title2": "Three statement pieces.",
    "look.body":
      "Tap a dot on the photo to jump to the piece. Shop the whole look — or just the one you can't stop thinking about.",
    "look.shopAll": "Shop all new in",
    "look.badge": "The Winter Edit",

    // ── Trust bar ──────────────────────────────────────────────
    "trust.authentic.title": "100% Authentic",
    "trust.authentic.desc": "Verified Zara, Guess & MK pieces",
    "trust.shipping.title": "Regional Shipping",
    "trust.shipping.desc": "Across Kosovo & the region",
    "trust.returns.title": "Easy Returns",
    "trust.returns.desc": "Just message us to arrange",
    "trust.instagram.title": "Order on Instagram",
    "trust.instagram.desc": "Personal styling in your DMs",

    // ── Instagram feed ─────────────────────────────────────────
    "ig.eyebrow": "As seen on Instagram",
    "ig.body":
      "Tap any look to shop it in our DMs. New pieces drop weekly — follow so you never miss a restock.",

    // ── Shop page ──────────────────────────────────────────────
    "shop.title": "Shop all",
    "shop.intro":
      "Hand-picked authentic & designer-inspired pieces. Every item is checked in person before it reaches you.",
    "shop.all": "All",
    "shop.brand": "Brand",
    "shop.price": "Price",
    "shop.clear": "Clear",
    "shop.sort": "Sort products",
    "shop.sort.featured": "Featured",
    "shop.sort.priceAsc": "Price: Low to High",
    "shop.sort.priceDesc": "Price: High to Low",
    "shop.sort.discount": "Biggest discount",
    "shop.count.one": "piece",
    "shop.count.other": "pieces",
    "shop.empty.title": "Nothing matches those filters",
    "shop.empty.body": "Try clearing a filter — new pieces drop weekly.",
    "shop.priceUnder": "Under €30",
    "shop.price3050": "€30–50",
    "shop.price5070": "€50–70",
    "shop.price70": "€70+",

    // ── Product page ───────────────────────────────────────────
    "pdp.authentic": "100% authentic",
    "pdp.shippedCare": "Shipped with care",
    "pdp.easyReturns": "Easy returns",
    "pdp.onlyLeft": "Only {n} left",
    "pdp.acc.materials": "Description & materials",
    "pdp.acc.shipping": "Shipping & delivery",
    "pdp.acc.returns": "Returns",
    "pdp.reassure.authentic": "100% authentic — checked in person before shipping",
    "pdp.reassure.shipping": "Shipped across Kosovo & the region",
    "pdp.reassure.returns": "Easy returns — just message us",
    "pdp.shipBody1": "We ship within {domestic} and regionally ({region}).",
    "pdp.shipBody2":
      "Delivery time, shipping cost and payment are all confirmed when you order in our Instagram DMs.",
    "pdp.returnsBody": "Changed your mind? Return unworn items with their tags attached. Message us on Instagram and we'll arrange it — see our",
    "pdp.returnsLink": "full returns policy",
    "pdp.related": "You may also like",
    "pdp.sizeError": "Please choose a size so we can confirm availability.",

    // ── Saved drawer ───────────────────────────────────────────
    "drawer.saved": "Saved",
    "drawer.empty.title": "Nothing saved yet",
    "drawer.empty.body": "Tap the heart on any piece to keep it here.",
    "drawer.empty.cta": "Browse the collection",
    "drawer.total": "Total",
    "drawer.checkout": "Order via Instagram",
    "drawer.copied": "Copied — paste in our DMs",
    "drawer.note": "We'll copy your list — just paste it to @{handle}.",

    // ── Footer ─────────────────────────────────────────────────
    "footer.tagline": "Affordable luxury, delivered with love.",
    "footer.shop": "Shop",
    "footer.help": "Help",
    "footer.company": "Company",
    "footer.rights": "All rights reserved.",

    // ── Prefilled Instagram order message ──────────────────────
    "dm.greeting": "Hi {name}! 👋 I'd like to order:",
    "dm.price": "Price",
    "dm.link": "Link",
    "qv.save": "Save",
    "qv.saved": "Saved",
    "qv.details": "Details",
  },

  sq: {
    // ── Global chrome ──────────────────────────────────────────
    "nav.shop": "Dyqani",
    "nav.bags": "Çanta",
    "nav.dresses": "Fustane",
    "nav.jackets": "Xhaketa",
    "nav.accessories": "Aksesorë",
    "nav.about": "Rreth nesh",
    "nav.faq": "Pyetje",
    "nav.contact": "Kontakti",
    "nav.menu": "Menyja",
    "nav.openMenu": "Hap menynë",
    "nav.closeMenu": "Mbyll menynë",
    "nav.search": "Kërko produkte",
    "nav.saved": "Të ruajtura",
    "nav.home": "Ballina",
    "nav.announce": "Të zgjedhura me dorë në Prishtinë · Porosit përmes Instagram DM",
    "nav.categories": "Kategoritë",
    "nav.shopByBrand": "Bli sipas markës",
    "nav.viewEverything": "Shiko të gjitha →",
    "nav.brandNote": "Çdo artikull me markë verifikohet si origjinal para se të listohet.",
    "nav.langLabel": "Gjuha",

    // ── Buttons / common ───────────────────────────────────────
    "cta.orderInstagram": "Porosit përmes Instagram",
    "cta.orderInstagramCopied": "U kopjua — ngjite në DM-të tona",
    "cta.shopCollection": "Bli koleksionin",
    "cta.exploreBags": "Shiko çantat",
    "cta.shopNow": "Bli tani",
    "cta.messageUs": "Na shkruaj",
    "cta.viewAll": "Shiko të gjitha",
    "cta.quickView": "Shikim i shpejtë",
    "cta.addWishlist": "Shto te të preferuarat",
    "cta.removeWishlist": "Hiq nga të preferuarat",
    "cta.saveWishlist": "Ruaj te të preferuarat",
    "cta.savedWishlist": "E ruajtur",
    "cta.followUs": "Ndiqe",
    "common.from": "nga",
    "common.colour": "Ngjyra",
    "common.size": "Madhësia",
    "common.sizeGuide": "Udhëzues madhësish",

    // ── Hero ───────────────────────────────────────────────────
    "hero.eyebrow": "Koleksioni i ri i verës · 2026",
    "hero.line1": "Luks i përballueshëm,",
    "hero.line2": "për mënyrën si jeton.",
    "hero.sub":
      "Çanta, fustane dhe xhaketa autentike dhe të frymëzuara nga dizajnerët — të zgjedhura me dorë në Prishtinë dhe të dërguara te dera jote.",

    // ── Marquee ────────────────────────────────────────────────
    "marquee.items": "Michael Kors autentik|Guess|Zara|Puma|Porosit në Instagram|Të zgjedhura me dorë në Prishtinë|Dërgesa në tërë rajonin",

    // ── Categories / home sections ─────────────────────────────
    "cat.bags": "Çanta",
    "cat.dresses": "Fustane",
    "cat.jackets": "Xhaketa",
    "cat.accessories": "Aksesorë",
    "cat.bags.blurb": "Saddle, të kapitonuara & me logo",
    "cat.jackets.blurb": "Lesh & me karakter",
    "cat.dresses.blurb": "Të buta & feminine",
    "home.newArrivals.eyebrow": "Sapo erdhën",
    "home.newArrivals.title": "Të rejat",
    "home.newArrivals.viewAll": "Shiko të gjitha produktet",

    // ── Shop the look ──────────────────────────────────────────
    "look.eyebrow": "Stilizuar nga Vibe",
    "look.title1": "Një veshje.",
    "look.title2": "Tri pjesë me karakter.",
    "look.body":
      "Prek një pikë në foto për të kaluar te produkti. Bli tërë veshjen — ose vetëm atë që s'po të del nga mendja.",
    "look.shopAll": "Bli të gjitha të rejat",
    "look.badge": "Edicioni i Dimrit",

    // ── Trust bar ──────────────────────────────────────────────
    "trust.authentic.title": "100% Autentike",
    "trust.authentic.desc": "Zara, Guess & MK të verifikuara",
    "trust.shipping.title": "Dërgesa në rajon",
    "trust.shipping.desc": "Në Kosovë & rajon",
    "trust.returns.title": "Kthime të lehta",
    "trust.returns.desc": "Vetëm na shkruaj për t'i rregulluar",
    "trust.instagram.title": "Porosit në Instagram",
    "trust.instagram.desc": "Stilizim personal në DM",

    // ── Instagram feed ─────────────────────────────────────────
    "ig.eyebrow": "Siç u pa në Instagram",
    "ig.body":
      "Prek çdo veshje për ta blerë në DM-të tona. Pjesë të reja çdo javë — ndiqe që të mos humbasësh asnjë rifurnizim.",

    // ── Shop page ──────────────────────────────────────────────
    "shop.title": "Të gjitha produktet",
    "shop.intro":
      "Pjesë autentike dhe të frymëzuara nga dizajnerët, të zgjedhura me dorë. Çdo artikull kontrollohet personalisht para se të vijë te ti.",
    "shop.all": "Të gjitha",
    "shop.brand": "Marka",
    "shop.price": "Çmimi",
    "shop.clear": "Pastro",
    "shop.sort": "Rendit produktet",
    "shop.sort.featured": "Të zgjedhura",
    "shop.sort.priceAsc": "Çmimi: nga i ulëti te i larti",
    "shop.sort.priceDesc": "Çmimi: nga i larti te i ulëti",
    "shop.sort.discount": "Zbritja më e madhe",
    "shop.count.one": "artikull",
    "shop.count.other": "artikuj",
    "shop.empty.title": "Asgjë nuk përputhet me ata filtra",
    "shop.empty.body": "Provo të heqësh një filtër — pjesë të reja çdo javë.",
    "shop.priceUnder": "Nën €30",
    "shop.price3050": "€30–50",
    "shop.price5070": "€50–70",
    "shop.price70": "€70+",

    // ── Product page ───────────────────────────────────────────
    "pdp.authentic": "100% autentike",
    "pdp.shippedCare": "Dërguar me kujdes",
    "pdp.easyReturns": "Kthime të lehta",
    "pdp.onlyLeft": "Vetëm {n} të mbetura",
    "pdp.acc.materials": "Përshkrimi & materialet",
    "pdp.acc.shipping": "Dërgesa & transporti",
    "pdp.acc.returns": "Kthimet",
    "pdp.reassure.authentic": "100% autentike — kontrolluar personalisht para dërgesës",
    "pdp.reassure.shipping": "Dërgesa në Kosovë & rajon",
    "pdp.reassure.returns": "Kthime të lehta — vetëm na shkruaj",
    "pdp.shipBody1": "Dërgojmë brenda {domestic} dhe në rajon ({region}).",
    "pdp.shipBody2":
      "Koha e dërgesës, çmimi i transportit dhe pagesa konfirmohen kur porosit në DM-të tona në Instagram.",
    "pdp.returnsBody": "Ndërrove mendje? Ktheji artikujt e paveshur me etiketa të bashkangjitura. Na shkruaj në Instagram dhe e rregullojmë — shiko",
    "pdp.returnsLink": "politikën e plotë të kthimeve",
    "pdp.related": "Mund të të pëlqejnë edhe",
    "pdp.sizeError": "Të lutem zgjidh një madhësi që të konfirmojmë disponueshmërinë.",

    // ── Saved drawer ───────────────────────────────────────────
    "drawer.saved": "Të ruajtura",
    "drawer.empty.title": "Ende asgjë e ruajtur",
    "drawer.empty.body": "Prek zemrën te çdo pjesë për ta mbajtur këtu.",
    "drawer.empty.cta": "Shfleto koleksionin",
    "drawer.total": "Totali",
    "drawer.checkout": "Porosit përmes Instagram",
    "drawer.copied": "U kopjua — ngjite në DM-të tona",
    "drawer.note": "Do ta kopjojmë listën tënde — vetëm ngjite te @{handle}.",

    // ── Footer ─────────────────────────────────────────────────
    "footer.tagline": "Luks i përballueshëm, dërguar me dashuri.",
    "footer.shop": "Dyqani",
    "footer.help": "Ndihmë",
    "footer.company": "Kompania",
    "footer.rights": "Të gjitha të drejtat e rezervuara.",

    // ── Prefilled Instagram order message ──────────────────────
    "dm.greeting": "Përshëndetje {name}! 👋 Dëshiroj të porosis:",
    "dm.price": "Çmimi",
    "dm.link": "Linku",
    "qv.save": "Ruaj",
    "qv.saved": "E ruajtur",
    "qv.details": "Detajet",
  },
} satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["en"];
