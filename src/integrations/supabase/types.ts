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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_minutes: number | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_minutes?: number | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_minutes?: number | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      builders: {
        Row: {
          created_at: string
          description: string | null
          established_year: number | null
          id: string
          is_published: boolean
          logo_url: string | null
          name: string
          rera_registration: string | null
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          established_year?: number | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name: string
          rera_registration?: string | null
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          established_year?: number | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name?: string
          rera_registration?: string | null
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          auth_user_id: string | null
          budget_max: number | null
          budget_min: number | null
          city: string | null
          created_at: string
          customer_type: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          city?: string | null
          created_at?: string
          customer_type?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          city?: string | null
          created_at?: string
          customer_type?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          assigned_to: string | null
          budget: string | null
          created_at: string
          customer_id: string | null
          email: string | null
          full_name: string
          id: string
          interest: string | null
          message: string | null
          phone: string
          project_id: string | null
          property_id: string | null
          source: string
          status: Database["public"]["Enums"]["enquiry_status"]
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          budget?: string | null
          created_at?: string
          customer_id?: string | null
          email?: string | null
          full_name: string
          id?: string
          interest?: string | null
          message?: string | null
          phone: string
          project_id?: string | null
          property_id?: string | null
          source?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          budget?: string | null
          created_at?: string
          customer_id?: string | null
          email?: string | null
          full_name?: string
          id?: string
          interest?: string | null
          message?: string | null
          phone?: string
          project_id?: string | null
          property_id?: string | null
          source?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          builder_id: string | null
          city: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          latitude: number | null
          locality: string | null
          longitude: number | null
          name: string
          possession_date: string | null
          price_max: number | null
          price_min: number | null
          rera_number: string | null
          sector: string | null
          slug: string
          state: string
          status: Database["public"]["Enums"]["listing_status"]
          updated_at: string
        }
        Insert: {
          builder_id?: string | null
          city?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          latitude?: number | null
          locality?: string | null
          longitude?: number | null
          name: string
          possession_date?: string | null
          price_max?: number | null
          price_min?: number | null
          rera_number?: string | null
          sector?: string | null
          slug: string
          state?: string
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string
        }
        Update: {
          builder_id?: string | null
          city?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          latitude?: number | null
          locality?: string | null
          longitude?: number | null
          name?: string
          possession_date?: string | null
          price_max?: number | null
          price_min?: number | null
          rera_number?: string | null
          sector?: string | null
          slug?: string
          state?: string
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          area_sqft: number | null
          balconies: number | null
          bathrooms: number | null
          bedrooms: number | null
          bhk: string | null
          builder_id: string | null
          canonical_url: string | null
          carpet_area_sqft: number | null
          city: string
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          facing: string | null
          floor_number: number | null
          furnishing: string | null
          id: string
          is_featured: boolean
          is_luxury: boolean
          is_published: boolean
          latitude: number | null
          listing_type: string
          locality: string | null
          longitude: number | null
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_title: string | null
          parking: number
          pincode: string | null
          possession_date: string | null
          price: number
          price_per_sqft: number | null
          project_id: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          rera_number: string | null
          sector: string | null
          servant_room: boolean
          slug: string
          state: string
          status: Database["public"]["Enums"]["listing_status"]
          study_room: boolean
          tags: string[]
          title: string
          total_floors: number | null
          updated_at: string
          views_count: number
        }
        Insert: {
          area_sqft?: number | null
          balconies?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          bhk?: string | null
          builder_id?: string | null
          canonical_url?: string | null
          carpet_area_sqft?: number | null
          city?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          facing?: string | null
          floor_number?: number | null
          furnishing?: string | null
          id?: string
          is_featured?: boolean
          is_luxury?: boolean
          is_published?: boolean
          latitude?: number | null
          listing_type?: string
          locality?: string | null
          longitude?: number | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_title?: string | null
          parking?: number
          pincode?: string | null
          possession_date?: string | null
          price?: number
          price_per_sqft?: number | null
          project_id?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          rera_number?: string | null
          sector?: string | null
          servant_room?: boolean
          slug: string
          state?: string
          status?: Database["public"]["Enums"]["listing_status"]
          study_room?: boolean
          tags?: string[]
          title: string
          total_floors?: number | null
          updated_at?: string
          views_count?: number
        }
        Update: {
          area_sqft?: number | null
          balconies?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          bhk?: string | null
          builder_id?: string | null
          canonical_url?: string | null
          carpet_area_sqft?: number | null
          city?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          facing?: string | null
          floor_number?: number | null
          furnishing?: string | null
          id?: string
          is_featured?: boolean
          is_luxury?: boolean
          is_published?: boolean
          latitude?: number | null
          listing_type?: string
          locality?: string | null
          longitude?: number | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_title?: string | null
          parking?: number
          pincode?: string | null
          possession_date?: string | null
          price?: number
          price_per_sqft?: number | null
          project_id?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          rera_number?: string | null
          sector?: string | null
          servant_room?: boolean
          slug?: string
          state?: string
          status?: Database["public"]["Enums"]["listing_status"]
          study_room?: boolean
          tags?: string[]
          title?: string
          total_floors?: number | null
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "properties_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      property_features: {
        Row: {
          category: string
          created_at: string
          feature_name: string
          icon: string | null
          id: string
          property_id: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          feature_name: string
          icon?: string | null
          id?: string
          property_id: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          feature_name?: string
          icon?: string | null
          id?: string
          property_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_features_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          is_primary: boolean
          property_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean
          property_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean
          property_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          author_role: string | null
          avatar_url: string | null
          created_at: string
          customer_id: string | null
          id: string
          is_published: boolean
          quote: string
          rating: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          author_name: string
          author_role?: string | null
          avatar_url?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          is_published?: boolean
          quote: string
          rating?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_role?: string | null
          avatar_url?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          is_published?: boolean
          quote?: string
          rating?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "agent" | "user"
      enquiry_status:
        | "new"
        | "contacted"
        | "qualified"
        | "site_visit"
        | "closed"
        | "lost"
      listing_status:
        | "ready_to_move"
        | "under_construction"
        | "new_launch"
        | "sold_out"
      property_type:
        | "apartment"
        | "builder_floor"
        | "villa"
        | "plot"
        | "commercial"
        | "office"
        | "retail"
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
      app_role: ["admin", "editor", "agent", "user"],
      enquiry_status: [
        "new",
        "contacted",
        "qualified",
        "site_visit",
        "closed",
        "lost",
      ],
      listing_status: [
        "ready_to_move",
        "under_construction",
        "new_launch",
        "sold_out",
      ],
      property_type: [
        "apartment",
        "builder_floor",
        "villa",
        "plot",
        "commercial",
        "office",
        "retail",
      ],
    },
  },
} as const
