import { Users } from "lucide-react";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";
import { SavedClientsPanel } from "@/app/component/ui/SavedClientsPanel";
import { useFormContext } from "react-hook-form";
import { useCallback, type FC } from "react";
import { saveClient, type SavedClient } from "@/lib/localData";

export const CompanyDetailsForm: FC<{ compact?: boolean }> = ({ compact }) => {
  const { setValue, watch } = useFormContext();

  const handleSelectClient = useCallback((c: SavedClient) => {
    const set = (key: string, val: string) => {
      setValue(key, val);
      localStorage.setItem(key, val);
    };
    set("companyName", c.companyName);
    set("email", c.email);
    set("companyAddress", c.address);
    set("companyCity", c.city);
    set("companyState", c.state);
    set("companyCountry", c.country);
    set("companyZip", c.zip);
    set("companyTaxId", c.taxId);
    set("companyLogo", c.logo);
  }, [setValue]);

  const handleSaveAsClient = useCallback(() => {
    const client: SavedClient = {
      id: Date.now().toString(),
      companyName: watch("companyName") || "",
      email: watch("email") || "",
      address: watch("companyAddress") || "",
      city: watch("companyCity") || "",
      state: watch("companyState") || "",
      country: watch("companyCountry") || "",
      zip: watch("companyZip") || "",
      taxId: watch("companyTaxId") || "",
      logo: watch("companyLogo") || "",
    };
    if (client.companyName) {
      saveClient(client);
    }
  }, [watch]);

  return (
  <div>
    {!compact && (
      <>
        <p className="text-xl md:text-2xl font-semibold pb-3">Company Details (To)</p>
        <SavedClientsPanel onSelect={handleSelectClient} />
        <CustomTextInput
          label="Email"
          placeholder="e.g. info@company.pk"
          variableName="email"
          inputMode="email"
        />
      </>
    )}
    <div className={compact ? "space-y-0" : ""}>
      {compact && (
        <>
        <SavedClientsPanel onSelect={handleSelectClient} />
        <CustomTextInput
          label="Email"
          placeholder="e.g. info@company.pk"
          variableName="email"
          inputMode="email"
        />
        </>
      )}
      <CustomTextInput
        label={compact ? "Company" : "Company name"}
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
      <button
        type="button"
        onClick={handleSaveAsClient}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4F46E5] mt-2 transition-colors"
      >
        <Users className="w-3 h-3" />
        Save as client
      </button>
    </div>
  </div>
  );
};

