"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@auth0/nextjs-auth0/client"
import { CircleUserRound, Warehouse, LogOut, Menu } from "lucide-react"
import { Spinner } from "./loading/Loading"
import { revalidate } from "@/lib/revalidate"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import ContactUs from "./contact-us"

const handleRevalidate=async()=>{
    const response=await revalidate();
    if(response){
        window.location.reload();
    }else{
        alert("error revalidating the chached data");
    }
}

export default function Nav({ children, backGround, navBarLinks }: { children?: React.ReactNode, backGround: string, navBarLinks: { href: string, label: string, scroll?: boolean }[] }) {
    const nameSpace = process.env.NEXT_PUBLIC_AUTH0_NAMESPACE;
    const { user, isLoading, error } = useUser();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const roles = user?.[`${nameSpace}`] || [];
        if (Array.isArray(roles)) {
            let isAdmin = roles.some((role: any) => role === 'admin');
            setIsAdmin(isAdmin);
        } else {
            setIsAdmin(false);
        }
    }, [user])


    return (
        <div className={cn(
            backGround,
            "w-full flex fixed top-0 items-center justify-between h-20 px-4"
        )}>
            <div className="flex items-center">
                <div className="block md:hidden">
                    <SideBar backGround={backGround} sideBarLinks={navBarLinks} isAdmin={isAdmin} />
                </div>
                <Link href='/'>
                    <Warehouse size={28} className="mr-2 ml-4 text-green-600" />
                </Link>
                <h1 className=" font-extrabold text-white uppercase tracking-wider text-center ">
                    <Link href="/" className="text-xs sm:text-sm">
                        <span className="text-purple-500 ">Construct</span>
                        <span className="text-yellow-500">Nest</span>
                    </Link>
                </h1>
                <div className="hidden md:block">
                    <div className="pl-20 flex space-x-8">
                        {
                            navBarLinks.length > 0 ? (
                                navBarLinks.map((link, index) => (
                                    <NavLink href={link.href} key={link.href} scroll={link.scroll}>{link.label}</NavLink>
                                ))
                            ) : <h1>Add Nav links</h1>
                        }
                        <AdminLink isAdmin={isAdmin} isSideBar={false} />
                    </div>
                </div>
            </div>
            <div className="pr-2">
                {isLoading ? <Spinner />
                    : <AuthMenu loggedIn={!!user} name={user?.name as string} email={user?.email as string} isAdmin={isAdmin} />
                }
            </div>
        </div>
    )
}


const AuthMenu = ({ loggedIn, name, email, isAdmin }: { loggedIn: boolean, name: string, email: string, isAdmin: boolean }) => {
    const displayName = loggedIn?name.length > 8 ? `${name.slice(0, 2)}...` : name:'';
    return (
        <div>
            {
                loggedIn ? (

                    <div >

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="flex justify-center">
                                <Button className="bg-gray-100 text-black hover:bg-gray-200 text-xs sm:text-sm">
                                    <CircleUserRound className="pr-1" />
                                    <span className="font-semibold uppercase pr-1">{displayName}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="/profile">profile</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href='/api/auth/logout'><LogOut className="pr-3" />Log out</Link></DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : <Link href="/api/auth/login"><Button>Log In</Button></Link>
            }
        </div>
    )
}

const NavLink = (props: Omit<React.ComponentProps<typeof Link>, "className">) => {
    const path = usePathname();
    return (
        <Link {...props} className={cn(
            "text-sm font-light text-gray-500 hover:text-blue-600",
            path == props.href && "text-blue-700"
        )} />
    )
}

const SideBar = ({ backGround, sideBarLinks, isAdmin }: { backGround: string, sideBarLinks: { href: string, label: string, scroll?: boolean }[], isAdmin: boolean }) => {
    const path = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="cursor-pointer hover:scale-125" size={28} />
            </SheetTrigger>
            <SheetContent side="left" className={cn(backGround, "w-1/2 px-0")}>
                <SheetHeader>
                    <div className="flex">
                        <Warehouse size={28} className="mr-2 ml-4 text-green-600" />
                        <h1 className=" font-extrabold text-white uppercase tracking-wider">
                            <Link href="/" className="text-xs sm:text-sm">
                                <span className="text-purple-500 ">Construct</span>
                                <span className="text-yellow-500">Nest</span>
                            </Link>
                        </h1>
                    </div>
                </SheetHeader>
                <div className="mt-10 flex flex-col border-blue-100">
                    {sideBarLinks.length > 0 ? (
                        sideBarLinks.map((link, index) => (
                            <div className="mb-1 border-t-2">
                            <SideBarLink backGround={backGround} href={link.href} key={link.href} scroll={link.scroll}>{link.label}</SideBarLink>
                            </div>
                        ))
                    ) : <h1>Add sideBar Links</h1>
                    }
                    {
                        !path.includes('/admin') && isAdmin &&
                        <SheetClose asChild >
                            <div className={cn("flex items-center border-t-2 justify-center w-full h-14  border-b-2 border-blue-100 rounded-sm hover:bg-gray-200 text-sm font-light text-black font-serif", backGround)}>
                                <AdminLink isAdmin={isAdmin} isSideBar={true} />
                            </div>
                        </SheetClose>
                    }
                </div>
                <div className="mt-5">
                    <ContactUs/>
                </div>
            </SheetContent>
        </Sheet>
    )
}

const SideBarLink = ({ backGround, ...props }: { backGround: string } & Omit<React.ComponentProps<typeof Link>, "className">) => {
    const path = usePathname()
    return (
        <SheetClose asChild>
            <Link {...props} className={cn("flex items-center justify-center w-full h-14 border-b-2 border-blue-100 rounded-sm hover:bg-gray-200 text-sm font-light text-black font-serif", backGround,
                path == props.href && "bg-slate-100 bg-opacity-55 text-blue-600 "
            )} />
        </SheetClose>
    )
}

const AdminLink = ({ isAdmin, isSideBar }: { isAdmin: boolean, isSideBar: boolean }) => {
    const path = usePathname();
    return (
        <div>
            {!path.includes('/admin') && isAdmin && <><Link href='/admin' className={cn(!isSideBar ?
                "text-sm font-light text-gray-500 hover:text-blue-600" : ''
            )}>AdminPage</Link>
            <Link href="/" onClick={(e)=>{
                e.preventDefault();
                handleRevalidate();
            }} className={cn(!isSideBar ?
                "text-sm ml-4 font-light text-gray-500 hover:text-blue-600" : ''
            )}>{isSideBar?'/':''}Revalidate</Link> 
            </> 
            }
        </div>
    )
}
