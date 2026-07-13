import dynamic from "next/dynamic";

const NewInvoiceForm = dynamic(
  () => import("@/app/new/component/NewInvoiceForm").then((mod) => mod.NewInvoiceForm),
  { ssr: false }
);

const Page = () => (
  <div className="min-h-dvh flex flex-col md:flex-row">
    <NewInvoiceForm />
  </div>
);

export default Page;
