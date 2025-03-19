import LandingImage from "./_component/landing-image"
import ServiceHighlights from "./_component/service-highlights"
import ServiceProviders from "./_component/service-providers"
import Products from "./_component/products"
import JoinProviderButton from "./_component/provider-registration"
import { unstable_cache } from "next/cache"
import { allServiceProviders } from "@/services/service-providers"
import { allProducts } from "@/services/products"
import { allRegion } from "@/services/regions"

const getData = unstable_cache(
    async () => {
        try {
            const serviceProviders = await allServiceProviders();
            const products = await allProducts();
            const regions=await allRegion();
            return { serviceProviders, products,regions };
        } catch (error) {
            return { serviceProviders: [], products: [],regions:[] };
        }
    },
    ['service-providers-products-and-regions'], 
    { revalidate: false, tags: ['serviceProviders', 'products','regions'] } 
);

async function HomePage() {
    const data=await getData();
    return (
        <div>
            <LandingImage />
            <JoinProviderButton/>
            <ServiceHighlights regions={data.regions||[]}/>
            <ServiceProviders serviceproviders={data.serviceProviders}/>
            <Products products={data.products}/>
        </div>
    )
}

export default HomePage
