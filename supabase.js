const SUPABASE_URL = "https://rfvbzeopxusnmumazipq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdmJ6ZW9weHVzbm11bWF6aXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDU3OTgsImV4cCI6MjA5MTIyMTc5OH0.7es4Q8zWPR8uPBZwXzbXzqpq6DRqXLDEdQM5HGIl9kM";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
