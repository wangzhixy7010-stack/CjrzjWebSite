import "./cqcpe.css";
import { BottomFeatures } from "./BottomFeatures";
import { CustomerService } from "./CustomerService";
import { ExhibitionOverview } from "./ExhibitionOverview";
import { HeroBanner } from "./HeroBanner";
import { MagazineCarousel } from "./MagazineCarousel";
import { NewsSections } from "./NewsSections";
import { NoticesSection } from "./NoticesSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { VisitServices } from "./VisitServices";

export function CqcpeHome() {
  return (
    <div className="cqcpe-home">
      <div className="main">
        <SiteHeader />
        <HeroBanner />
      </div>
      <div className="main padding7">
        <div className="wd">
          <VisitServices />
          <ExhibitionOverview />
          <NewsSections />
          <div className="box4 clearfix">
            <NoticesSection />
            <MagazineCarousel />
          </div>
          <BottomFeatures />
        </div>
      </div>
      <SiteFooter />
      <CustomerService />
    </div>
  );
}
