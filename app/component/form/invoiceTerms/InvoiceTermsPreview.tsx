import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import type { PdfTemplate } from "@/lib/pdfTemplates";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void; template?: PdfTemplate }
> = ({ invoiceNumber, issueDate, dueDate, onClick, template }) => {
  const tc = template?.colors;
  const isEditorial = template?.id === "editorial";
  const isSwiss = template?.id === "swiss";
  const isStripe = template?.id === "stripe";

  const headerStyle: React.CSSProperties = {
    color: tc?.title || "#a1a1aa",
    fontSize: template?.fontSizes.title ?? 10,
    fontFamily: isEditorial ? "Georgia, serif" : undefined,
    fontStyle: isEditorial ? "italic" : undefined,
    letterSpacing: isSwiss ? "-0.02em" : undefined,
    fontWeight: isSwiss ? 800 : 600,
    textTransform: isSwiss ? "uppercase" : "uppercase",
  };

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
