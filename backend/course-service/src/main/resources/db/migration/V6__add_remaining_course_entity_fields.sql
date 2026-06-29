ALTER TABLE course.courses 
ADD COLUMN meta_keywords TEXT,
ADD COLUMN schema_markup TEXT,
ADD COLUMN faq_schema TEXT,
ADD COLUMN breadcrumb_schema TEXT,
ADD COLUMN preview_video_url TEXT,
ADD COLUMN total_views BIGINT DEFAULT 0,
ADD COLUMN total_clicks BIGINT DEFAULT 0,
ADD COLUMN ctr DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN seo_score INTEGER DEFAULT 0;
