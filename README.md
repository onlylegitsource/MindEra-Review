# Abdul Afeez Tella · Nelavista

Founder and company website for **Abdul Afeez Tella**, founder of **Nelavista**, the platform built for African university students: academics, practical skills, opportunities, and the move from university to work.

Live: https://onlylegitsource.github.io/MindEra-Review/

> The repository keeps its original name so the GitHub Pages URL (and any existing links and search indexing) keeps working.

## Structure

```
index.html              Single-page site (content, SEO, Open Graph, JSON-LD)
404.html                Not-found page for GitHub Pages
assets/styles.css       Design system and layout
assets/main.js          Menu, scroll reveals, count-up, active nav (no dependencies)
assets/africa-dots.svg  Dot-matrix map used in the Africa section
assets/og-image.png     1200x630 social sharing image
assets/favicon*.{svg,png}, apple-touch-icon.png
tools/                  HTML sources for the generated images (not linked from the site)
robots.txt, sitemap.xml
google76268f26b118dad1.html   Google Search Console verification
```

No build step. Deploy the repository root as a static site.

## Updating content

- **Traction:** the only figure on the site is `645+ students reached` (`data-count="645"` in `index.html`). Only add numbers that are verified.
- **Social image:** edit `tools/og-image.html`, then re-render:
  `chrome --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=assets/og-image.png tools/og-image.html`
- **Domain:** if the site moves to a custom domain, update the canonical URL, `og:url`, `og:image`, JSON-LD `@id`s, `robots.txt` and `sitemap.xml`, and the absolute paths in `404.html`.
