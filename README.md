# Quentin Petty — Portfolio

Static portfolio site for Quentin Petty: footwear & fashion prototypes (Portfolio) and handmade accessories (Works).

Built with plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html    — single page (cover, portfolio, works, detail views)
styles.css    — all styling
app.js        — item data, navigation, film-transition effects
assets/       — cover, portfolio and works photography
vercel.json   — cache headers for Vercel
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In [Vercel](https://vercel.com/new), import the repository.
3. Framework preset: **Other** (no build command, output directory: root).
4. Deploy.

## Editing content

All portfolio/works items live at the top of `app.js` (`portfolioItems` and `shopItems`). Each item has a name, tag, images and optional description/price. Prices currently show `$ —`; replace with real prices to enable the "Inquire to Purchase" mail link (goes to quentinpetty04@gmail.com).
