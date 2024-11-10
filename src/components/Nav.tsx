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

import { CircleUserRound, Warehouse, LogOut, Menu } from "lucide-react"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Children, ComponentProps } from "react"

export default function Nav({ children, backGround,navBarLinks }: { children?: React.ReactNode, backGround: string,navBarLinks:{href:string,label:string}[] }) {
    return (
        <div className={cn(
            backGround,
            "w-full flex fixed top-0 items-center justify-between h-20 px-4"
        )}>
            <div className="flex items-center">
                <div className="block md:hidden">
                    <SideBar backGround={backGround} sideBarLinks={navBarLinks} />
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
                            navBarLinks.length>0 ?(
                                navBarLinks.map((link,index)=>(
                                    <NavLink href={link.href} key={index}>{link.label}</NavLink>
                                ))
                            ) : <h1>Add Nav links</h1>
                        }
                    </div>
                </div>
            </div>
            <div className="pr-2">
                <AuthMenu loggedIn={true} name="prijith" email="prijith@gmail.com" />
            </div>
        </div>
    )
}


const AuthMenu = ({ loggedIn, name, email }: { loggedIn: boolean, name: string, email: string }) => {
    return (
        <div>
            {
                loggedIn ? (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="flex justify-center">
                                <Button className="bg-gray-100 text-black hover:bg-gray-200 text-xs sm:text-sm">
                                    <CircleUserRound className="pr-1" />
                                    <span className="font-semibold uppercase pr-1">{name}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="/profile">profile</Link></DropdownMenuItem>
                                <DropdownMenuItem><LogOut className="pr-3" />Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : <Button><Link href="/">Log In</Link></Button>
            }
        </div>
    )
}

 const NavLink = (props: Omit<React.ComponentProps<typeof Link>, "className">) => {
    const path = usePathname()
    return (
        <Link {...props} className={cn(
            "text-sm font-semibold text-gray-500",
            path == props.href && "text-blue-700"
        )} />
    )
}

const SideBar = ({ backGround,sideBarLinks }: { backGround: string,sideBarLinks:{href:string,label:string}[] }) => {
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
                <div className="mt-10 flex flex-col border-t-2">
                    { sideBarLinks.length >0 ? (
                        sideBarLinks.map((link,index)=>(
                            <SideBarLink backGround={backGround} href={link.href} key={index}>{link.label}</SideBarLink>
                        ))
                    ) : <h1>Add sideBar Links</h1>
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}

const SideBarLink = ({backGround,...props}:{backGround:string} & Omit<React.ComponentProps<typeof Link>, "className">) => {
    const path=usePathname()
    return (
        <SheetClose asChild>
        <Link {...props} className={cn("flex items-center justify-center w-full h-14  border-b-2 border-gray-300 rounded-sm hover:bg-gray-200 text-sm font-semibold text-gray-500",backGround,
            path==props.href && "bg-gray-200 bg-opacity-55 text-gray-600 "
        )}/>
        </SheetClose>
    )
}

