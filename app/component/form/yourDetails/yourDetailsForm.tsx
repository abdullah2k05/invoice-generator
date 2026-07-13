import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";

export const YourDetailsForm = ({ compact }: { compact?: boolean }) => (
  <div>
    {!compact && (
      <>
        <p className="text-xl md:text-2xl font-semibold pb-3">Your Details (From)</p>
        <CustomTextInput
          label="Email"
          placeholder="e.g. you@example.pk"
          variableName="yourEmail"
          inputMode="email"
        />
      </>
    )}
    <div className={compact ? "space-y-0" : ""}>
      {compact && (
        <CustomTextInput
          label="Email"
          placeholder="e.g. you@example.pk"
          variableName="yourEmail"
          inputMode="email"
        />
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
    </div>
  </div>
);
