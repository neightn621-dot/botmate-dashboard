import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  MessageSquare, 
  Ban, 
  Clock, 
  Filter,
  Plus,
  X,
  AlertCircle
} from 'lucide-react';

interface ModerationPanelProps {
  serverId?: string;
}

export function ModerationPanel({ serverId }: ModerationPanelProps) {
  const [blockedWords, setBlockedWords] = useState(['spam', 'scam', 'discord.gg']);
  const [newWord, setNewWord] = useState('');

  const addBlockedWord = () => {
    if (newWord.trim() && !blockedWords.includes(newWord.trim())) {
      setBlockedWords([...blockedWords, newWord.trim()]);
      setNewWord('');
    }
  };

  const removeBlockedWord = (word: string) => {
    setBlockedWords(blockedWords.filter(w => w !== word));
  };

  return (
    <div className="space-y-6">
      {/* Word Filter */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Word Filter</CardTitle>
              <CardDescription>Automatically filter inappropriate content</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add blocked word..."
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBlockedWord()}
            />
            <Button onClick={addBlockedWord}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {blockedWords.map((word) => (
              <Badge key={word} variant="secondary" className="flex items-center gap-1">
                {word}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeBlockedWord(word)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auto Moderation Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Message Limits</CardTitle>
                <CardDescription>Prevent spam and flooding</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Messages per minute</label>
              <Input type="number" defaultValue="10" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max mentions per message</label>
              <Input type="number" defaultValue="5" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max emojis per message</label>
              <Input type="number" defaultValue="15" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <CardTitle>Auto Punishments</CardTitle>
                <CardDescription>Automatic actions for violations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeout duration (minutes)</label>
              <Input type="number" defaultValue="10" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Warnings before timeout</label>
              <Input type="number" defaultValue="3" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeouts before ban</label>
              <Input type="number" defaultValue="5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto Role Assignment */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Auto Role Assignment</CardTitle>
              <CardDescription>Automatically assign roles to new members</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Welcome Role</label>
              <Input placeholder="@Member" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Verification Role</label>
              <Input placeholder="@Verified" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Muted Role</label>
              <Input placeholder="@Muted" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Bot Role</label>
              <Input placeholder="@Bot" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Moderation Actions */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-primary" />
            <CardTitle>Recent Moderation Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'timeout', user: 'user123', reason: 'Spam messages', duration: '10m', time: '2 min ago' },
              { action: 'warning', user: 'baduser456', reason: 'Inappropriate language', duration: null, time: '15 min ago' },
              { action: 'ban', user: 'spammer789', reason: 'Repeated violations', duration: 'permanent', time: '1 hour ago' },
            ].map((action, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  action.action === 'ban' ? 'bg-destructive/20 text-destructive' :
                  action.action === 'timeout' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                }`}>
                  {action.action === 'ban' ? <Ban className="h-4 w-4" /> :
                   action.action === 'timeout' ? <Clock className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {action.action === 'ban' ? 'Banned' : action.action === 'timeout' ? 'Timed out' : 'Warned'} @{action.user}
                  </p>
                  <p className="text-xs text-muted-foreground">{action.reason}</p>
                  {action.duration && (
                    <p className="text-xs text-muted-foreground">Duration: {action.duration}</p>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{action.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}