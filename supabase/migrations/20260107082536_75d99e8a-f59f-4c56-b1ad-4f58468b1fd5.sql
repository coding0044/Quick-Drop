-- Create a table for storing shareable links
CREATE TABLE public.shared_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('file', 'text')),
  filename TEXT,
  file_path TEXT,
  text_content TEXT,
  password TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  views INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.shared_links ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create links (no auth required)
CREATE POLICY "Anyone can create links"
ON public.shared_links
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view links (for downloading)
CREATE POLICY "Anyone can view links"
ON public.shared_links
FOR SELECT
USING (true);

-- Allow anyone to update views/downloads
CREATE POLICY "Anyone can update link stats"
ON public.shared_links
FOR UPDATE
USING (true);

-- Create storage bucket for uploaded files
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);

-- Allow anyone to upload files
CREATE POLICY "Anyone can upload files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'uploads');

-- Allow anyone to view/download files
CREATE POLICY "Anyone can view files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'uploads');