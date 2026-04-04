# Luqman · GIS Portfolio

A clean, data-driven personal portfolio for GIS freelancers.
Built with vanilla HTML, CSS, and JS — no frameworks, no build step, just files.

---

## File Structure

```
portfolio/
│
├── index.html          ← Page shell (DO NOT edit for content)
├── style.css           ← All styles + responsive rules
├── script.js           ← Renderer (reads data files → builds DOM)
│
├── data/
│   ├── profile.js      ← ✏️  YOUR INFO: name, contact, tools, stats
│   ├── services.js     ← ✏️  YOUR SERVICES: title, price, WhatsApp message
│   └── projects.js     ← ✏️  YOUR PROJECTS: title, description, tools
│
├── assets/
│   ├── images/         ← Project screenshots (reference in projects.js)
│   ├── icons/          ← Any custom icons
│   └── logos/          ← Brand logos if needed
│
└── README.md
```

---

## How to Update Content

### Change your name / contact info
Edit `data/profile.js` — update `name`, `contact.whatsapp`, `contact.email`, etc.

### Add a new service
Open `data/services.js` and add a new object to the array:
```js
{
  icon:      "📍",
  title:     "Site Suitability Analysis",
  benefit:   "Find the best location before spending a cent.",
  price:     "From RM 300",
  delivery:  "3–4 days",
  waMessage: "Hi Luqman, I need a Site Suitability Analysis.",
},
```

### Add a new project
Open `data/projects.js` and add a new object:
```js
{
  tag:         "Land Use · Remote Sensing",
  title:       "LULC Change Detection",
  description: "Detected 23% forest loss over 5 years using Landsat imagery.",
  tools:       ["QGIS", "Python", "Rasterio"],
  visualTheme: "map",        // "map" | "chart" | "dashboard"
  image:       "assets/images/lulc-project.png",  // or "" for auto-visual
  link:        "https://github.com/your-username/lulc-project",
},
```

### Use a real screenshot
1. Save image to `assets/images/your-file.png`
2. Set `image: "assets/images/your-file.png"` in `projects.js`
3. The renderer will use it automatically over the fallback visual

---

## WhatsApp Integration

Each service card links directly to WhatsApp with a pre-filled message.
Just update `waMessage` in each service and your number in `profile.js`:

```js
contact: {
  whatsapp: "60123456789",  // Malaysia: 60 + number without leading 0
  ...
}
```

---

## Deploy to Netlify (Free)

1. Push this folder to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select your repo → Deploy
4. Done. Auto-deploys on every push.

Or: drag and drop the `portfolio/` folder directly at [app.netlify.com/drop](https://app.netlify.com/drop).

## Deploy to GitHub Pages

1. Push to a repo named `your-username.github.io`
2. Go to repo Settings → Pages → Source: main branch
3. Your site is live at `https://your-username.github.io`

---

## Local Preview

No server needed. Just open `index.html` in any browser.

```bash
# Or use VS Code Live Server extension
# Or use Python:
cd portfolio
python -m http.server 3000
# Open: http://localhost:3000
```

---

## Customisation Quick Reference

| What to change         | File to edit          |
|------------------------|-----------------------|
| Name, contact, tagline | `data/profile.js`     |
| Services & prices      | `data/services.js`    |
| Projects               | `data/projects.js`    |
| Tools list             | `data/profile.js`     |
| Stats row              | `data/profile.js`     |
| Colors / fonts         | `style.css` (`:root`) |
| Page layout            | `style.css`           |
| Section copy           | `index.html`          |

---

Built by Luqman · GIS & Location Intelligence · Malaysia
