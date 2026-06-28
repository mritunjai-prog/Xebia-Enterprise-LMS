-- Widen URL columns to prevent DataIntegrityViolationException with long CDN URLs
ALTER TABLE course.courses 
  ALTER COLUMN icon TYPE VARCHAR(1000),
  ALTER COLUMN thumbnail_image_url TYPE VARCHAR(1000),
  ALTER COLUMN banner_image TYPE VARCHAR(1000),
  ALTER COLUMN preview_video_url TYPE VARCHAR(1000);
