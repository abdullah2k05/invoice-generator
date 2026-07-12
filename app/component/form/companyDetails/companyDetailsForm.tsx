import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";

export const CompanyDetailsForm = () => (
  <div className="pt-6 md:pt-24">
    <p className="text-xl md:text-2xl font-semibold pb-3">Company Details (To)</p>
    <CustomTextInput
      label="Email"
      placeholder="e.g. info@company.pk"
      variableName="email"
    />
    <p className="pb-6 md:pb-10 pt-3 text-xs font-medium text-neutral-500">
      We&apos;ll fill the billing details automatically if we find the company.
    </p>
    <p className="pb-2 text-sm font-medium text-neutral-500">Billing details</p>
    <CustomTextInput
      label="Company name"
      placeholder="TechSol Pakistan"
      variableName="companyName"
    />
    <ImageInput label="Logo" variableName="companyLogo" />
    <CustomTextInput
      label="Address"
      placeholder="Plot 12, Main Boulevard"
      variableName="companyAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Karachi"
      variableName="companyCity"
    />
    <CustomTextInput
      label="State"
      placeholder="Sindh"
      variableName="companyState"
    />
    <CustomNumberInput
      label="Zip"
      placeholder="54000"
      variableName="companyZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="Pakistan"
      variableName="companyCountry"
    />
    <CustomTextInput
      label="Tax ID"
      placeholder="NTN 1234567"
      variableName="companyTaxId"
    />
  </div>
);
