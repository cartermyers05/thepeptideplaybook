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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_citations: {
        Row: {
          ai_engine: string
          article_id: string | null
          citation_position: number | null
          created_at: string | null
          id: string
          query: string
          referrer_url: string | null
        }
        Insert: {
          ai_engine: string
          article_id?: string | null
          citation_position?: number | null
          created_at?: string | null
          id?: string
          query: string
          referrer_url?: string | null
        }
        Update: {
          ai_engine?: string
          article_id?: string | null
          citation_position?: number | null
          created_at?: string | null
          id?: string
          query?: string
          referrer_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_citations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "article_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      article_category_mapping: {
        Row: {
          article_id: string
          category_id: string
        }
        Insert: {
          article_id: string
          category_id: string
        }
        Update: {
          article_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_category_mapping_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_category_mapping_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "article_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_credential: string | null
          author_name: string | null
          citation_count: number | null
          citations: Json | null
          content_type: string
          created_at: string | null
          full_content: string
          h1_question: string
          id: string
          meta_description: string | null
          page_views: number | null
          published_at: string | null
          related_article_ids: string[] | null
          slug: string
          statistics: Json | null
          status: string | null
          structured_answer: Json | null
          target_keywords: string[] | null
          title: string
          tldr: string
          updated_at: string | null
        }
        Insert: {
          author_credential?: string | null
          author_name?: string | null
          citation_count?: number | null
          citations?: Json | null
          content_type?: string
          created_at?: string | null
          full_content: string
          h1_question: string
          id?: string
          meta_description?: string | null
          page_views?: number | null
          published_at?: string | null
          related_article_ids?: string[] | null
          slug: string
          statistics?: Json | null
          status?: string | null
          structured_answer?: Json | null
          target_keywords?: string[] | null
          title: string
          tldr: string
          updated_at?: string | null
        }
        Update: {
          author_credential?: string | null
          author_name?: string | null
          citation_count?: number | null
          citations?: Json | null
          content_type?: string
          created_at?: string | null
          full_content?: string
          h1_question?: string
          id?: string
          meta_description?: string | null
          page_views?: number | null
          published_at?: string | null
          related_article_ids?: string[] | null
          slug?: string
          statistics?: Json | null
          status?: string | null
          structured_answer?: Json | null
          target_keywords?: string[] | null
          title?: string
          tldr?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "user_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      check_ins: {
        Row: {
          completed: boolean | null
          created_at: string | null
          date: string
          energy_level: number | null
          id: string
          injection_done: string | null
          mood: number | null
          notes: string | null
          protocol_id: string | null
          side_effects: string[] | null
          sleep_quality: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          date: string
          energy_level?: number | null
          id?: string
          injection_done?: string | null
          mood?: number | null
          notes?: string | null
          protocol_id?: string | null
          side_effects?: string[] | null
          sleep_quality?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          date?: string
          energy_level?: number | null
          id?: string
          injection_done?: string | null
          mood?: number | null
          notes?: string | null
          protocol_id?: string | null
          side_effects?: string[] | null
          sleep_quality?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id"]
          },
        ]
      }
      citation_monitoring: {
        Row: {
          ai_engine: string
          article_id: string | null
          checked_at: string
          citation_position: number | null
          competing_sources: string[] | null
          id: string
          is_cited: boolean
          query: string
        }
        Insert: {
          ai_engine: string
          article_id?: string | null
          checked_at?: string
          citation_position?: number | null
          competing_sources?: string[] | null
          id?: string
          is_cited?: boolean
          query: string
        }
        Update: {
          ai_engine?: string
          article_id?: string | null
          checked_at?: string
          citation_position?: number | null
          competing_sources?: string[] | null
          id?: string
          is_cited?: boolean
          query?: string
        }
        Relationships: [
          {
            foreignKeyName: "citation_monitoring_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_calendar: {
        Row: {
          article_id: string | null
          created_at: string
          id: string
          notes: string | null
          priority: string
          query_cluster: string
          status: string
          target_query: string
          updated_at: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: string
          query_cluster: string
          status?: string
          target_query: string
          updated_at?: string
        }
        Update: {
          article_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: string
          query_cluster?: string
          status?: string
          target_query?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_calendar_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      course_templates: {
        Row: {
          created_at: string | null
          description: string | null
          duration_days: number
          goal: string
          id: string
          lessons: Json
          peptides: Json
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_days: number
          goal: string
          id?: string
          lessons?: Json
          peptides?: Json
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_days?: number
          goal?: string
          id?: string
          lessons?: Json
          peptides?: Json
          title?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          day: number
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          day: number
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          day?: number
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "user_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          helpful: boolean | null
          id: string
          is_saved: boolean | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          helpful?: boolean | null
          id?: string
          is_saved?: boolean | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          helpful?: boolean | null
          id?: string
          is_saved?: boolean | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          achieved_at: string | null
          id: string
          milestone_type: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          id?: string
          milestone_type: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          id?: string
          milestone_type?: string
          user_id?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category: string
          created_at: string
          featured: boolean | null
          full_content: string
          id: string
          published_at: string | null
          slug: string
          source_name: string
          source_url: string | null
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          featured?: boolean | null
          full_content: string
          id?: string
          published_at?: string | null
          slug: string
          source_name: string
          source_url?: string | null
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          featured?: boolean | null
          full_content?: string
          id?: string
          published_at?: string | null
          slug?: string
          source_name?: string
          source_url?: string | null
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          created_at: string | null
          email: string
          follower_count: string | null
          how_promote: string | null
          id: string
          name: string
          notes: string | null
          reviewed_at: string | null
          social_handle: string
          status: string | null
          why_partner: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          follower_count?: string | null
          how_promote?: string | null
          id?: string
          name: string
          notes?: string | null
          reviewed_at?: string | null
          social_handle: string
          status?: string | null
          why_partner?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          follower_count?: string | null
          how_promote?: string | null
          id?: string
          name?: string
          notes?: string | null
          reviewed_at?: string | null
          social_handle?: string
          status?: string | null
          why_partner?: string | null
        }
        Relationships: []
      }
      peptides: {
        Row: {
          category: string
          created_at: string | null
          fda_status: string
          id: string
          mechanism: string
          name: string
          primary_use: string
          related_peptides: string[] | null
          research_status: string
          safety: string
          slug: string
          studies: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          fda_status: string
          id?: string
          mechanism: string
          name: string
          primary_use: string
          related_peptides?: string[] | null
          research_status: string
          safety: string
          slug: string
          studies: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          fda_status?: string
          id?: string
          mechanism?: string
          name?: string
          primary_use?: string
          related_peptides?: string[] | null
          research_status?: string
          safety?: string
          slug?: string
          studies?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_streak: number | null
          full_name: string | null
          id: string
          last_active_at: string | null
          questions_asked: number | null
          referral_code: string | null
          referred_by: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          terms_accepted_at: string | null
          tier: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_streak?: number | null
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          questions_asked?: number | null
          referral_code?: string | null
          referred_by?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          terms_accepted_at?: string | null
          tier?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_streak?: number | null
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          questions_asked?: number | null
          referral_code?: string | null
          referred_by?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          terms_accepted_at?: string | null
          tier?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_code_redemptions: {
        Row: {
          id: string
          promo_code_id: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          id?: string
          promo_code_id: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          id?: string
          promo_code_id?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_code_redemptions_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          times_used: number
          type: string
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number
          type?: string
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number
          type?: string
        }
        Relationships: []
      }
      protocols: {
        Row: {
          created_at: string | null
          current_day: number | null
          current_week: number | null
          cycle_length_weeks: number
          goal: string
          id: string
          peptides: Json
          protocol_name: string
          quiz_response_id: string | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_day?: number | null
          current_week?: number | null
          cycle_length_weeks?: number
          goal: string
          id?: string
          peptides?: Json
          protocol_name: string
          quiz_response_id?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_day?: number | null
          current_week?: number | null
          cycle_length_weeks?: number
          goal?: string
          id?: string
          peptides?: Json
          protocol_name?: string
          quiz_response_id?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "protocols_quiz_response_id_fkey"
            columns: ["quiz_response_id"]
            isOneToOne: false
            referencedRelation: "quiz_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount: number
          course_goal: string | null
          created_at: string | null
          id: string
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
          tier: string
          user_id: string
        }
        Insert: {
          amount: number
          course_goal?: string | null
          created_at?: string | null
          id?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          tier: string
          user_id: string
        }
        Update: {
          amount?: number
          course_goal?: string | null
          created_at?: string | null
          id?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          age_range: string | null
          completed_at: string | null
          created_at: string | null
          email: string | null
          experience_level: string
          id: string
          main_concerns: string[]
          newsletter_opt_in: boolean | null
          primary_goal: string
          timeline: string
          user_id: string | null
        }
        Insert: {
          age_range?: string | null
          completed_at?: string | null
          created_at?: string | null
          email?: string | null
          experience_level: string
          id?: string
          main_concerns?: string[]
          newsletter_opt_in?: boolean | null
          primary_goal: string
          timeline: string
          user_id?: string | null
        }
        Update: {
          age_range?: string | null
          completed_at?: string | null
          created_at?: string | null
          email?: string | null
          experience_level?: string
          id?: string
          main_concerns?: string[]
          newsletter_opt_in?: boolean | null
          primary_goal?: string
          timeline?: string
          user_id?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referral_code: string
          referred_id: string | null
          referrer_id: string
          reward_applied: boolean | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code: string
          referred_id?: string | null
          referrer_id: string
          reward_applied?: boolean | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          referral_code?: string
          referred_id?: string | null
          referrer_id?: string
          reward_applied?: boolean | null
          status?: string | null
        }
        Relationships: []
      }
      research_digests: {
        Row: {
          created_at: string
          date: string
          digest_type: string
          full_content: string
          highlights: Json
          id: string
          month: string
          published_at: string | null
          sources: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          digest_type?: string
          full_content: string
          highlights?: Json
          id?: string
          month: string
          published_at?: string | null
          sources?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          digest_type?: string
          full_content?: string
          highlights?: Json
          id?: string
          month?: string
          published_at?: string | null
          sources?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      user_courses: {
        Row: {
          created_at: string | null
          current_day: number | null
          duration_days: number
          goal: string
          id: string
          lessons: Json
          peptides: Json
          purchased_at: string | null
          started_at: string | null
          status: string | null
          supplies_status: string | null
          template_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_day?: number | null
          duration_days: number
          goal: string
          id?: string
          lessons?: Json
          peptides?: Json
          purchased_at?: string | null
          started_at?: string | null
          status?: string | null
          supplies_status?: string | null
          template_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_day?: number | null
          duration_days?: number
          goal?: string
          id?: string
          lessons?: Json
          peptides?: Json
          purchased_at?: string | null
          started_at?: string | null
          status?: string | null
          supplies_status?: string | null
          template_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "course_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          current_streak: number | null
          id: string
          last_check_in_date: string | null
          longest_streak: number | null
          streak_freezes_available: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: string
          last_check_in_date?: string | null
          longest_streak?: number | null
          streak_freezes_available?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: string
          last_check_in_date?: string | null
          longest_streak?: number | null
          streak_freezes_available?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
