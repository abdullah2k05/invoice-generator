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

export interface PdfTemplate {
  id: string;
  name: string;
  description: string;
  colors: TemplateColors;
  borderStyle: "dashed" | "solid" | "double" | "none";
  showSectionBorders: boolean;
  showRowBorders: boolean;
}

export const pdfTemplates: PdfTemplate[] = [
  {
    id: "classic",
    name: "Classic Professional",
    description: "Clean, professional layout with dashed borders",
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
  },
  {
    id: "minimalist",
    name: "Stripe Minimalist",
    description: "Clean, minimal design with blue accent",
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
  },
  {
    id: "editorial",
    name: "Editorial Agency",
    description: "Bold, creative layout for agencies",
    colors: {
      title: "#dc2626",
      subtitle: "#111827",
      description: "#6b7280",
      itemDescription: "#374151",
      amount: "#dc2626",
      paymentTitle: "#6b7280",
      border: "#d1d5db",
      accent: "#dc2626",
    },
    borderStyle: "solid",
    showSectionBorders: true,
    showRowBorders: true,
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
  },
  {
    id: "swiss",
    name: "Swiss Neo-Grid",
    description: "Modern grid-based design with geometric feel",
    colors: {
      title: "#0ea5e9",
      subtitle: "#0f172a",
      description: "#475569",
      itemDescription: "#1e293b",
      amount: "#0f172a",
      paymentTitle: "#475569",
      border: "#e2e8f0",
      accent: "#0ea5e9",
    },
    borderStyle: "double",
    showSectionBorders: true,
    showRowBorders: true,
  },
];

export const defaultTemplateId = "classic";

export function getDefaultTemplate(): PdfTemplate {
  return pdfTemplates[0];
}
