export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      discord_servers: {
        Row: {
          created_at: string | null
          icon_url: string | null
          id: string
          member_count: number | null
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          icon_url?: string | null
          id: string
          member_count?: number | null
          name: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          icon_url?: string | null
          id?: string
          member_count?: number | null
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invite_tracking: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          inviter_id: string | null
          inviter_name: string | null
          max_uses: number | null
          server_id: string
          uses: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          inviter_id?: string | null
          inviter_name?: string | null
          max_uses?: number | null
          server_id: string
          uses?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          inviter_id?: string | null
          inviter_name?: string | null
          max_uses?: number | null
          server_id?: string
          uses?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invite_tracking_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          channel_id: string | null
          channel_name: string | null
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          server_id: string
          severity: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          channel_id?: string | null
          channel_name?: string | null
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          server_id: string
          severity?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          channel_id?: string | null
          channel_name?: string | null
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          server_id?: string
          severity?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_events_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_settings: {
        Row: {
          anti_nuke: boolean | null
          anti_raid: boolean | null
          auto_delete_invites: boolean | null
          auto_moderation: boolean | null
          auto_role_id: string | null
          blocked_words: string[] | null
          created_at: string | null
          goodbye_channel_id: string | null
          goodbye_message: string | null
          id: string
          lockdown_mode: boolean | null
          log_channel_id: string | null
          max_mentions: number | null
          max_messages_per_minute: number | null
          muted_role_id: string | null
          server_id: string
          updated_at: string | null
          verification_role_id: string | null
          welcome_channel_id: string | null
          welcome_message: string | null
        }
        Insert: {
          anti_nuke?: boolean | null
          anti_raid?: boolean | null
          auto_delete_invites?: boolean | null
          auto_moderation?: boolean | null
          auto_role_id?: string | null
          blocked_words?: string[] | null
          created_at?: string | null
          goodbye_channel_id?: string | null
          goodbye_message?: string | null
          id?: string
          lockdown_mode?: boolean | null
          log_channel_id?: string | null
          max_mentions?: number | null
          max_messages_per_minute?: number | null
          muted_role_id?: string | null
          server_id: string
          updated_at?: string | null
          verification_role_id?: string | null
          welcome_channel_id?: string | null
          welcome_message?: string | null
        }
        Update: {
          anti_nuke?: boolean | null
          anti_raid?: boolean | null
          auto_delete_invites?: boolean | null
          auto_moderation?: boolean | null
          auto_role_id?: string | null
          blocked_words?: string[] | null
          created_at?: string | null
          goodbye_channel_id?: string | null
          goodbye_message?: string | null
          id?: string
          lockdown_mode?: boolean | null
          log_channel_id?: string | null
          max_mentions?: number | null
          max_messages_per_minute?: number | null
          muted_role_id?: string | null
          server_id?: string
          updated_at?: string | null
          verification_role_id?: string | null
          welcome_channel_id?: string | null
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "server_settings_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          template_data: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          template_data: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          template_data?: Json
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string | null
          id: string
          last_active: string | null
          message_count: number | null
          server_id: string
          user_id: string
          user_name: string | null
          voice_minutes: number | null
          warnings: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_active?: string | null
          message_count?: number | null
          server_id: string
          user_id: string
          user_name?: string | null
          voice_minutes?: number | null
          warnings?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_active?: string | null
          message_count?: number | null
          server_id?: string
          user_id?: string
          user_name?: string | null
          voice_minutes?: number | null
          warnings?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
