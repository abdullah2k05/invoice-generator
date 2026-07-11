import { PreviewDetails } from "@/app/component/form/previewDetails";

const DemoPreview = () => (
  <div className="mx-auto w-full flex justify-center items-center">
    <PreviewDetails
      companyDetails={defaultValue.companyDetails}
      invoiceDetails={defaultValue.invoiceDetails}
      invoiceTerms={defaultValue.invoiceTerms}
      paymentDetails={defaultValue.paymentDetails}
      yourDetails={defaultValue.yourDetails}
    />
  </div>
);

const defaultValue = {
  companyDetails: {
    companyName: "Acme Corp",
    companyAddress: "123 Business Ave",
    companyCity: "San Francisco",
    companyState: "CA",
    companyCountry: "USA",
    companyLogo: "/android-chrome-192x192.png",
    companyTaxId: "",
    companyZip: "94105",
    email: "hello@acme.com",
  },
  yourDetails: {
    yourName: "John Doe",
    yourAddress: "456 Main St",
    yourCity: "New York",
    yourState: "NY",
    yourCountry: "USA",
    yourLogo: "",
    yourEmail: "john@example.com",
    yourTaxId: "",
    yourZip: "10001",
  },
  paymentDetails: {
    bankName: "Chase Bank",
    accountNumber: "1234567890",
    accountName: "JOHN DOE",
    routingCode: "021000021",
    swiftCode: "CHASUS33",
    ifscCode: "",
    currency: "USD",
  },
  invoiceTerms: {
    invoiceNumber: "Invoice #001",
    issueDate: "Mon Jul 01 2024 00:00:00 GMT+0000",
    dueDate: "Mon Jul 15 2024 00:00:00 GMT+0000",
  },
  invoiceDetails: {
    note: "Services Period 01/06/2024 to 30/06/2024",
    discount: "",
    taxRate: "10",
    items: [
      {
        itemDescription: "Web Development Services",
        amount: 2500,
        qty: 0,
      },
      {
        itemDescription: "Domain & Hosting",
        amount: 200,
        qty: 0,
      },
    ],
    currency: "USD",
  },
};
export default DemoPreview;
