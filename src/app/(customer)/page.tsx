import LandingImage from "./_component/landing-image"
import ServiceHighlights from "./_component/service-highlights"
import ServiceProviders from "./_component/service-providers"
import Products from "./_component/products"


function HomePage() {
    return (
        <div>
            <LandingImage />
            <ServiceHighlights />
            <ServiceProviders />
            <Products />
        </div>
    )
}

export default HomePage
