export interface TemplateColors {
  title: string;
  subtitle: string;
  description: string;
  itemDescription: string;
  amount: string;
  paymentTitle: string;
  border: string;
  accent: string;
  background?: string;
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
  sectionHeaderStyle: "underlined" | "accent-left-bar" | "background-block";
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
}

export const pdfTemplates: PdfTemplate[] = [
  {
    id: "classic",
    name: "Classic Professional",
    description: "Clean, professional layout with dashed gray borders",
    colors: {
      title: "#9ca3af",
      subtitle: "#111827",
      description: "rgb(115 115 115 / 0.9)",
      itemDescription: "#4b5563",
      amount: "#111827",
      paymentTitle: "#6b7280",
      border: "#e5e7eb",
      accent: "#9ca3af",
    },
    borderStyle: "dashed",
    showSectionBorders: true,
    showRowBorders: true,
    sectionHeaderStyle: "underlined",
    headerAccent: "none",
    fontSizes: {
      title: 11,
      subtitle: 12,
      sectionHeader: 11,
      itemText: 12,
      amount: 16,
    },
    layout: {
      sectionPadding: 16,
      headerPadding: 20,
      itemRowPadding: 14,
    },
  },
  {
    id: "minimalist",
    name: "Stripe Minimalist",
    description: "Clean design with blue accent left bars",
    colors: {
      title: "#635bff",
      subtitle: "#1a1a2e",
      description: "#64748b",
      itemDescription: "#334155",
      amount: "#1a1a2e",
      paymentTitle: "#64748b",
      border: "#e2e8f0",
      accent: "#635bff",
    },
    borderStyle: "solid",
    showSectionBorders: false,
    showRowBorders: true,
    sectionHeaderStyle: "accent-left-bar",
    headerAccent: "none",
    fontSizes: {
      title: 10,
      subtitle: 13,
      sectionHeader: 12,
      itemText: 11,
      amount: 17,
    },
    layout: {
      sectionPadding: 20,
      headerPadding: 24,
      itemRowPadding: 12,
    },
  },
  {
    id: "editorial",
    name: "Editorial Agency",
    description: "Bold, creative layout with red accent bar",
    colors: {
      title: "#ffffff",
      subtitle: "#111827",
      description: "#6b7280",
      itemDescription: "#374151",
      amount: "#dc2626",
      paymentTitle: "#6b7280",
      border: "#e5e7eb",
      accent: "#dc2626",
    },
    borderStyle: "solid",
    showSectionBorders: true,
    showRowBorders: true,
    sectionHeaderStyle: "background-block",
    headerAccent: "top-bar",
    fontSizes: {
      title: 10,
      subtitle: 13,
      sectionHeader: 10,
      itemText: 12,
      amount: 18,
    },
    layout: {
      sectionPadding: 16,
      headerPadding: 16,
      itemRowPadding: 14,
    },
  },
  {
    id: "corporate",
    name: "Modern Corporate",
    description: "Full-width header blocks with blue tones",
    colors: {
      title: "#2563eb",
      subtitle: "#0f172a",
      description: "#475569",
      itemDescription: "#1e293b",
      amount: "#0f172a",
      paymentTitle: "#475569",
      border: "#cbd5e1",
      accent: "#2563eb",
    },
    borderStyle: "solid",
    showSectionBorders: true,
    showRowBorders: true,
    sectionHeaderStyle: "underlined",
    headerAccent: "full-background",
    fontSizes: {
      title: 12,
      subtitle: 12,
      sectionHeader: 12,
      itemText: 12,
      amount: 16,
    },
    layout: {
      sectionPadding: 18,
      headerPadding: 22,
      itemRowPadding: 14,
    },
  },
  {
    id: "swiss",
    name: "Swiss Neo-Grid",
    description: "Modern grid with geometric double borders",
    colors: {
      title: "#0ea5e9",
      subtitle: "#0f172a",
      description: "#475569",
      itemDescription: "#1e293b",
      amount: "#0f172a",
      paymentTitle: "#475569",
      border: "#0ea5e9",
      accent: "#0ea5e9",
    },
    borderStyle: "double",
    showSectionBorders: true,
    showRowBorders: true,
    sectionHeaderStyle: "accent-left-bar",
    headerAccent: "none",
    fontSizes: {
      title: 11,
      subtitle: 13,
      sectionHeader: 12,
      itemText: 11,
      amount: 17,
    },
    layout: {
      sectionPadding: 20,
      headerPadding: 24,
      itemRowPadding: 16,
    },
  },
];

export const defaultTemplateId = "classic";
