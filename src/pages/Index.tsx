import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SecurityPanel } from "@/components/SecurityPanel";
import { ModerationPanel } from "@/components/ModerationPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Shield, 
  Settings, 
  Users, 
  MessageSquare, 
  BarChart3,
  Zap,
  Crown,
  ExternalLink
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <DashboardHeader 
          serverName="My Awesome Server"
          memberCount={1247}
          botStatus="online"
          securityLevel="high"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass hover:glow transition-smooth cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Bot Status</p>
                  <p className="text-sm text-muted-foreground">Online & Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:glow transition-smooth cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20 text-success">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Security</p>
                  <p className="text-sm text-muted-foreground">All systems secure</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:glow transition-smooth cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20 text-warning">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Moderation</p>
                  <p className="text-sm text-muted-foreground">5 actions today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:glow transition-smooth cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Active Users</p>
                  <p className="text-sm text-muted-foreground">342 online now</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bot Add Section */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                      <Bot className="h-7 w-7" />
                    </div>
                    <div>
                      <CardTitle>Add BotMate to Your Server</CardTitle>
                      <CardDescription>Get started with comprehensive Discord management</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-pulse">
                    Free
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  BotMate provides advanced moderation, security, and management features for your Discord server. 
                  Only server administrators can access the dashboard.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Auto Moderation</Badge>
                  <Badge variant="secondary">Anti-Raid Protection</Badge>
                  <Badge variant="secondary">Welcome Messages</Badge>
                  <Badge variant="secondary">Role Management</Badge>
                  <Badge variant="secondary">Statistics</Badge>
                  <Badge variant="secondary">Templates</Badge>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero" size="lg" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Add to Discord Server
                  </Button>
                  <Button variant="glass" size="lg">
                    View Commands
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Overview */}
            <SecurityPanel />
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Server Stats */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Server Statistics</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Members</span>
                    <span className="font-bold text-foreground">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Online Now</span>
                    <span className="font-bold text-success">342</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Messages Today</span>
                    <span className="font-bold text-foreground">8,432</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">New Joins Today</span>
                    <span className="font-bold text-primary">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Features */}
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-primary">Premium Features</CardTitle>
                    <CardDescription>Unlock advanced capabilities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm">Advanced AI Moderation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Real-time Threat Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm">Custom Message Templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Detailed Analytics</span>
                  </div>
                </div>
                
                <Button variant="hero" size="sm" className="w-full">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>

            {/* Quick Commands */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Quick Commands</CardTitle>
                <CardDescription>Most used bot commands</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">/setup</code>
                  <p className="text-xs text-muted-foreground">Initialize bot settings</p>
                </div>
                <div className="space-y-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">/security</code>
                  <p className="text-xs text-muted-foreground">Security dashboard</p>
                </div>
                <div className="space-y-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">/template apply</code>
                  <p className="text-xs text-muted-foreground">Apply server template</p>
                </div>
                <div className="space-y-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">/clean server</code>
                  <p className="text-xs text-muted-foreground">Reset server layout</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
