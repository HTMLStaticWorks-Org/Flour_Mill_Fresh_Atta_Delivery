# Fresh Chakki — Flour Mill & Fresh Atta Delivery

This ZIP contains 9 HTML pages:
1. index.html — Home (includes Live Mill Status Ticker & Sensory Kitchen Spotlight)
2. home-2.html — Home 2 (The Reserve Atelier: Single-Estate Grain Sommelier Flight, Bespoke Monogram Kraft Sack Studio, 12-Hour Roti Softness Simulator, and 280 RPM Cold Granite Kinetic Physics)
3. about.html — About
4. products.html — Products
5. process.html — Milling process and delivery plans
6. contact.html — Contact
7. login.html — Login
8. signup.html — Signup
9. dashboard.html — Customer dashboard, including order entry and billing sections

## Preview
Open `index.html` in a modern browser. The website uses relative asset paths and can be previewed locally.

## Implemented front-end interactions
- Light/dark theme toggle (icon only), saved across pages with localStorage.
- RTL/LTR layout toggle (text only), saved across pages with localStorage. This changes layout direction; it does not translate content.
- Responsive desktop/mobile navigation.
- Dashboard internal tab navigation.
- Demo forms with visible confirmation messages.
- Product selection prompts and sample order form.

## Important production limitations
This is a static front-end prototype. Login/signup are not connected to secure authentication. Orders, subscriptions, delivery tracking, invoices, payments, inventory and customer records require a backend, database and appropriate integrations. Demo forms do not send information to a business.

## Business content
Brand name, address, phone, email, prices, delivery zones, policies and product details are illustrative placeholders and must be replaced with verified business information.

## Images and fonts
Photographs are loaded from Unsplash image URLs and local assets (`assets/images/granite-cold-stone-mill.jpg`), and fonts from Google Fonts; internet access is needed for remote assets. For offline hosting, download and locally bundle approved image/font assets.


## Updated visual identity
- Shared Fresh Chakki logo asset: `assets/images/fresh-chakki-logo.png`
- Typography: DM Serif Display (primary headings), Prata (accent text), and Inter (body/UI).
- All nine pages share the same header and footer, including three social links and a newsletter signup demo.
- Social destinations are placeholders; connect the real brand profiles before launch. Newsletter form requires a mailing-list/backend integration.
