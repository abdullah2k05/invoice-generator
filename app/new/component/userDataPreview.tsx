"use client";
import { PreviewDetails } from "@/app/component/form/previewDetails";
import { useData } from "@/app/hooks/useData";
import { useFormContext } from "react-hook-form";
import { pdfTemplates, defaultTemplateId } from "@/lib/pdfTemplates";

export const UserDataPreview = ({
  onSectionChange,
}: {
  onSectionChange?: (step: string) => void;
}) => {
  const { watch } = useFormContext();
  const templateId = watch("invoiceTemplate", defaultTemplateId);
  const template = pdfTemplates.find((t) => t.id === templateId) || pdfTemplates[0];

  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
    showPayableIn,
  } = useData();

  const onClick = (step: string) => {
    onSectionChange?.(step);
  };

  return (
    <PreviewDetails
      onClick={onClick}
      companyDetails={companyDetails}
      invoiceDetails={invoiceDetails}
      invoiceTerms={invoiceTerms}
      paymentDetails={paymentDetails}
      yourDetails={yourDetails}
      showPayableIn={showPayableIn}
      templateColors={{
        title: template.colors.title,
        accent: template.colors.accent,
        border: template.colors.border,
        borderStyle: template.borderStyle,
      }}
    />
  );
};
