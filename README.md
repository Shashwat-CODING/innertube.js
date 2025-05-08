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

    // Get video comments
    const comments = await yt.getComments({ videoId: 'dQw4w9WgXcQ' });

    // Get video captions
    const captions = await yt.getCaptions({ videoId: 'dQw4w9WgXcQ' });

    // YTMusic features
    const ytmSearch = await yt.ytmSearch({ 
      query: 'The Weeknd',
      filter: 'song'
    });
    const lyrics = await yt.ytmGetLyrics('MPREb_4pL8gzRtw1p');
    const moods = await yt.ytmGetMoodCategories();
  } catch (error) {
    console.error(error);
  }
}
```

## Methods

### Core YouTube Methods

#### Search
```javascript
yt.search({
  query: string,           // Search query
  filter?: string,         // Optional: 'video', 'channel', 'playlist', 'all'
  continuation?: string    // Optional: continuation token for pagination
})
```

#### Player
```javascript
yt.player({
  videoId: string         // YouTube video ID
})
```

#### Browse
```javascript
yt.browse({
  browseId: string,       // Browse ID
  continuation?: string   // Optional: continuation token for pagination
})
```

#### Next
```javascript
yt.next({
  videoId: string,        // Video ID for related content
  continuation?: string   // Optional: continuation token for pagination
})
```

#### Playlist
```javascript
yt.getPlaylist({
  playlistId: string,      // YouTube playlist ID
  continuation?: string    // Optional: continuation token for pagination
})
```

#### Channel
```javascript
yt.getChannel({
  channelId: string,      // YouTube channel ID
  params?: string,        // Optional: additional parameters
  continuation?: string   // Optional: continuation token for pagination
})
```

#### Comments
```javascript
yt.getComments({
  videoId: string,        // YouTube video ID
  continuation?: string   // Optional: continuation token for pagination
})
```

#### Captions
```javascript
yt.getCaptions({
  videoId: string         // YouTube video ID
})
```

### YouTube Music Methods

#### YTMusic Search
```javascript
yt.ytmSearch({
  query: string,           // Search query
  filter?: string,         // Optional: 'song', 'video', 'album', 'artist', 'playlist', 'all'
  continuation?: string    // Optional: continuation token for pagination
})
```

#### YTMusic Browse
```javascript
yt.ytmBrowse({
  browseId: string,       // Browse ID
  continuation?: string   // Optional: continuation token for pagination
})
```

#### YTMusic Helper Methods
```javascript
yt.ytmGetHomeData()                    // Get YouTube Music home page data
yt.ytmGetArtist(channelId)             // Get artist data
yt.ytmGetAlbum(browseId)               // Get album data
yt.ytmGetPlaylist(playlistId)          // Get playlist data
yt.ytmGetLyrics(videoId)               // Get song lyrics
yt.ytmGetSong(videoId)                 // Get song details
yt.ytmGetMoodCategories()              // Get mood categories
yt.ytmGetMoodPlaylists(moodId)         // Get playlists for a specific mood
```

## Features

- Full YouTube API access through InnerTube
- YouTube Music integration
- Video player information
- Search functionality with filters
- Browse recommendations
- Related content
- Playlist and channel information
- Comments and captions
- Lyrics and mood-based playlists
- Pagination support for all list endpoints
- Error handling and detailed responses

## License

MIT