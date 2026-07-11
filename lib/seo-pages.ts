export interface Section {
  type: 'hero' | 'text' | 'list' | 'card-list' | 'table' | 'faq' | 'divider';
  heading?: string;
  subheading?: string;
  content?: string | string[];
  items?: string[];
  cardTitle?: string;
  headers?: string[];
  rows?: string[][];
  q?: string;
  a?: string;
}

export interface PageData {
  path: string;
  title: string;
  description: string;
  sections: Section[];
}

function h(t: string, d: string, ...s: Section[]): PageData {
  return { path: t, title: d, sections: s, description: d };
}

const t = (heading: string, content: string): Section => ({ type: 'text', heading, content });
const hero = (heading: string, content: string): Section => ({ type: 'hero', heading, content });
const list = (heading: string, items: string[]): Section => ({ type: 'list', heading, items });
const cardList = (heading: string, items: string[], cardTitle?: string): Section => ({ type: 'card-list', heading, items, cardTitle });
const table = (heading: string, headers: string[], rows: string[][]): Section => ({ type: 'table', heading, headers, rows });
const faq = (heading: string, items: { q: string; a: string }[]): Section => ({ type: 'faq', heading, items: items.map(i => i.q), q: undefined, a: undefined, ...items.reduce((acc, item) => ({ ...acc, [item.q]: item.a }), {}) });
const divider: Section = { type: 'divider' };

const siteName = 'Free Invoice Generator';

export const seoPages: PageData[] = [
  // ── Templates ──
  h('/invoice-template', `Free Invoice Template – Download Word, PDF, Excel | ${siteName}`,
    hero('Free Invoice Template', 'Create professional invoices in seconds with our free, customizable invoice template. Available in multiple formats including Word, PDF, Excel, Google Docs, and Google Sheets.'),
    t('Why Use a Professional Invoice Template?', 'A well-designed invoice template saves time, ensures you get paid faster, and presents a professional image to your clients. Our templates include all the essential fields you need — business details, client information, line items, tax calculations, and payment terms.'),
    list('Available Formats', ['Microsoft Word (.docx) – Fully editable with a clean layout', 'Adobe PDF – Print-ready with locked formatting', 'Microsoft Excel (.xlsx) – Built-in tax and total calculations', 'Google Docs – Edit online for free from any device', 'Google Sheets – Spreadsheet format with auto-calculations']),
    t("What's Included", 'Each template includes: your company name and logo placeholder, invoice number and date fields, bill-to section for client details, itemized service/product table with rates, automatic subtotal and tax calculation, payment terms and due date, and a professional footer with your contact information.'),
  ),
  h('/invoice-template-pdf', `Invoice Template PDF – Free Printable Download | ${siteName}`,
    hero('Invoice Template PDF', 'A clean, print-ready invoice template in PDF format. Simply download, fill in your details using any PDF reader, and send to your clients.'),
    t('Why Choose PDF?', 'PDF invoices maintain their formatting across all devices and operating systems. Your client sees exactly what you intended — no font issues, no layout shifts, no compatibility problems. Plus, PDFs can be secured with passwords and digitally signed.'),
    list('Features', ['Print-ready A4 and US Letter sizes', 'Locked formatting that never shifts', 'Fillable fields for easy editing', 'Professional minimalist design', 'Compatible with Adobe Acrobat, Preview, and all PDF readers']),
  ),
  h('/invoice-template-word', `Invoice Template Word – Free Microsoft Word Template | ${siteName}`,
    hero('Invoice Template Word', 'A fully editable Microsoft Word invoice template. Customize fonts, colors, and layout to match your brand. Save as .docx or export to PDF.'),
    t('Why Use Word?', 'Microsoft Word is the most widely used word processor. Our Word invoice template is fully editable — change colors, add your logo, modify columns, and adjust the layout to fit your brand. No design skills needed.'),
    list("What You Get", ['Editable .docx format', 'Professional table layout', 'Automatic totals with Word formulas', 'Placeholder for your logo', 'Print-optimized layout']),
  ),
  h('/invoice-template-excel', `Invoice Template Excel – Free Spreadsheet Invoice | ${siteName}`,
    hero('Invoice Template Excel', 'A smart Excel invoice template with automatic calculations. Add line items, set tax rates, and watch totals update in real time.'),
    t('Built-in Calculations', 'Unlike static formats, our Excel template includes formulas that automatically calculate subtotals, taxes, discounts, and grand totals. Enter your rates and quantities — the math is done for you.'),
    list('Features', ['Auto-calculating subtotal, tax, and total', 'Multiple tax rate support', 'Itemized line item table', 'Professional print layout', 'Compatible with Excel 2010+ and LibreOffice']),
  ),
  h('/invoice-template-google-docs', `Invoice Template Google Docs – Free Online Invoice | ${siteName}`,
    hero('Invoice Template Google Docs', 'Create and edit invoices directly in your browser with our Google Docs template. Free, no installation, and accessible from any device.'),
    t('Why Google Docs?', 'Google Docs is free, cloud-based, and works on any device. Our template lets you create invoices without downloading any software. Share with clients via a link, export as PDF, or print directly.'),
    list('Benefits', ['100% free — no software purchase needed', 'Edit from any device with internet access', 'Real-time collaboration with your team', 'Automatic cloud backup', 'Easy PDF export for sending to clients']),
  ),
  h('/invoice-template-google-sheets', `Invoice Template Google Sheets – Free Spreadsheet | ${siteName}`,
    hero('Invoice Template Google Sheets', 'A powerful Google Sheets invoice template with automatic formulas. Track all your invoices in one spreadsheet with built-in calculations.'),
    t('Spreadsheet Power', 'Google Sheets combines the calculation power of Excel with the convenience of cloud access. Our template includes automatic tax calculations, running totals, and a clean print layout.'),
    list("What Makes It Great", ['Auto-calculating formulas', 'Cloud-based — access anywhere', 'Free to use with any Google account', 'Easy to duplicate for multiple invoices', 'Export as PDF or Excel']),
  ),

  // ── Examples ──
  h('/invoice-example', `Invoice Example – See a Professional Invoice Sample | ${siteName}`,
    hero('Invoice Example', 'See exactly what a professional invoice looks like. Use this example as a guide to structure your own invoices correctly.'),
    t('Sample Invoice Breakdown', 'A standard invoice includes: your business name and contact information at the top, a unique invoice number and date, the client name and address, a table of services or products with quantities and rates, subtotal, tax calculation, total amount due, and payment terms with due date.'),
    list('Key Elements', ['Clear header with business logo and contact info', 'Unique invoice number for tracking (e.g., INV-001)', 'Itemized list of services with rates', 'Subtotal before tax', 'Tax rate clearly shown (e.g., 10% VAT)', 'Total amount due', 'Payment terms (e.g., Net 30) and payment methods']),
  ),
  h('/freelance-invoice-example', `Freelance Invoice Example – Template for Freelancers | ${siteName}`,
    hero('Freelance Invoice Example', 'A practical invoice example tailored for freelancers. Whether you are a writer, designer, or developer, this format covers everything you need to bill clients.'),
    t('Freelance-Specific Fields', 'Freelance invoices differ from standard business invoices. They typically include hourly rates or project-based fees, payment milestones, and clear payment terms.'),
    t('What to Include', 'Your freelance invoice should include: your name/business name, client name, a description of services rendered, the project or hourly rate, any expenses incurred, and the total amount. Always include your payment preferences — bank transfer, PayPal, or other methods.'),
  ),
  h('/web-design-invoice-example', `Web Design Invoice Example – Sample for Designers | ${siteName}`,
    hero('Web Design Invoice Example', 'A detailed invoice example tailored for web design and development services. Shows how to itemize design phases, revisions, and development work.'),
    t('Itemizing Design Services', 'Web design projects typically involve multiple phases — discovery, wireframing, visual design, development, and testing. Each phase should be a separate line item with its own cost.'),
    list('Example Line Items', ['UI/UX Design – per page pricing', 'Frontend Development – hourly rate', 'Revisions (rounds included vs additional)', 'Hosting setup fee', 'Domain registration']),
  ),
  h('/consulting-invoice-example', `Consulting Invoice Example – Professional Consulting Invoice | ${siteName}`,
    hero('Consulting Invoice Example', 'A professional consulting invoice example that demonstrates how to bill for advisory services, strategy sessions, and consulting engagements.'),
    t('Consulting Billing Best Practices', 'Consultants typically bill by the hour, by the day, or on a project basis. Your invoice should clearly state the billing method, the consulting period, and a detailed breakdown of services provided.'),
    list('Typical Items', ['Strategy Session – hourly rate', 'Market Research Report – fixed fee', 'Travel and accommodation expenses', 'Presentation materials preparation', 'Follow-up consultation']),
  ),
  h('/software-development-invoice-example', `Software Development Invoice Example – Dev Invoice Sample | ${siteName}`,
    hero('Software Development Invoice Example', 'A comprehensive invoice example for software development projects. Covers development hours, testing, deployment, and ongoing maintenance.'),
    t('Development Billing Structure', 'Software development invoices often combine fixed-price milestones with hourly work. Clearly separate development from hosting, maintenance, and third-party service costs.'),
    list('Sample Line Items', ['Backend API Development – hourly', 'Frontend Implementation – hourly', 'Database Setup & Migration – fixed fee', 'QA Testing & Bug Fixes', 'Monthly Server Hosting – recurring']),
  ),

  // ── Countries ──
  h('/invoice-generator-us', `Free Invoice Generator for US Businesses | ${siteName}`,
    hero('Invoice Generator for US Businesses', 'Create professional, compliant invoices for your US-based business or freelance practice. Supports USD currency, US date formats, and applicable sales tax structures.'),
    t('US-Specific Features', 'Our invoice generator is tailored for US businesses. It supports multiple sales tax rates (state, county, city), USD currency formatting, and standard US business information fields including EIN and W-9 details.'),
    list('Supported Tax Types', ['State sales tax (varies by state)', 'County and city sales tax where applicable', 'Use tax for out-of-state sales', 'Service tax for specific industries']),
  ),
  h('/invoice-generator-uk', `Free Invoice Generator for UK Businesses – VAT Invoices | ${siteName}`,
    hero('Invoice Generator for UK Businesses', 'Generate HMRC-compliant invoices for your UK business. Supports all VAT rates, GBP currency, and includes all required legal fields for UK invoicing.'),
    t('UK VAT Compliance', 'UK invoices must include specific information by law: your VAT registration number, a clear breakdown of VAT at the applicable rate, and the total amount including VAT. Our generator ensures all legal requirements are met.'),
    list('UK Requirements Met', ['Company name and registered address', 'VAT registration number display', 'Chronological invoice numbering', 'VAT breakdown at correct rate', 'Total including and excluding VAT']),
  ),
  h('/invoice-generator-pakistan', `Free Invoice Generator for Pakistan – PKR Invoices | ${siteName}`,
    hero('Invoice Generator for Pakistan', 'Generate professional invoices in Pakistani Rupees (PKR). Built for freelancers, small businesses, and enterprises operating in Pakistan.'),
    t('Pakistan-Specific Invoicing', 'Pakistan has specific invoicing requirements including NTN and STRN for registered businesses. Our generator includes all necessary fields for PKR invoicing.'),
    list('Pakistan Features', ['PKR currency with proper formatting', 'NTN and STRN number fields', 'Sales tax calculation', 'Filer/Non-filer tax distinction', 'Professional layout']),
  ),
  h('/invoice-generator-india', `Free Invoice Generator for India – GST Invoices | ${siteName}`,
    hero('Invoice Generator for India', 'Generate GST-compliant invoices for your Indian business. Supports all GST rates, HSN/SAC codes, and includes fields required for GST returns.'),
    t('GST Invoice Requirements', 'Indian GST invoices must include: GSTIN of supplier and recipient, invoice number and date, HSN/SAC code, taxable value, GST rate and amount (CGST + SGST/IGST), and place of supply.'),
    list('GST Features', ['CGST, SGST, and IGST calculation', 'HSN and SAC code fields', 'GSTIN of supplier and recipient', 'Place of supply entry', 'E-invoice compatible format']),
  ),
  h('/invoice-generator-canada', `Free Invoice Generator for Canada – CAD Invoices | ${siteName}`,
    hero('Invoice Generator for Canada', 'Generate CRA-compliant invoices for your Canadian business. Supports all tax types including GST, HST, PST, and QST in CAD currency.'),
    t('Canadian Tax Types', 'Canada has a complex tax structure that varies by province. Our generator supports the federal GST, provincial HST, PST, and QST. Enter your province and we handle the rest.'),
    list('Provincial Tax Support', ['GST (5%) – federal tax applicable everywhere', 'HST (13-15%) – Ontario, New Brunswick etc.', 'PST/QST – BC, Saskatchewan, Manitoba, Quebec', 'Zero-rated and exempt supplies', 'Business number (BN) fields']),
  ),

  // ── Industries ──
  h('/invoice-generator-for-freelancers', `Free Invoice Generator for Freelancers | ${siteName}`,
    hero('Invoice Generator for Freelancers', 'Designed specifically for freelancers. Track billable hours, set your rates, and send professional invoices that get you paid faster.'),
    t('Why Freelancers Love It', 'Freelancers need simple, fast invoicing. Our tool lets you create an invoice in under 60 seconds — add your client, describe your work, set your rate, and send. Supports hourly, project-based, and retainer billing.'),
    list('Freelancer Features', ['Hourly rate and project fee support', 'Recurring invoice templates for regular clients', 'Multiple currency support for international clients', 'Payment link integration (PayPal, Stripe, bank)', 'Professional invoice templates']),
  ),
  h('/invoice-generator-for-designers', `Free Invoice Generator for Designers | ${siteName}`,
    hero('Invoice Generator for Designers', 'Create stunning invoices that reflect your creative brand. Built for graphic designers, UI/UX professionals, and creative studios.'),
    t('Designer-Friendly Billing', 'Design projects often involve iterative work — concepts, revisions, final delivery. Our invoice generator lets you itemize each phase clearly.'),
    list('Design Features', ['Project-phase based billing', 'Revision and iteration tracking', 'License and usage rights notes', 'Portfolio link integration', 'Creative invoice templates']),
  ),
  h('/invoice-generator-for-developers', `Free Invoice Generator for Developers | ${siteName}`,
    hero('Invoice Generator for Developers', 'Built for software developers, engineers, and dev teams. Bill by the sprint, by the milestone, or by the hour with detailed technical descriptions.'),
    t('Developer Billing Made Simple', 'Whether you bill hourly, by project milestone, or on a monthly retainer, our generator adapts to your workflow.'),
    list('Developer Features', ['Sprint and milestone-based billing', 'Technical specification summaries', 'Monthly retainer support', 'Bug fix and maintenance tracking', 'Multiple team member support']),
  ),
  h('/invoice-generator-for-consultants', `Free Invoice Generator for Consultants | ${siteName}`,
    hero('Invoice Generator for Consultants', 'Professional invoicing for consultants. Bill by the hour, day, or engagement with detailed descriptions of your advisory services.'),
    t('Consulting Billing Flexibility', 'Consultants need flexibility — hourly for strategy sessions, daily rates for on-site work, or fixed fees for deliverables. Our generator supports all these models.'),
    list('Consultant Features', ['Hourly, daily, and project rate options', 'Expense tracking and reimbursement', 'Multiple engagement support per invoice', 'Professional executive summaries', 'Corporate branding options']),
  ),
  h('/invoice-generator-for-agencies', `Free Invoice Generator for Agencies | ${siteName}`,
    hero('Invoice Generator for Agencies', 'Built for agencies managing multiple clients and projects. Create consolidated invoices with team timesheets, project costs, and expenses.'),
    t('Agency-Grade Invoicing', 'Agencies juggle multiple clients, projects, and team members. Our invoice generator handles complex billing scenarios — retainer fees, project-based costs, and pass-through expenses.'),
    list('Agency Features', ['Multi-project consolidation on one invoice', 'Team member timesheet aggregation', 'Retainer + variable billing support', 'Pass-through expense management', 'White-label branding with agency logo']),
  ),

  // ── Features ──
  h('/invoice-generator', `Free Invoice Generator – Create Invoices Online | ${siteName}`,
    hero('Free Invoice Generator', 'Create professional invoices in seconds. No signup, no credit card — just fill in the details and download your invoice as PDF.'),
    t('How It Works', 'Enter your business information, add your client details, list the products or services you are billing for, set the tax rate, and your invoice is ready. Download as PDF or print directly.'),
    list('Features', ['Create invoices in under 60 seconds', 'Download as PDF with one click', 'No account or signup required', 'Multiple currency and tax support', 'Professional, customizable templates']),
  ),
  h('/invoice-pdf-generator', `Free Invoice PDF Generator – Download as PDF | ${siteName}`,
    hero('Invoice PDF Generator', 'Generate and download professional invoice PDFs instantly. Print-ready, shareable, and free.'),
    t('Why PDF?', 'PDF is the universal standard for invoices. It preserves your formatting perfectly, is secure from tampering, and can be opened by anyone on any device.'),
  ),
  h('/invoice-maker', `Free Invoice Maker – Design Custom Invoices | ${siteName}`,
    hero('Free Invoice Maker', 'Design and create professional invoices that match your brand. Choose from multiple templates, add your logo, and customize every detail.'),
    t('Make It Your Own', 'Your invoice is an extension of your brand. Our invoice maker lets you add your logo, choose your colors, and customize the layout.'),
  ),
  h('/tax-calculator', `Free Tax Calculator – Calculate Invoice Tax | ${siteName}`,
    hero('Free Tax Calculator', 'Calculate the correct tax for your invoices. Supports sales tax, VAT, GST, HST, and more. Just enter your amount and tax rate.'),
    list('Supported Tax Types', ['Sales Tax (US state and local)', 'VAT (UK and EU standard and reduced rates)', 'GST (Indian CGST, SGST, IGST)', 'HST (Canadian provincial harmonized tax)', 'PST and QST (Canadian provincial)']),
  ),
  h('/currency-converter', `Free Currency Converter – For International Invoices | ${siteName}`,
    hero('Free Currency Converter', 'Convert currencies for your international invoices. Get current exchange rates and create invoices in your client preferred currency.'),
    t('International Billing', 'When billing international clients, you need accurate currency conversion. Our converter supports all major currencies and shows both the converted amount and the exchange rate used.'),
  ),
  h('/invoice-number-generator', `Free Invoice Number Generator – Smart Invoice IDs | ${siteName}`,
    hero('Invoice Number Generator', 'Generate professional, sequential invoice numbers automatically. Choose from multiple formats or create your own.'),
    list('Number Formats', ['Sequential: INV-001, INV-002, INV-003', 'Date-based: 2026-07-001, 2026-07-002', 'Client-based: CLIENT-001, CLIENT-002', 'Custom format with prefixes and numbers']),
  ),
  h('/gst-invoice-generator', `Free GST Invoice Generator – GST-Compliant Invoices | ${siteName}`,
    hero('GST Invoice Generator', 'Generate GST-compliant invoices for your Indian business. Automatically calculates CGST, SGST, and IGST based on your supply type.'),
    t('GST Compliance Made Easy', 'GST invoices require specific fields — GSTIN, HSN/SAC codes, taxable value, and tax breakdown. Our generator handles all of this automatically.'),
    list('GST Features', ['Automatic CGST/SGST or IGST calculation', 'HSN and SAC code fields', 'GSTIN validation', 'Reverse charge applicability', 'E-invoice ready format']),
  ),
  h('/vat-invoice-generator', `Free VAT Invoice Generator – VAT-Compliant Invoices | ${siteName}`,
    hero('VAT Invoice Generator', 'Generate VAT-compliant invoices for UK and EU businesses. Supports all VAT rates and includes required legal fields.'),
    t('VAT Requirements', 'VAT invoices must show: your VAT registration number, the VAT rate applied, the VAT amount, and the total including VAT. Our generator ensures every VAT-required field is included.'),
    list('VAT Rates Supported', ['Standard rate (20% UK, up to 27% EU)', 'Reduced rate (5% UK, varies by EU country)', 'Zero rate (0%)', 'Exempt and reverse charge supplies']),
  ),

  // ── Blog ──
  h('/blog/how-to-create-an-invoice', `How to Create an Invoice – Step by Step Guide | ${siteName}`,
    hero('How to Create an Invoice', 'A complete step-by-step guide to creating professional invoices that get you paid on time.'),
    t('Step 1: Choose Your Format', 'First, decide how you want to create your invoice. You can use a word processor, a spreadsheet, an online invoice generator, or accounting software. For most freelancers and small businesses, an online generator offers the best balance of speed and professionalism.'),
    t('Step 2: Add Your Business Information', 'Start with your business name, address, email, and phone number. If you have a logo, include it at the top. This tells your client who the invoice is from.'),
    t('Step 3: Add Client Details', 'Include your client name, company name, and billing address. Double-check this information — sending an invoice to the wrong person delays payment.'),
    t('Step 4: Assign an Invoice Number', 'Every invoice needs a unique number for tracking. Use a simple system like INV-001, INV-002, or include the date like 2026-07-001. Never reuse invoice numbers.'),
    t('Step 5: List Your Services', 'Create a detailed table with: description of each service, quantity/hours, rate/unit price, and total. Be specific.'),
    t('Step 6: Calculate Totals', 'Add up line items for a subtotal, calculate any applicable tax, add any discounts, and show the final total due. Make the total amount prominent.'),
    t('Step 7: Set Payment Terms', 'Clearly state when payment is due (e.g., "Net 30") and list accepted payment methods with your payment details.'),
  ),
  h('/blog/what-should-an-invoice-include', `What Should an Invoice Include? – Essential Elements | ${siteName}`,
    hero("What Should an Invoice Include?", "Every professional invoice needs specific elements. Here is your complete checklist."),
    list('Required Elements', ['Header with your business name, logo, and contact information', 'Client name and billing address', 'Unique invoice number', 'Invoice date and payment due date', 'Itemized list with quantities and rates', 'Subtotal, tax, and total', 'Payment terms and accepted methods']),
    list('Optional But Recommended', ['Purchase order number', 'Project or reference number', 'Discounts applied', 'Shipping charges', 'Notes or special instructions', 'Late payment penalty terms']),
  ),
  h('/blog/invoice-vs-receipt', `Invoice vs Receipt – What's the Difference? | ${siteName}`,
    hero("Invoice vs Receipt: What's the Difference?", "Invoices and receipts serve different purposes in a business transaction."),
    t('Invoice: A Request for Payment', 'An invoice is a document you send to a client requesting payment. It is sent before payment is made and includes payment terms, due date, and payment instructions.'),
    t('Receipt: Proof of Payment', 'A receipt is a document you provide after payment has been received. It confirms the transaction is complete and serves as proof of payment.'),
    table('Key Differences', ['Aspect', 'Invoice', 'Receipt'], [['Purpose', 'Request payment', 'Confirm payment'], ['Timing', 'Sent before payment', 'Provided after payment'], ['Key Info', 'Payment terms, due date', 'Payment confirmation'], ['Legal Role', 'Contractual obligation', 'Proof of transaction']]),
  ),
  h('/blog/invoice-number-best-practices', `Invoice Number Best Practices – Smart Numbering | ${siteName}`,
    hero('Invoice Number Best Practices', 'A good invoice numbering system keeps your finances organized and looks professional to clients.'),
    t('Why Invoice Numbers Matter', 'Invoice numbers are unique identifiers that help you track payments, manage accounting, and reference specific transactions.'),
    list('Popular Systems', ['Sequential: INV-001, INV-002', 'Date-based: 2026-07-001, 2026-07-002', 'Client-based: ABD-001, ABD-002', 'Project-based: PROJ-001, PROJ-002']),
  ),
  h('/blog/when-should-you-send-an-invoice', `When Should You Send an Invoice? – Timing Guide | ${siteName}`,
    hero('When Should You Send an Invoice?', 'Timing matters. Send your invoices at the right moment to get paid faster.'),
    t('Immediately After Delivery', 'The best practice is to send your invoice immediately after completing the work. Your work is fresh in the client mind, making them more likely to pay promptly.'),
    t('Milestone Billing', 'For large projects, break the work into milestones and invoice after each milestone. This improves cash flow and reduces risk.'),
    t('Recurring Invoices', 'For ongoing services like monthly retainer, send invoices on a regular schedule. Set up recurring invoices to save time.'),
  ),
  h('/blog/how-to-accept-online-payments', `How to Accept Online Payments – Guide | ${siteName}`,
    hero('How to Accept Online Payments', 'Make it easy for your clients to pay you online. A guide to the best payment methods.'),
    list('Popular Payment Methods', ['PayPal – Widely used, buyer protection', 'Stripe – Credit card processing', 'Bank Transfer – No fees', 'Venmo/Zelle – Quick and free', 'Wise – Best for international payments']),
    t('Which Method?', 'For domestic clients, offer bank transfer and at least one digital payment option. For international clients, use Wise or PayPal. Include payment links directly in your invoice.'),
  ),
  h('/blog/how-to-calculate-invoice-tax', `How to Calculate Invoice Tax – Sales Tax, VAT & GST | ${siteName}`,
    hero('How to Calculate Invoice Tax', 'A comprehensive guide to calculating taxes on your invoices with examples for different tax systems.'),
    t('The Basic Formula', 'Tax Amount = Subtotal × Tax Rate. For example, if your subtotal is $1,000 and the tax rate is 10%, the tax amount is $100 and the total is $1,100.'),
    table('Tax Examples', ['Tax System', 'Subtotal', 'Rate', 'Tax', 'Total'], [['US Sales Tax', '$500', '8%', '$40', '$540'], ['UK VAT', '£500', '20%', '£100', '£600'], ['Indian GST', '₹10,000', '18%', '₹1,800', '₹11,800'], ['Canadian HST', 'CAD 500', '13%', 'CAD 65', 'CAD 565']]),
  ),
  h('/blog/how-to-write-payment-terms', `How to Write Payment Terms – Invoice Guide | ${siteName}`,
    hero('How to Write Payment Terms', 'Clear payment terms prevent confusion and late payments.'),
    list('Common Payment Terms', ['Due on Receipt – Payment expected immediately', 'Net 15 – Full payment due within 15 days', 'Net 30 – Full payment due within 30 days', 'Net 60 – Full payment due within 60 days', '50% Upfront + 50% on Completion']),
    t('Best Practices', 'Always include the specific due date, list accepted payment methods, and consider adding a small late fee (e.g., 2% per month) to encourage on-time payment.'),
  ),
  h('/blog/late-payment-fee-guide', `Late Payment Fee Guide – How to Charge Late Fees | ${siteName}`,
    hero('Late Payment Fee Guide', 'How to charge late fees fairly and legally to encourage on-time payment.'),
    t('Setting Late Fee Terms', 'Include your late fee policy in your initial contract. A common structure is 1.5% per month (18% APR) or a flat fee of $25-50 after 10 days past due.'),
    list('Late Fee Strategies', ['Percentage-based: 1-2% per month', 'Flat fee: $25-50 per late invoice', 'Tiered: Small fee initially, higher later', 'Interest: Apply statutory interest rate']),
  ),
  h('/blog/freelance-invoice-guide', `Freelance Invoice Guide – Complete Invoicing for Freelancers | ${siteName}`,
    hero('Freelance Invoice Guide', 'Everything you need to know about invoicing as a freelancer. From your first invoice to getting paid consistently.'),
    t('Why Invoicing Matters', 'As a freelancer, your invoice is often the only formal document your client sees. A professional invoice builds trust and reduces payment delays.'),
    list('Best Practices', ['Invoice immediately after work is completed', 'Use a consistent numbering system', 'Include clear payment terms and due dates', 'Offer multiple payment methods', 'Follow up on overdue invoices promptly', 'Keep records for tax purposes']),
  ),

  // ── Legal ──
  h('/privacy-policy', `Privacy Policy | ${siteName}`,
    hero('Privacy Policy', 'Last updated: July 2026'),
    t('Introduction', 'This Privacy Policy explains how we collect, use, and protect your information when you use this invoice generator website.'),
    t('Information We Collect', 'We collect information you provide directly when using the invoice generator. We also collect technical data automatically, including your IP address, browser type, and usage data via Google Analytics and Google AdSense.'),
    t('How We Use Your Information', 'Your information is used to improve the website, analyze traffic, and serve relevant advertisements. We do not sell your personal information to third parties.'),
    t('Cookies', 'This website uses cookies. Google Analytics uses cookies to analyze usage, and Google AdSense uses cookies to serve personalized ads. You can control cookies through your browser settings.'),
    t('Third-Party Services', 'We use Google Analytics, Google AdSense, and other standard web services. Each has its own privacy policy.'),
    t('Contact', 'For questions about this policy, contact us through the portfolio website at mabdullah.top.'),
  ),
  h('/terms-of-service', `Terms of Service | ${siteName}`,
    hero('Terms of Service', 'Last updated: July 2026'),
    t('Acceptance of Terms', 'By using this invoice generator, you agree to these Terms of Service. If you do not agree, do not use this service.'),
    t('Use of Service', 'This tool is provided for creating professional invoices. You agree to use it only for lawful purposes.'),
    t('Disclaimer', 'The invoice generator is provided "as is" without warranty. You are responsible for ensuring your invoices comply with applicable laws.'),
    t('Limitation of Liability', 'We shall not be liable for any damages arising from the use of this website or its services.'),
  ),
  h('/cookie-policy', `Cookie Policy | ${siteName}`,
    hero('Cookie Policy', 'Last updated: July 2026'),
    t('What Are Cookies', 'Cookies are small text files stored on your device by your web browser. They help websites remember preferences and analyze usage.'),
    t('Cookies We Use', 'We use essential cookies for basic functionality, analytics cookies (Google Analytics), and advertising cookies (Google AdSense).'),
    list('How to Control Cookies', ['Chrome: Settings → Privacy and Security', 'Firefox: Options → Privacy & Security', 'Safari: Preferences → Privacy', 'Edge: Settings → Cookies']),
  ),
  h('/disclaimer', `Disclaimer | ${siteName}`,
    hero('Disclaimer', 'Last updated: July 2026'),
    t('General Information', 'The information on this website is for general informational purposes only. We make no warranties about completeness or accuracy.'),
    t('Professional Advice', 'Content on this website, including invoice templates and tax information, is not a substitute for professional advice.'),
    t('External Links', 'This website may contain links to external sites. We accept no responsibility for their content.'),
  ),
  h('/dmca', `DMCA Notice & Takedown Policy | ${siteName}`,
    hero('DMCA Notice & Takedown Policy', 'Last updated: July 2026'),
    t('Copyright Compliance', 'We respect intellectual property rights and respond to DMCA notices promptly.'),
    t('Submitting a Notice', 'Send notices including identification of the copyrighted work, infringing material, your contact information, and a statement of good faith belief to the contact email on our portfolio site.'),
  ),

  // ── Misc ──
  h('/faq', `FAQ – Invoice Generator Questions | ${siteName}`,
    hero('Frequently Asked Questions', 'Answers to common questions about the invoice generator.'),
    t('Is it really free?', 'Yes, completely free. No hidden charges, no credit card required, no account needed. Create and download as many invoices as you want.'),
    t('Do I need an account?', 'No account or signup is required. You can start creating invoices immediately.'),
    t('Can I download as PDF?', 'Yes, every invoice can be downloaded as a professional PDF with a single click.'),
    t('What currencies are supported?', 'We support USD, EUR, GBP, PKR, INR, CAD, AUD, and many more.'),
    t('Do you support VAT/GST?', 'Yes, we support VAT for UK/EU and GST for India with automatic calculations.'),
  ),
  h('/about', `About – Free Invoice Generator | ${siteName}`,
    hero('About This Invoice Generator', 'A free, open-source invoice generator built to help freelancers and small businesses create professional invoices quickly.'),
    t('Why We Built This', 'We believe invoicing should be free and accessible to everyone. No subscriptions, no hidden fees, no account required. Just fill in the details and download.'),
    t('Open Source', 'This project is open source and available on GitHub. Contributions, feedback, and feature requests are welcome.'),
  ),
  h('/contact', `Contact – Free Invoice Generator | ${siteName}`,
    hero('Contact', 'Have questions, feedback, or suggestions? We would love to hear from you.'),
    t('Get in Touch', 'Reach out through the contact form on the portfolio website at mabdullah.top, or connect on LinkedIn and GitHub.'),
  ),
];

export const seoPageMap = new Map<string, PageData>();
for (const page of seoPages) {
  seoPageMap.set(page.path, page);
}

export function getPageBySlug(slug: string[]): PageData | undefined {
  const path = '/' + slug.join('/');
  return seoPageMap.get(path);
}
