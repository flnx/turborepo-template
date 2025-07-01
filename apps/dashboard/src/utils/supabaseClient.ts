import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://ejqhkseqjvidmsoupxvh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcWhrc2VxanZpZG1zb3VweHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNDc4ODcsImV4cCI6MjA2NTgyMzg4N30.siWnCRK_JEcKk7G5V4NriFn2bVgVUEC1pdCNptNPfhA',
);
