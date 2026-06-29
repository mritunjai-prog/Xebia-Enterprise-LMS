ALTER TABLE course.courses 
  ALTER COLUMN learning_outcomes TYPE TEXT[] USING string_to_array(learning_outcomes, ','),
  ALTER COLUMN prerequisites TYPE TEXT[] USING string_to_array(prerequisites, ','),
  ALTER COLUMN target_audience TYPE TEXT[] USING string_to_array(target_audience, ','),
  ALTER COLUMN career_opportunities TYPE TEXT[] USING string_to_array(career_opportunities, ','),
  ALTER COLUMN secondary_keywords TYPE TEXT[] USING string_to_array(secondary_keywords, ','),
  ALTER COLUMN focus_keywords TYPE TEXT[] USING string_to_array(focus_keywords, ','),
  ALTER COLUMN seo_tags TYPE TEXT[] USING string_to_array(seo_tags, ','),
  ALTER COLUMN semantic_keywords TYPE TEXT[] USING string_to_array(semantic_keywords, ','),
  ALTER COLUMN related_topics TYPE TEXT[] USING string_to_array(related_topics, ','),
  ALTER COLUMN search_synonyms TYPE TEXT[] USING string_to_array(search_synonyms, ','),
  ALTER COLUMN meta_keywords TYPE TEXT[] USING string_to_array(meta_keywords, ',');
