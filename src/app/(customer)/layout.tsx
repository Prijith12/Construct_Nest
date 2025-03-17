import Nav from "@/components/Nav"
import Footer from "@/components/Footer"



export default function AdminLayout({children,}:Readonly<{
  children: React.ReactNode
}>){

    const navBarLinks=[
        {href:"/", label:"Home"},
        {href:"#providers",label:"ServiceProviders"},
        {href:"/#regions",label:"Regions"},
        {href:"/#products",label:"Products"}
    ]
    
    return(
        <>
        <Nav backGround="bg-white" navBarLinks={navBarLinks}/>
        <div className="min-h-screen pt-20">
        {children}
        </div>
        <Footer>
            <h1 className="font-bold text-base md:text-xl text-white">Construct Nest</h1>
        </Footer>
        </>
    )
}