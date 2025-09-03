# Create Interactive Map Voting Component

Build the interactive European destination voting map using Leaflet.js with real-time voting via Supabase.

## Component Structure:
1. `src/components/features/MapVoting.tsx` - Main map component
2. `src/components/features/DestinationMarker.tsx` - Custom marker component
3. `src/components/features/VoteOverlay.tsx` - Voting UI overlay
4. `src/lib/supabase/destinations.ts` - Database queries
5. `src/stores/voting.store.ts` - Voting state management
6. `src/types/destination.ts` - TypeScript types

## Features to implement:
- Interactive Leaflet map centered on Europe
- Custom markers for potential destinations
- Click marker to open voting overlay
- Real-time vote updates via Supabase subscriptions
- Vote count badges on markers
- User avatars showing who voted
- Maximum 3 votes per person
- Vote history sidebar

## European Destinations (Initial):
- Barcelona, Spain
- Amsterdam, Netherlands  
- Prague, Czech Republic
- Budapest, Hungary
- Porto, Portugal
- Berlin, Germany
- Copenhagen, Denmark
- Vienna, Austria

## Voting Rules:
- Each friend gets 3 votes total
- Can vote multiple times for same destination
- Can change votes until deadline
- Anonymous voting option

## Real-time Features:
```typescript
// Subscribe to vote changes
supabase
  .channel('votes')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'votes' 
  }, handleVoteUpdate)
  .subscribe()
```

## Map Customization:
- Custom tile layer (CartoDB Positron)
- Clustered markers for close destinations
- Smooth zoom animations
- Mobile pinch-to-zoom support

Make it engaging and fun for the friend group!