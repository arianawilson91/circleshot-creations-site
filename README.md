# CircleShot Creations

SWFL 360° Photo Booth — business website.

Live reference: https://circleshotcreations.com

## Local development

It's a plain static site — no build step. Serve it any way you like:

```bash
# Python
python3 -m http.server 8090

# Node
npx http-server -p 8090
```

Then open http://localhost:8090.

## Structure

```
index.html        # single-page site
styles.css        # design system (brand colors in :root)
assets/images/    # gallery images — drop new photos here
```

To change brand colors, edit the CSS variables at the top of `styles.css`:

```css
--pink: #F46B9F;  /* primary accent */
--cyan: #38D6F7;  /* secondary accent */
--navy: #0A192F;  /* dark background */
```

## Adding gallery photos

Drop JPG/PNG files into `assets/images/` and add them to the `.gallery` section in `index.html`:

```html
<figure><img src="assets/images/your-photo.jpg" alt="..." loading="lazy" /></figure>
```

## Contact form

The form posts to [Formspree](https://formspree.io). To activate it:

1. Sign up at formspree.io (free tier is fine).
2. Create a new form and copy your form ID.
3. In `index.html`, replace `your-form-id` in the form's `action` URL with your real ID.

## Deploy

### GitHub Pages

1. Push this repo to GitHub (see below).
2. In **Settings → Pages**, set source to `main` branch, `/` folder.
3. Site will be live at `https://<username>.github.io/<repo>/`.

### Replit

1. Go to https://replit.com → **Create Repl → Import from GitHub**.
2. Paste your GitHub repo URL.
3. Replit auto-detects it as a static site. Hit **Run**.

### Netlify / Vercel (easiest for custom domain)

- Netlify: drag the project folder onto https://app.netlify.com/drop.
- Vercel: run `npx vercel` in this directory.

Either one lets you point `circleshotcreations.com` at the new host.
