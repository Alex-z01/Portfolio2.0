export interface Blog {
  blogId: number;
  projectId?: number | null;
  title: string;
  content: string;
  author?: string | null;
  posted_at: Date;
  updated_at?: Date | null;
  tags?: string[] | null;
  status?: string | null;
  image_url?: string | null;
}

