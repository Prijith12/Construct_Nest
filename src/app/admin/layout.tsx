import Nav from "@/components/Nav"
import Footer from "@/components/Footer"



export default function AdminLayout({children,}:Readonly<{
  children: React.ReactNode
}>){

    const navBarLinks=[
        {href:"/admin", label:"Dashboard"},
        {href:"/admin/service-providers",label:"ServiceProviders"},
        {href:"/admin/manage-regions",label:"Manage Regions"}
    ]
    
    return(
        <>
        <Nav backGround="bg-gray-100" navBarLinks={navBarLinks}/>
        <div className="min-h-screen pt-20">
        {children}
        </div>
        <Footer>
            <h1 className="font-bold text-base md:text-xl text-white">Construct Nest</h1>
        </Footer>
        </>
    )
}