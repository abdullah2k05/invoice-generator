import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void }
> = ({ invoiceNumber, issueDate, dueDate, onClick }) => (
  <div
    className="border-b border-gray-200 py-2 md:py-4 px-4 md:px-10 grid grid-cols-2 group cursor-pointer relative"
    onClick={() => onClick && onClick("5")}
  >
    {!!onClick && (
      <>
        <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
        <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
        <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
        <ChevronDown className="animate-pulse w-4 h-4 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
      </>
    )}
    <div>
      <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
        Invoice NO
      </p>
      <p className="font-semibold text-xs md:text-xs text-gray-800">{invoiceNumber || <span className="text-neutral-300 italic">&mdash;</span>}</p>
    </div>
    <div className="flex items-center justify-between pl-4 md:pl-10">
      <div>
        <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
          Issued
        </p>
        <p className="font-semibold text-xs md:text-xs text-gray-800">
          {issueDate ? format(issueDate, "do MMM yyyy'") : <span className="text-neutral-300 italic">&mdash;</span>}
        </p>
      </div>
      <div>
        <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase tracking-wider text-right">
          Due Date
        </p>
        <p className="font-semibold text-xs md:text-xs text-gray-800">
          {dueDate ? format(dueDate, "do MMM yyyy'") : <span className="text-neutral-300 italic">&mdash;</span>}
        </p>
      </div>
    </div>
  </div>
);
