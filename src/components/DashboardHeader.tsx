import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Shield, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface DashboardHeaderProps {
  serverName?: string;
  memberCount?: number;
  botStatus?: 'online' | 'offline' | 'warning';
  securityLevel?: 'high' | 'medium' | 'low';
}

export function DashboardHeader({ 
  serverName = "Your Discord Server",
  memberCount = 0,
  botStatus = 'online',
  securityLevel = 'high' 
}: DashboardHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'offline': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl glass p-8">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <Bot className="h-7 w-7" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${getStatusColor(botStatus)}`} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{serverName}</h1>
                  <p className="text-muted-foreground">Complete Discord server management</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {memberCount.toLocaleString()} members
                </Badge>
                <Badge className={getSecurityColor(securityLevel)}>
                  <Shield className="h-3 w-3 mr-1" />
                  Security: {securityLevel.toUpperCase()}
                </Badge>
                <Badge variant={botStatus === 'online' ? 'default' : 'destructive'}>
                  {botStatus === 'online' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  Bot {botStatus}
                </Badge>
              </div>
            </div>

            <Button size="lg" className="gradient-primary hover:scale-105 transition-smooth glow">
              Add to Server
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 glass hover:glow transition-smooth">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20 text-success">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Security Events</p>
              <p className="text-2xl font-bold text-foreground">23</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glass hover:glow transition-smooth">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glass hover:glow transition-smooth">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20 text-warning">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glass hover:glow transition-smooth">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commands Used</p>
              <p className="text-2xl font-bold text-foreground">8,432</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}