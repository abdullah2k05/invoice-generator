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
  secondary?: string;
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
  sectionHeaderStyle: "uppercase-muted" | "serif-italic" | "minimal-badge";
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
  hasLeftAccentBar: boolean;
  hasSolidHeaderBand: boolean;
  useDashedDividers: boolean;
  hasCompactLayout: boolean;
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
    hasLeftAccentBar: false,
    hasSolidHeaderBand: false,
    useDashedDividers: false,
    hasCompactLayout: false,
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
    hasLeftAccentBar: false,
    hasSolidHeaderBand: false,
    useDashedDividers: false,
    hasCompactLayout: false,
    themeClass: "theme-editorial",
  },
  {
    id: "executive",
    name: "The Modern Executive",
    description: "High-trust corporate with deep indigo accent bar",
    colors: {
      title: "#94a3b8",
      subtitle: "#0f172a",
      description: "#475569",
      itemDescription: "#334155",
      amount: "#312e81",
      paymentTitle: "#64748b",
      border: "#e0e7ff",
      accent: "#312e81",
      bg: "#ffffff",
      secondary: "#e0e7ff",
    },
    borderStyle: "solid",
    showSectionBorders: true,
    showRowBorders: true,
    sectionHeaderStyle: "uppercase-muted",
    fontSizes: {
      title: 10,
      subtitle: 12,
      sectionHeader: 10,
      itemText: 11,
      amount: 16,
    },
    layout: {
      sectionPadding: 16,
      headerPadding: 20,
      itemRowPadding: 12,
    },
    hasDarkTotalBlock: false,
    hasLeftAccentBar: true,
    hasSolidHeaderBand: true,
    useDashedDividers: false,
    hasCompactLayout: false,
    themeClass: "theme-executive",
  },
  {
    id: "tokyo",
    name: "The Tokyo Indie",
    description: "Hyper-modern, warm sand, neon orange dashes",
    colors: {
      title: "#78716c",
      subtitle: "#1c1917",
      description: "#57534e",
      itemDescription: "#292524",
      amount: "#1c1917",
      paymentTitle: "#57534e",
      border: "#e7e5e4",
      accent: "#ea580c",
      bg: "#fafaf9",
      secondary: "#ffedd5",
    },
    borderStyle: "dashed",
    showSectionBorders: false,
    showRowBorders: true,
    sectionHeaderStyle: "minimal-badge",
    fontSizes: {
      title: 10,
      subtitle: 13,
      sectionHeader: 10,
      itemText: 12,
      amount: 17,
    },
    layout: {
      sectionPadding: 20,
      headerPadding: 24,
      itemRowPadding: 14,
    },
    hasDarkTotalBlock: false,
    hasLeftAccentBar: false,
    hasSolidHeaderBand: false,
    useDashedDividers: true,
    hasCompactLayout: true,
    themeClass: "theme-tokyo",
  },
];

export const defaultTemplateId = "stripe";
