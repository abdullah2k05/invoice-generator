export interface TemplateColors {
  title: string;
  subtitle: string;
  description: string;
  itemDescription: string;
  amount: string;
  paymentTitle: string;
  border: string;
  accent: string;
  bg?: string;
  totalBlockBg?: string;
  totalBlockText?: string;
}

export type BorderStyle = "none" | "solid" | "dashed" | "double";

export interface PdfTemplate {
  id: string;
  name: string;
  description: string;
  colors: TemplateColors;
  borderStyle: BorderStyle;
  showSectionBorders: boolean;
  showRowBorders: boolean;
  sectionHeaderStyle: "uppercase-muted" | "serif-italic" | "bold-condensed";
  headerAccent: "none" | "top-bar" | "full-background";
  fontSizes: {
    title: number;
    subtitle: number;
    sectionHeader: number;
    itemText: number;
    amount: number;
  };
  layout: {
    sectionPadding: number;
    headerPadding: number;
    itemRowPadding: number;
  };
  hasDarkTotalBlock: boolean;
  hasDoubleBorderFrame: boolean;
  showVerticalGridLines: boolean;
  numberFontFamily: "Geist" | "Courier";
  themeClass: string;
}

export const pdfTemplates: PdfTemplate[] = [
  {
    id: "stripe",
    name: "Stripe Minimalist",
    description: "Ultra-clean, developer-first, SaaS style",
    colors: {
      title: "#a1a1aa",
      subtitle: "#09090b",
      description: "#71717a",
      itemDescription: "#3f3f46",
      amount: "#09090b",
      paymentTitle: "#71717a",
      border: "#f4f4f5",
      accent: "#10b981",
    },
    borderStyle: "solid",
    showSectionBorders: false,
    showRowBorders: true,
    sectionHeaderStyle: "uppercase-muted",
    headerAccent: "none",
    fontSizes: {
      title: 10,
      subtitle: 13,
      sectionHeader: 10,
      itemText: 11,
      amount: 16,
    },
    layout: {
      sectionPadding: 24,
      headerPadding: 28,
      itemRowPadding: 12,
    },
    hasDarkTotalBlock: false,
    hasDoubleBorderFrame: false,
    showVerticalGridLines: false,
    numberFontFamily: "Courier",
    themeClass: "theme-stripe",
  },
  {
    id: "editorial",
    name: "Editorial Agency",
    description: "Elegant, high-ticket consulting, warm tones",
    colors: {
      title: "#71717a",
      subtitle: "#18181b",
      description: "#52525b",
      itemDescription: "#3f3f46",
      amount: "#18181b",
      paymentTitle: "#52525b",
      border: "#e4e4e7",
      accent: "#09090b",
      bg: "#faf9f6",
      totalBlockBg: "#09090b",
      totalBlockText: "#ffffff",
    },
    borderStyle: "solid",
    showSectionBorders: false,
    showRowBorders: false,
    sectionHeaderStyle: "serif-italic",
    headerAccent: "none",
    fontSizes: {
      title: 11,
      subtitle: 14,
      sectionHeader: 12,
      itemText: 12,
      amount: 18,
    },
    layout: {
      sectionPadding: 20,
      headerPadding: 24,
      itemRowPadding: 14,
    },
    hasDarkTotalBlock: true,
    hasDoubleBorderFrame: false,
    showVerticalGridLines: false,
    numberFontFamily: "Geist",
    themeClass: "theme-editorial",
  },
  {
    id: "swiss",
    name: "Swiss Neo-Grid",
    description: "Architectural, geometric, precision B2B",
    colors: {
      title: "#a1a1aa",
      subtitle: "#09090b",
      description: "#52525b",
      itemDescription: "#27272a",
      amount: "#09090b",
      paymentTitle: "#52525b",
      border: "#09090b",
      accent: "#000000",
    },
    borderStyle: "solid",
    showSectionBorders: true,
    showRowBorders: true,
    sectionHeaderStyle: "bold-condensed",
    headerAccent: "none",
    fontSizes: {
      title: 11,
      subtitle: 13,
      sectionHeader: 11,
      itemText: 11,
      amount: 17,
    },
    layout: {
      sectionPadding: 20,
      headerPadding: 24,
      itemRowPadding: 14,
    },
    hasDarkTotalBlock: false,
    hasDoubleBorderFrame: true,
    showVerticalGridLines: true,
    numberFontFamily: "Courier",
    themeClass: "theme-swiss",
  },
];

export const defaultTemplateId = "stripe";
