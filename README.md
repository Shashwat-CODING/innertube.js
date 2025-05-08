# InnerTube

A lightweight library to interact with YouTube API using InnerTube.

## Installation

```bash
npm install innertube.js
```

## Usage

```javascript
const InnerTube = require('innertube.js');

async function example() {
  const yt = new InnerTube();

  try {
    // Get video player information
    const playerInfo = await yt.player({ videoId: 'dQw4w9WgXcQ' });
    
    // Search with filters
    const videoSearch = await yt.search({ 
      query: 'JavaScript tutorials',
      filter: 'video' // 'video', 'channel', 'playlist', or 'all'
    });
    
    // Pagination using continuation token
    if (videoSearch.continuation) {
      const nextPage = await yt.search({
        query: 'JavaScript tutorials',
        filter: 'video',
        continuation: videoSearch.continuation
      });
    }
    
    // Browse recommendations
    const browseResults = await yt.browse({ browseId: 'FEwhat_to_watch' });
  } catch (error) {
    console.error(error);
  }
}
```

## Methods

### Search
```javascript
yt.search({
  query: string,           // Search query
  filter?: string,         // Optional: 'video', 'channel', 'playlist', 'all'
  continuation?: string    // Optional: continuation token for pagination
})
```

### Player
```javascript
yt.player({
  videoId: string         // YouTube video ID
})
```

### Browse
```javascript
yt.browse({
  browseId: string,       // Browse ID
  continuation?: string   // Optional: continuation token for pagination
})
```

### Next
```javascript
yt.next({
  videoId: string,        // Video ID for related content
  continuation?: string   // Optional: continuation token for pagination
})
```

### Playlist
```javascript
yt.getPlaylist({
  playlistId: string,      // YouTube playlist ID
  continuation?: string    // Optional: continuation token for pagination
})
```

### Channel
```javascript
yt.getChannel({
  channelId: string,      // YouTube channel ID
  params?: string,        // Optional: additional parameters
  continuation?: string   // Optional: continuation token for pagination
})
```

### YTMusic Search
```javascript
yt.ytmSearch({
  query: string,           // Search query
  filter?: string,         // Optional: 'song', 'video', 'album', 'artist', 'playlist', 'all'
  continuation?: string    // Optional: continuation token for pagination
})
```

### YTMusic Browse
```javascript
yt.ytmBrowse({
  browseId: string,       // Browse ID
  continuation?: string   // Optional: continuation token for pagination
})

// Helper methods
yt.ytmGetHomeData()       // Get YouTube Music home page data
yt.ytmGetArtist(channelId) // Get artist data
yt.ytmGetAlbum(browseId)   // Get album data
```

## License

MIT