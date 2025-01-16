import Iframe from "./Iframe"
import Whitespace from "../general/navbar/NavWhitespace";
import ViewportRatioContainer from "./ViewPortContainer";
interface SY1LayoutProps {
  websiteLink: string;
}

export default function SY1Layout({websiteLink}: SY1LayoutProps ) {
  return (
    <section className="w-full sm:w-10/12 mx-auto my-12 h-screen">
      <ViewportRatioContainer>
        <Iframe link={websiteLink} />
      </ViewportRatioContainer>
    </section>
  )
}