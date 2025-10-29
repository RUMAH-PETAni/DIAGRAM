# Realtime Chat Setup

To use the realtime chat component, you need to set up a messages table in your Supabase database.

## Database Schema

Create the following table in your Supabase database:

```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  room_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on room_id for better performance
CREATE INDEX idx_messages_room_id ON messages(room_id);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON messages
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Create a policy to allow select for authenticated users in the same room
CREATE POLICY "Allow select for users in the same room" ON messages
  FOR SELECT TO authenticated
  USING (true);
```

## Realtime Configuration

Make sure to enable realtime on the `messages` table in your Supabase dashboard:

1. Go to your Supabase project
2. Navigate to Database > Tables
3. Select the `messages` table
4. Go to the "Replication" tab
5. Enable realtime for the table

## Environment Variables

Ensure you have the following environment variables set in your `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Your Supabase publishable key

## Error Handling

If you see an error like "Error loading messages: {}", it likely means:
1. The 'messages' table doesn't exist in your Supabase database
2. The table exists but doesn't match the expected schema
3. Realtime is not enabled for the table

Make sure you've completed all the setup steps above to avoid these errors.

## Usage Example

```tsx
import { RealtimeChat } from "@/components/chat/realtime-chat";

// Example usage
const initialMessages = [
  // Preloaded messages from your database
];

<RealtimeChat
  roomId="general" // Room identifier
  currentUserId={user.id} // Current user's ID
  currentUserDisplayName={user.name} // Current user's display name
  initialMessages={initialMessages} // Initial messages from server
/>
```