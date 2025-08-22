import React from 'react';
import { 
  Bot, 
  Shield, 
  Settings, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Heart,
  Zap,
  Home,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Bot, label: 'Bot Control', href: '/bot' },
  { icon: Shield, label: 'Security', href: '/security' },
  { icon: Settings, label: 'Moderation', href: '/moderation' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Users, label: 'User Stats', href: '/users' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Layers, label: 'Templates', href: '/templates' },
  { icon: Heart, label: 'Fun Features', href: '/fun' },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">BotMate</h2>
            <p className="text-sm text-muted-foreground">Discord Management</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/50 rounded-lg transition-smooth"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Pro Features</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Unlock advanced security and customization
          </p>
          <button className="w-full text-xs bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-smooth">
            Upgrade Now
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}