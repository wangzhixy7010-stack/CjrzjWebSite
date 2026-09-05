import "../root-8a5edab2/cqcpe.css";
import "./cqcpe-inner.css";
import { CustomerService } from "../root-8a5edab2/CustomerService";
import { SiteFooter } from "../root-8a5edab2/SiteFooter";
import { SiteHeader } from "../root-8a5edab2/SiteHeader";

export function InnerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cqcpe-home cqcpe-inner">
      <SiteHeader variant="inner" />
      {children}
      <SiteFooter />
      <CustomerService />
    </div>
  );
}
