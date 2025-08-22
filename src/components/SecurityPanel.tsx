import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Zap, 
  Users, 
  MessageSquare,
  Ban,
  Activity
} from 'lucide-react';

interface SecurityPanelProps {
  serverId?: string;
}

export function SecurityPanel({ serverId }: SecurityPanelProps) {
  const [settings, setSettings] = useState({
    autoModeration: true,
    antiRaid: true,
    antiNuke: false,
    lockdownMode: false,
    inviteProtection: true,
    spamProtection: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const emergencyLockdown = () => {
    setSettings(prev => ({ ...prev, lockdownMode: true }));
    // API call would go here
  };

  return (
    <div className="space-y-6">
      {/* Emergency Controls */}
      <Card className="glass border-destructive/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Emergency Controls</CardTitle>
                <CardDescription>Critical security actions</CardDescription>
              </div>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              CRITICAL
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="destructive"
              size="lg"
              onClick={emergencyLockdown}
              className="w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              Emergency Lockdown
            </Button>
            
            <Button variant="warning" size="lg" className="w-full">
              <Ban className="h-4 w-4 mr-2" />
              Mass Ban Suspicious
            </Button>
            
            <Button variant="glass" size="lg" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Security Log
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Auto Moderation</CardTitle>
                <CardDescription>Automated content filtering</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>Auto Moderation</span>
              </div>
              <Switch
                checked={settings.autoModeration}
                onCheckedChange={() => handleToggle('autoModeration')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span>Spam Protection</span>
              </div>
              <Switch
                checked={settings.spamProtection}
                onCheckedChange={() => handleToggle('spamProtection')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ban className="h-4 w-4 text-muted-foreground" />
                <span>Invite Protection</span>
              </div>
              <Switch
                checked={settings.inviteProtection}
                onCheckedChange={() => handleToggle('inviteProtection')}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-warning" />
              <div>
                <CardTitle>Anti-Raid Protection</CardTitle>
                <CardDescription>Prevent server raids</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Anti-Raid</span>
              </div>
              <Switch
                checked={settings.antiRaid}
                onCheckedChange={() => handleToggle('antiRaid')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <span>Anti-Nuke</span>
              </div>
              <Switch
                checked={settings.antiNuke}
                onCheckedChange={() => handleToggle('antiNuke')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span>Lockdown Mode</span>
              </div>
              <Switch
                checked={settings.lockdownMode}
                onCheckedChange={() => handleToggle('lockdownMode')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>Recent Security Events</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'raid_detected', severity: 'high', time: '2 min ago', description: 'Multiple users joining rapidly - Auto-banned 12 accounts' },
              { type: 'spam_blocked', severity: 'medium', time: '5 min ago', description: 'Spam message blocked from @user123' },
              { type: 'invite_deleted', severity: 'low', time: '1 hour ago', description: 'Unauthorized invite link removed' },
            ].map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border">
                <div className={`h-2 w-2 rounded-full ${
                  event.severity === 'high' ? 'bg-destructive' :
                  event.severity === 'medium' ? 'bg-warning' : 'bg-success'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
                <Badge variant={
                  event.severity === 'high' ? 'destructive' :
                  event.severity === 'medium' ? 'secondary' : 'default'
                }>
                  {event.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}