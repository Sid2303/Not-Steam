
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    } from "@/components/ui/sidebar"

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
        title:"Chart",
        url:"/chart",
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel className="text-xl mb-8 mt-2">Not Steam</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
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
        </Sidebar>
    )
}
