import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";

export const YourDetailsForm = () => (
  <div className="pt-2">
    <p className="text-xl md:text-2xl font-semibold pb-3">Your Details (From)</p>
    <CustomTextInput
      label="Email"
      placeholder="e.g. you@example.pk"
      variableName="yourEmail"
      inputMode="email"
    />
    <p className="pb-6 md:pb-10 pt-3 text-xs font-medium text-neutral-500">
      We&apos;ll fill the billing details automatically if we find the your.
    </p>
    <p className="pb-2 text-sm font-medium text-neutral-500">Billing details</p>
    <CustomTextInput
      label="Your Name"
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
);
