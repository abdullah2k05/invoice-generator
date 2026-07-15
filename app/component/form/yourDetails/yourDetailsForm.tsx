import { Building2 } from "lucide-react";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";
import { BusinessProfilePanel } from "@/app/component/ui/BusinessProfilePanel";
import { useFormContext } from "react-hook-form";
import { useCallback, type FC } from "react";
import { saveBusinessProfile, type BusinessProfile } from "@/lib/localData";

export const YourDetailsForm: FC<{ compact?: boolean }> = ({ compact }) => {
  const { setValue } = useFormContext();

  const handleLoadProfile = useCallback((p: BusinessProfile) => {
    const set = (key: string, val: string) => {
      setValue(key, val);
      localStorage.setItem(key, val);
    };
    set("yourName", p.yourName);
    set("yourEmail", p.yourEmail);
    set("yourAddress", p.yourAddress);
    set("yourCity", p.yourCity);
    set("yourState", p.yourState);
    set("yourCountry", p.yourCountry);
    set("yourZip", p.yourZip);
    set("yourTaxId", p.yourTaxId);
    set("yourLogo", p.yourLogo);
  }, [setValue]);

  const handleSaveProfile = useCallback(() => {
    const p: BusinessProfile = {
      yourName: localStorage.getItem("yourName") || "",
      yourEmail: localStorage.getItem("yourEmail") || "",
      yourAddress: localStorage.getItem("yourAddress") || "",
      yourCity: localStorage.getItem("yourCity") || "",
      yourState: localStorage.getItem("yourState") || "",
      yourCountry: localStorage.getItem("yourCountry") || "",
      yourZip: localStorage.getItem("yourZip") || "",
      yourTaxId: localStorage.getItem("yourTaxId") || "",
      yourLogo: localStorage.getItem("yourLogo") || "",
    };
    saveBusinessProfile(p);
  }, []);

  return (
  <div>
    {!compact && (
      <>
        <p className="text-xl md:text-2xl font-semibold pb-3">Your Details (From)</p>
        <BusinessProfilePanel onLoad={handleLoadProfile} />
        <div className="mt-2">
        <CustomTextInput
          label="Email"
          placeholder="e.g. you@example.pk"
          variableName="yourEmail"
          inputMode="email"
        />
        </div>
      </>
    )}
    <div className={compact ? "space-y-0" : ""}>
      {compact && (
        <>
        <BusinessProfilePanel onLoad={handleLoadProfile} />
        <div className="mt-2">
        <CustomTextInput
          label="Email"
          placeholder="e.g. you@example.pk"
          variableName="yourEmail"
          inputMode="email"
        />
        </div>
        </>
      )}
      <CustomTextInput
        label={compact ? "Name" : "Your Name"}
        placeholder="Muhammad Abdullah"
        variableName="yourName"
      />
      <ImageInput label="Logo" variableName="yourLogo" />
      <CustomTextInput
        label="Address"
        placeholder="House 5, Street 12"
        variableName="yourAddress"
      />
      <CustomTextInput
        label="City"
        placeholder="Lahore"
        variableName="yourCity"
      />
      <CustomTextInput
        label="State"
        placeholder="Punjab"
        variableName="yourState"
      />
      <CustomNumberInput
        label="Zip"
        placeholder="54000"
        variableName="yourZip"
      />
      <CustomTextInput
        label="Country"
        placeholder="Pakistan"
        variableName="yourCountry"
      />
      <CustomTextInput
        label="Tax ID"
        placeholder="NTN 1234567"
        variableName="yourTaxId"
      />
      <button
        type="button"
        onClick={handleSaveProfile}
        className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] py-2.5 px-4 rounded-lg transition-colors shadow-sm"
      >
        <Building2 className="w-4 h-4" />
        Save as Profile
      </button>
    </div>
  </div>
  );
};
