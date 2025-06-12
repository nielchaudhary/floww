import { Home, Inbox, MessageCircle } from 'lucide-react';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../../components/Chat/components/Sidebar';
import { useNavigate } from 'react-router-dom';
// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },

  {
    title: 'Chats',
    url: '/chats',
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-row font-bold">
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <img
                  src="/flow.png"
                  alt="Flow logo"
                  className="h-8 w-8"
                  onClick={() => {
                    navigate('/');
                  }}
                />
                <span
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  floww
                </span>
              </div>
            </SidebarHeader>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
