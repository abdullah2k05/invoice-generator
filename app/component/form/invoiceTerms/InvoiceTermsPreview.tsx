import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void; template?: PdfTemplate }
> = ({ invoiceNumber, issueDate, dueDate, onClick, template }) => {
  const tc = template?.colors;
  const isEditorial = template?.id === "editorial";
  const isExecutive = template?.id === "executive";
  const isTokyo = template?.id === "tokyo";

  const headerStyle: React.CSSProperties = {
    color: tc?.title || "#a1a1aa",
    fontSize: template?.fontSizes.title ?? 10,
    fontFamily: isEditorial ? "Georgia, serif" : undefined,
    fontStyle: isEditorial ? "italic" : undefined,
    letterSpacing: "0.05em",
    fontWeight: 600,
    textTransform: "uppercase",
  };

  const borderColor = tc?.border || "#e4e4e7";

  if (isExecutive) {
    return (
      <div
        className="py-3 px-4 md:py-5 md:px-10 grid grid-cols-2 group cursor-pointer relative"
        onClick={() => onClick && onClick("5")}
        style={{ borderBottom: `1px solid ${tc?.secondary || "#e0e7ff"}` }}
      >
        {!!onClick && (
          <>
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
          </>
        )}
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: tc?.accent || "#312e81",
            }}
            className="truncate"
          >
            {invoiceNumber || "Executive Advisory Group"}
          </h2>
          <p
            style={{
              fontSize: "11px",
              color: tc?.description || "#64748b",
              marginTop: 4,
            }}
          >
            INV-{invoiceNumber || "001"}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: tc?.subtitle || "#0f172a",
            }}
          >
            Invoice
          </h1>
          <p
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "12px",
              color: tc?.description || "#64748b",
              marginTop: 4,
            }}
          >
            {issueDate
              ? format(issueDate, "do MMM yyyy")
              : "—"}
          </p>
        </div>
      </div>
    );
  }

  if (isTokyo) {
    return (
      <div
        className="py-3 px-4 md:py-5 md:px-10 group cursor-pointer relative"
        onClick={() => onClick && onClick("5")}
      >
        {!!onClick && (
          <>
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
            <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                marginTop: 12,
                color: tc?.subtitle || "#1c1917",
              }}
            >
              {invoiceNumber || "Tokyo Digital Lab"}
            </h1>
            <p
              style={{
                fontSize: 12,
                color: "#57534e",
              }}
            >
              INV-{invoiceNumber || "001"}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#78716c",
              }}
            >
              INVOICE ID
            </p>
            <p
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 13,
                fontWeight: 700,
                color: tc?.subtitle || "#1c1917",
              }}
            >
              {invoiceNumber || "—"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="py-2 md:py-4 px-4 md:px-10 grid grid-cols-2 group cursor-pointer relative"
      onClick={() => onClick && onClick("5")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}
      <div>
        <p style={headerStyle} className="text-xs md:text-[11px] font-semibold uppercase tracking-wider">
          Invoice NO
        </p>
        <p className="font-semibold text-xs md:text-xs text-gray-800">{invoiceNumber || <span className="text-neutral-300 italic">&mdash;</span>}</p>
      </div>
      <div className="flex items-center justify-between pl-4 md:pl-10">
        <div>
          <p style={headerStyle} className="text-xs md:text-[11px] font-semibold uppercase tracking-wider">
            Issued
          </p>
          <p className="font-semibold text-xs md:text-xs text-gray-800">
            {issueDate ? format(issueDate, "do MMM yyyy'") : <span className="text-neutral-300 italic">&mdash;</span>}
          </p>
        </div>
        <div>
          <p style={headerStyle} className="text-xs md:text-[11px] font-semibold uppercase tracking-wider text-right">
            Due Date
          </p>
          <p className="font-semibold text-xs md:text-xs text-gray-800">
            {dueDate ? format(dueDate, "do MMM yyyy'") : <span className="text-neutral-300 italic">&mdash;</span>}
          </p>
        </div>
      </div>
    </div>
  );
};
