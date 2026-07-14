import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void; templateColors?: { title?: string; accent?: string; border?: string; borderStyle?: string } }
> = ({ invoiceNumber, issueDate, dueDate, onClick, templateColors }) => { const tc = templateColors; return (
  <div
    className="py-2 md:py-4 px-4 md:px-10 grid grid-cols-2 group cursor-pointer relative"
    onClick={() => onClick && onClick("5")}
    style={{ borderBottom: `1px ${tc?.borderStyle || "solid"} ${tc?.border || "#e5e7eb"}` }}
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
      <p className="text-xs md:text-[11px] font-semibold uppercase tracking-wider" style={{ color: tc?.title || "#a3a3a3" }}>
        Invoice NO
      </p>
      <p className="font-semibold text-xs md:text-xs text-gray-800">{invoiceNumber || <span className="text-neutral-300 italic">&mdash;</span>}</p>
    </div>
    <div className="flex items-center justify-between pl-4 md:pl-10">
      <div>
        <p className="text-xs md:text-[11px] font-semibold uppercase tracking-wider" style={{ color: tc?.title || "#a3a3a3" }}>
          Issued
        </p>
        <p className="font-semibold text-xs md:text-xs text-gray-800">
          {issueDate ? format(issueDate, "do MMM yyyy'") : <span className="text-neutral-300 italic">&mdash;</span>}
        </p>
      </div>
      <div>
        <p className="text-xs md:text-[11px] font-semibold uppercase tracking-wider text-right" style={{ color: tc?.title || "#a3a3a3" }}>
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
