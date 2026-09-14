# Sard Chocolate Menu — Extraction Summary

**IMPORTANT NOTE ON SCOPE:** The source file `sard-menu.pdf` actually contains **66 pages**, not 223 as initially assumed. This was verified by counting `/Type /Page` objects in the raw PDF and confirmed visually — page 66 is a clear closing/contact slide (branch locations, phone numbers, QR codes, "follow your passion" tagline), consistent with the end of the deck. All 66 pages have been read and catalogued; nothing was skipped.

## Totals

- **Total pages:** 66
- **Product entries (priced items/variants):** 29
- **Category divider pages:** 20
- **Other (cover/intro/fillings-reference/closing) pages:** 17
- **Price range:** 5 ILS (per-piece "ألواح الشوكولاتة الفاخرة") to 165 ILS (large wooden colored-chocolate box, "بكج الخشب الملونة حجم كبير")
- Currency throughout: ILS (شيكل), except one page (42, "صحون المغلفة الاستثنائية") where price is variable/custom ("الاسعار حسب اختيار الزبون") and two pages (64, 65) which are category teasers with no listed price at all.

## Categories found (Arabic, in menu order)

1. شوكولاتة ملونة (Colored Chocolate) — small/medium/large box, 45/80/120 ILS
2. شوكولاتة مغلفة (Wrapped Chocolate, classic) — medium/large, 60/120 ILS
3. بوكس الحديد (Iron/Tin Box) — 100 ILS
4. بقلاوة فاخرة (Premium Baklava) — 90 ILS
5. حلويات ذهبية مقرمشة (Crunchy Golden Sweets) — 90 ILS
6. ترافيلز سارد (Sard Truffles) — 80 ILS
7. عش بلبل (Bird's Nest / Ish Bulbul) — 80 ILS
8. بكج الخشب المميز (Special Wood Box) — wrapped medium/large 90/155 ILS; colored medium/large 120/165 ILS
9. تمر سارد المميز (Sard Special Dates) — small/medium/large, 40/60/80 ILS
10. شوكولاتة دايت ملونة (Colored Diet/Sugar-free Chocolate) — 55 ILS
11. بيبي بوكس (Baby Box, "It's a Boy"/"It's a Girl") — 80 ILS
12. صحون الشوكولاتة المغلفة (Wrapped Chocolate Trays/Bowls) — variable price
13. شوكولاتة مغلفة أسطورية (Legendary Wrapped Chocolate) — 75 ILS (bag) / 100 ILS (1kg)
14. شوكولاتة دايت مغلفة (Wrapped Diet Chocolate) — 140 ILS
15. ألواح شوكولاتة Sard (Sard 100g Bars) — regular 10 ILS, diet/sugar-free 12 ILS
16. ألواح شوكولاتة دبي (Dubai-style Trend Bars) — 12 ILS
17. ألواح الشوكولاتة الفاخرة (Premium Bars, mixed flavor box) — 5 ILS/piece, 300 ILS/carton of 60
18. شوكولاتة تكسير (Bark/"Shatter" Chocolate) — 120 ILS/kilo
19. الدراجية (Dragées, kid-oriented candy-coated chocolate) — 80 ILS/kilo
20. توزيعات Sard الأنيقة (Elegant Party Favors/Distributions) — category shown, no price given
21. مكسرات سارد الفاخرة (Premium Roasted Nuts) — category shown, no price given

Additionally, numerous "الحشوات" (fillings/flavor reference) pages appear throughout — listing filling names (with Milk/Dark/White Chocolate labels) for the colored-chocolate, wrapped-chocolate, wood-box, and diet-wrapped product lines. These carry no price and were catalogued as `"type": "other"` with the flavor list captured in the `note` field, per instructions not to force them into the product list.

## Ambiguous / notable pages

- **Page 42** ("صحون المغلفة الاستثنائية"): price shown as "الاسعار حسب اختيار الزبون" (price depends on customer's choice) rather than a fixed number — recorded with `price: null`.
- **Pages 43 and 48**: near-identical category-divider text/description for "شوكولاتة مغلفة أسطورية" appears twice (different photos), once before the 75 ILS bag and again before the 100 ILS 1kg bag — likely an intentional repeat in the source deck, not a read error (verified via multiple independent re-reads of this page range).
- **Pages 50 and 51**: an identical fillings-reference grid (كراميل, زبدة فول سوداني, كريمة جولد, رافيلو, كريمة لوتس, كريمة فستق حلبي, بسكوت مكرمل, كندر) appears on two consecutive pages — confirmed via direct re-read, likely a duplicated slide in the original design file rather than an extraction artifact.
- **Page 47**: a fillings-reference grid with only 6 of the usual 10 items filled in (bottom of the slide left blank in the source design).
- **Pages 64 and 65** ("توزيعات Sard الأنيقة" and "مكسرات سارد الفاخرة"): these are category-intro slides with descriptive text and photos but are **not** followed by a dedicated price/product slide — the deck ends (page 66) right after them. Treated as `category_divider` with no associated product price.
- **Page 66**: closing/contact slide, not a product — includes 3 branch addresses/phone numbers and 3 QR codes (likely Instagram/WhatsApp/location links) that could not be decoded from the image alone.

No pages were unreadable or illegible; all Arabic text was legible at the resolution provided.

## Files written

- `/Users/macuser/Development/sard/.assets/catalog/extracted-catalog.json` — full page-by-page structured data (66 entries)
- `/Users/macuser/Development/sard/.assets/catalog/extracted-catalog-summary.md` — this summary
