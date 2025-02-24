"use client"

import { useRouter } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    } from "@/components/ui/sidebar"

import { useEffect, useState } from "react";

    // Menu items.
    const items = [
    {
        title: "Home",
        url: "/",
    }
    ,{
        title: "Explore",
        url: "/explore",
    },
    {
        title: "Categories",
        url: "/categories",
    },
    {
        title: "Sort",
        url: "/sort",
    },
    {
        title: "Search",
        url: "/search",
    },{
        title:"Reviews",
        url:"/reviews",
    }
]


export function AppSidebar() {
    const router = useRouter()
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(()=>{
        isLoggedIn()
    },[])

    const logOut = ()=>{
        localStorage.removeItem('userId')
        setLoggedIn(false)
    }

    const isLoggedIn = ()=>{
        if(localStorage.getItem('userId')){
            setLoggedIn(true);
        }
    }

    return (
        <Sidebar className="h-full text-white sidebar-gradient" variant="sidebar">
            <SidebarContent className="h-full text-white sidebar-gradient">
            <SidebarGroup>
            <SidebarGroupLabel className="text-4xl mb-8 mt-12 text-white">Critic XP</SidebarGroupLabel>
            <SidebarGroupContent className="mt-20">
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="ml-3">
                    <SidebarMenuButton asChild className="text-lg font-semibold">
                        <a href={item.url}>
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-[#753983]">
                {loggedIn ? (
                    <SidebarMenuButton
                    className="mb-12 text-2xl font-bold"
                    onClick={logOut}
                >
                    Log Out
                </SidebarMenuButton>
                ) : (
                    <SidebarMenuButton
                        className="mb-12 text-2xl font-bold"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </SidebarMenuButton>
                )}
            </SidebarFooter >
        </Sidebar>
    )
}
