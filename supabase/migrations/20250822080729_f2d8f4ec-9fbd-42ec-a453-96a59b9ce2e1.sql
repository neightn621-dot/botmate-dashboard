-- Create comprehensive Discord bot database schema

-- Server configurations table
CREATE TABLE public.discord_servers (
    id TEXT PRIMARY KEY, -- Discord guild ID
    owner_id TEXT NOT NULL, -- Discord user ID who added the bot
    name TEXT NOT NULL,
    icon_url TEXT,
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Server settings and configurations
CREATE TABLE public.server_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id TEXT NOT NULL REFERENCES discord_servers(id) ON DELETE CASCADE,
    -- Moderation settings
    auto_moderation BOOLEAN DEFAULT false,
    anti_raid BOOLEAN DEFAULT false,
    anti_nuke BOOLEAN DEFAULT false,
    lockdown_mode BOOLEAN DEFAULT false,
    -- Channel settings
    welcome_channel_id TEXT,
    goodbye_channel_id TEXT,
    log_channel_id TEXT,
    -- Message templates
    welcome_message TEXT DEFAULT 'Welcome to the server, {user}!',
    goodbye_message TEXT DEFAULT 'Goodbye {user}, we will miss you!',
    -- Word filter
    blocked_words TEXT[] DEFAULT '{}',
    -- Security settings
    max_mentions INTEGER DEFAULT 5,
    max_messages_per_minute INTEGER DEFAULT 10,
    auto_delete_invites BOOLEAN DEFAULT false,
    -- Role settings allow
    auto_role_id TEXT,
    verification_role_id TEXT,
    muted_role_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Security events log
CREATE TABLE public.security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id TEXT NOT NULL REFERENCES discord_servers(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'raid_detected', 'spam_blocked', 'invite_deleted', etc.
    user_id TEXT,
    user_name TEXT,
    channel_id TEXT,
    channel_name TEXT,
    description TEXT,
    severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Server templates
CREATE TABLE public.server_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    template_data JSONB NOT NULL, -- Contains channels, categories, roles structure
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User statistics
CREATE TABLE public.user_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id TEXT NOT NULL REFERENCES discord_servers(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    user_name TEXT,
    message_count INTEGER DEFAULT 0,
    voice_minutes INTEGER DEFAULT 0,
    warnings INTEGER DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(server_id, user_id)
);

-- Invite tracking
CREATE TABLE public.invite_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id TEXT NOT NULL REFERENCES discord_servers(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    inviter_id TEXT,
    inviter_name TEXT,
    uses INTEGER DEFAULT 0,
    max_uses INTEGER,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.discord_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Only server owners can access their data
CREATE POLICY "Server owners can manage their servers" ON public.discord_servers
    FOR ALL USING (owner_id = current_setting('app.current_user_id', true));

CREATE POLICY "Server owners can manage settings" ON public.server_settings
    FOR ALL USING (
        server_id IN (
            SELECT id FROM discord_servers 
            WHERE owner_id = current_setting('app.current_user_id', true)
        )
    );

CREATE POLICY "Server owners can view security events" ON public.security_events
    FOR SELECT USING (
        server_id IN (
            SELECT id FROM discord_servers 
            WHERE owner_id = current_setting('app.current_user_id', true)
        )
    );

CREATE POLICY "Anyone can view templates" ON public.server_templates
    FOR SELECT USING (true);

CREATE POLICY "Server owners can view user stats" ON public.user_stats
    FOR SELECT USING (
        server_id IN (
            SELECT id FROM discord_servers 
            WHERE owner_id = current_setting('app.current_user_id', true)
        )
    );

CREATE POLICY "Server owners can view invite tracking" ON public.invite_tracking
    FOR SELECT USING (
        server_id IN (
            SELECT id FROM discord_servers 
            WHERE owner_id = current_setting('app.current_user_id', true)
        )
    );

-- Insert default server templates
INSERT INTO public.server_templates (name, description, template_data) VALUES
('Gaming Community', 'Perfect setup for gaming servers', '{
    "categories": [
        {"name": "📋 Information", "channels": [{"name": "rules", "type": "text"}, {"name": "announcements", "type": "text"}]},
        {"name": "💬 General", "channels": [{"name": "general", "type": "text"}, {"name": "memes", "type": "text"}]},
        {"name": "🎮 Gaming", "channels": [{"name": "looking-for-group", "type": "text"}, {"name": "Gaming Lounge", "type": "voice"}]},
        {"name": "🔧 Support", "channels": [{"name": "support", "type": "text"}]}
    ],
    "roles": [
        {"name": "Admin", "color": "#ff0000", "permissions": ["ADMINISTRATOR"]},
        {"name": "Moderator", "color": "#00ff00", "permissions": ["MANAGE_MESSAGES", "KICK_MEMBERS"]},
        {"name": "VIP", "color": "#ffff00", "permissions": []},
        {"name": "Member", "color": "#0099ff", "permissions": []}
    ]
}'),
('Business/Professional', 'Clean professional server setup', '{
    "categories": [
        {"name": "📋 Company Info", "channels": [{"name": "announcements", "type": "text"}, {"name": "company-updates", "type": "text"}]},
        {"name": "💼 Work", "channels": [{"name": "general-discussion", "type": "text"}, {"name": "project-updates", "type": "text"}]},
        {"name": "🎯 Meetings", "channels": [{"name": "Meeting Room 1", "type": "voice"}, {"name": "Meeting Room 2", "type": "voice"}]},
        {"name": "🛠 Support", "channels": [{"name": "it-support", "type": "text"}]}
    ],
    "roles": [
        {"name": "CEO", "color": "#800080", "permissions": ["ADMINISTRATOR"]},
        {"name": "Manager", "color": "#ff6600", "permissions": ["MANAGE_CHANNELS", "MANAGE_MESSAGES"]},
        {"name": "Employee", "color": "#0066cc", "permissions": []},
        {"name": "Intern", "color": "#808080", "permissions": []}
    ]
}'),
('Study Group', 'Perfect for educational communities', '{
    "categories": [
        {"name": "📚 Information", "channels": [{"name": "rules-and-info", "type": "text"}, {"name": "announcements", "type": "text"}]},
        {"name": "💭 Discussion", "channels": [{"name": "general-chat", "type": "text"}, {"name": "study-help", "type": "text"}]},
        {"name": "📖 Subjects", "channels": [{"name": "mathematics", "type": "text"}, {"name": "science", "type": "text"}, {"name": "literature", "type": "text"}]},
        {"name": "🔊 Study Rooms", "channels": [{"name": "Study Room 1", "type": "voice"}, {"name": "Study Room 2", "type": "voice"}]}
    ],
    "roles": [
        {"name": "Teacher", "color": "#ff0000", "permissions": ["ADMINISTRATOR"]},
        {"name": "Teaching Assistant", "color": "#ff6600", "permissions": ["MANAGE_MESSAGES"]},
        {"name": "Student", "color": "#0066ff", "permissions": []},
        {"name": "New Student", "color": "#808080", "permissions": []}
    ]
}');

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_discord_servers_updated_at
    BEFORE UPDATE ON discord_servers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_server_settings_updated_at
    BEFORE UPDATE ON server_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();