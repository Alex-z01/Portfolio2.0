export interface Project {
  id: number;
  title: string;
  tags: string[];
  created_at: Date;
  updated_at?: Date;  // Added and made optional to match the SQL schema
  image_url: string;
  description?: string;  // Renamed from content and made optional
}

