# Free Invoice Generator

Create professional, customized invoices quickly and easily. No sign-up required, 100% free, and everything runs in your browser.

## Features

- **100% Free & Open Source** — No hidden costs, no sign-ups
- **Fast & Efficient** — Generate beautiful invoices in seconds
- **No Data Storage** — Everything stays in your browser. Nothing is saved on any server.
- **Unlimited Invoices** — Create as many as you need
- **PDF Download** — Professional A4 PDF invoices
- **Multiple Currencies** — Support for worldwide currencies

## Built With

- **Framework:** [Next.js](https://nextjs.org)
- **PDF Generator:** [React PDF](https://react-pdf.org/)
- **Styling:** [Tailwind CSS](http://tailwindcss.com)

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Fork or clone this repo
2. Import into [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_URL` — Your domain URL
   - `NEXT_PUBLIC_ADSENSE_ID` — Your Google AdSense publisher ID (optional)
4. Deploy!

## Run Locally

```bash
git clone <your-repo-url>
cd invoice-generator
bun install
bun run dev
```

Create `.env.local` from `.env.example`.
