import dynamic from "next/dynamic";

const NewInvoiceForm = dynamic(
  () => import("@/app/new/component/NewInvoiceForm").then((mod) => mod.NewInvoiceForm),
  { ssr: false }
);

const Page = () => (
  <div className="min-h-screen overflow-y-auto h-full flex items-center md:flex-row flex-col-reverse">
    <NewInvoiceForm />
  </div>
);

export default Page;
