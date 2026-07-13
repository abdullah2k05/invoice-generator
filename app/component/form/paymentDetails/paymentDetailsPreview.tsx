import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";

export const PaymentDetailsPreview: React.FC<
  PaymentDetails & { onClick?: (step: string) => void; showPayableIn?: boolean }
> = ({
  bankName,
  accountNumber,
  accountName,
  routingCode,
  swiftCode,
  ifscCode,
  currency = "USD",
  onClick,
  showPayableIn = true,
}) => {
  const currencyDetails = currencyList.find(
    (currencyDetails) =>
      currencyDetails.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  const hasBankDetails = bankName || accountNumber || accountName || swiftCode || routingCode || ifscCode;

  return (
    <div
      className="grid grid-cols-2 group cursor-pointer relative border-t border-gray-200"
      onClick={() => onClick && onClick("4")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 text-[#4F46E5] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}
      {hasBankDetails && (
        <div className="py-3 md:py-4 pl-4 md:pl-10 pr-2 md:pr-3">
          <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase tracking-wider mb-2 md:mb-3">
            Bank Details
          </p>
          <div className="space-y-1">
            {bankName && (
              <div className="grid grid-cols-2 items-center gap-1">
                <p className="truncate text-xs font-medium text-gray-500">Bank Name</p>
                <p className="flex truncate text-xs font-semibold text-gray-800">{bankName}</p>
              </div>
            )}
            {accountNumber && (
              <div className="grid grid-cols-2 items-center gap-1">
                <p className="truncate text-xs font-medium text-gray-500">Account Number</p>
                <p className="flex truncate text-xs font-semibold text-gray-800">{accountNumber}</p>
              </div>
            )}
            {accountName && (
              <div className="grid grid-cols-2 items-center gap-1">
                <p className="truncate text-xs font-medium text-gray-500">Account Name</p>
                <p className="flex truncate text-xs font-semibold text-gray-800">{accountName}</p>
              </div>
            )}
            {swiftCode && (
              <div className="grid grid-cols-2 items-center gap-1">
                <p className="truncate text-xs font-medium text-gray-500">Swift Code</p>
                <p className="flex truncate text-xs font-semibold text-gray-800">{swiftCode}</p>
              </div>
            )}
            {routingCode && (
              <div className="grid grid-cols-2 items-center gap-1">
                <p className="truncate text-xs font-medium text-gray-500">Routing Code</p>
                <p className="flex truncate text-xs font-semibold text-gray-800">{routingCode}</p>
              </div>
            )}
            {ifscCode && (
              <div className="grid grid-cols-2 items-center gap-1">
                <p className="truncate text-xs font-medium text-gray-500">IFSC Code</p>
                <p className="flex truncate text-xs font-semibold text-gray-800">{ifscCode}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {showPayableIn && (
        <div className={`py-3 md:py-4 ${hasBankDetails ? "px-4 md:px-10" : "col-span-2 px-4 md:px-10"}`}>
          <p className="text-xs md:text-[11px] text-neutral-400 font-semibold uppercase tracking-wider mb-2 md:mb-3">
            Payable in
          </p>
          {currencyDetails && (
            <div className="flex gap-2 justify-between items-center w-full">
              <div className="flex gap-2 md:gap-3 items-center">
                <currencyDetails.icon className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                <div>
                  <p className="font-medium text-xs md:text-sm text-gray-800">
                    {currencyDetails.currencyName}
                  </p>
                  <p className="text-[10px] md:text-xs text-neutral-400">
                    {currencyDetails.currencySymbol}{" "}
                    {currencyDetails.currencyShortForm}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
