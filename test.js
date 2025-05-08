const InnerTube = require('./src/index.js');
const util = require('util');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// Initialize InnerTube instance
const yt = new InnerTube();
const app = express();

// Middleware
app.use(express.json());

// Serve static HTML
app.get('/', async (req, res) => {
  try {
    const html = await fs.readFile(path.join(__dirname, 'test.html'), 'utf-8');
    res.type('html').send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Routes
app.get('/api/search', async (req, res) => {
  try {
    const result = await yt.search({
      query: req.query.q,
      filter: req.query.filter || 'all'
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/player', async (req, res) => {
  try {
    const result = await yt.player({
      videoId: req.query.v
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/browse', async (req, res) => {
  try {
    const result = await yt.browse({
      browseId: req.query.id
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/playlist', async (req, res) => {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: 'Playlist ID is required' });
    }
    const result = await yt.getPlaylist({
      playlistId: playlistId.replace('VL', '')
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/channel', async (req, res) => {
  try {
    const result = await yt.getChannel({
      channelId: req.query.id
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new YTMusic routes
app.get('/api/ytm/search', async (req, res) => {
  try {
    const result = await yt.ytmSearch({
      query: req.query.q,
      filter: req.query.filter || 'all'
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytm/browse', async (req, res) => {
  try {
    const result = await yt.ytmBrowse({
      browseId: req.query.id
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytm/home', async (req, res) => {
  try {
    const result = await yt.ytmGetHomeData();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server and run tests
const PORT = 31000;
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  try {
    await runTests();
  } catch (error) {
    console.error('Test suite error:', error);
  }
});

// Helper function for pretty printing
function prettyPrint(obj) {
  return util.inspect(obj, { 
    depth: 4, 
    colors: true, 
    maxArrayLength: 10
  });
}

// Run tests function
async function runTests() {
  console.log('Running YouTube InnerTube API Tests...');

  // Test 1: Player Information
  try {
    console.log('\n[TEST 1] Fetching Player Information');
    const playerInfo = await yt.player({ videoId: 'dQw4w9WgXcQ' });
    
    if (!playerInfo) {
      throw new Error('No player information received');
    }
    
    console.log('✅ Player Info Fetched Successfully');
    console.log('Full Player Response:');
    console.log(prettyPrint(playerInfo));
    
    // Optional: Log some specific details
    console.log('Video Title:', playerInfo.videoDetails?.title || 'N/A');
  } catch (error) {
    console.error('❌ Player Information Test Failed:', error.message);
  }

  // Test 2: Search Functionality
  try {
    console.log('\n[TEST 2] Performing Search');
    const searchResults = await yt.search({ query: 'JavaScript tutorials' });
    
    if (!searchResults) {
      throw new Error('No search results received');
    }
    
    console.log('✅ Search Completed Successfully');
    console.log('Full Search Response:');
    console.log(prettyPrint(searchResults));
    
    console.log('Number of Results:', searchResults.contents?.length || 0);
  } catch (error) {
    console.error('❌ Search Test Failed:', error.message);
  }

  // Test 3: Browse Functionality
  try {
    console.log('\n[TEST 3] Browse Recommendations');
    const browseResults = await yt.browse({ browseId: 'FEwhat_to_watch' });
    
    if (!browseResults) {
      throw new Error('No browse results received');
    }
    
    console.log('✅ Browse Recommendations Fetched');
    console.log('Full Browse Response:');
    console.log(prettyPrint(browseResults));
  } catch (error) {
    console.error('❌ Browse Test Failed:', error.message);
  }

  // Test 4: Next/Related Content
  try {
    console.log('\n[TEST 4] Fetching Related Content');
    const relatedContent = await yt.next({ videoId: 'dQw4w9WgXcQ' });
    
    if (!relatedContent) {
      throw new Error('No related content received');
    }
    
    console.log('✅ Related Content Fetched Successfully');
    console.log('Full Related Content Response:');
    console.log(prettyPrint(relatedContent));
  } catch (error) {
    console.error('❌ Related Content Test Failed:', error.message);
  }

  // Test 5: Playlist Information
  try {
    console.log('\n[TEST 5] Fetching Playlist Information');
    // Using a public playlist ID for testing
    const playlistInfo = await yt.getPlaylist({ 
      playlistId: 'PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji'  // Changed to a known working playlist
    });
    
    if (!playlistInfo || !playlistInfo.header) {
      throw new Error('Invalid playlist response received');
    }
    
    console.log('✅ Playlist Info Fetched Successfully');
    console.log('Playlist Title:', playlistInfo.header?.playlistHeaderRenderer?.title?.runs?.[0]?.text || 'N/A');
    console.log('Full Playlist Response:');
    console.log(prettyPrint(playlistInfo));
  } catch (error) {
    console.error('❌ Playlist Information Test Failed:', error.message);
  }

  // Test 6: Channel Information
  try {
    console.log('\n[TEST 6] Fetching Channel Information');
    const channelInfo = await yt.getChannel({ channelId: 'UC8butISFwT-Wl7EV0hUK0BQ' });
    
    if (!channelInfo) {
      throw new Error('No channel information received');
    }
    
    console.log('✅ Channel Info Fetched Successfully');
    console.log('Full Channel Response:');
    console.log(prettyPrint(channelInfo));
  } catch (error) {
    console.error('❌ Channel Information Test Failed:', error.message);
  }

  // Test 7: YTMusic Search
  try {
    console.log('\n[TEST 7] YTMusic Search');
    const ytmResults = await yt.ytmSearch({ 
      query: 'The Weeknd',
      filter: 'song'
    });
    console.log('✅ YTMusic Search Completed');
    console.log(prettyPrint(ytmResults));
  } catch (error) {
    console.error('❌ YTMusic Search Failed:', error.message);
  }

  // Test 8: YTMusic Browse
  try {
    console.log('\n[TEST 8] YTMusic Home');
    const ytmHome = await yt.ytmGetHomeData();
    console.log('✅ YTMusic Home Fetched');
    console.log(prettyPrint(ytmHome));
  } catch (error) {
    console.error('❌ YTMusic Home Failed:', error.message);
  }

  console.log('\n🏁 All Tests Completed');
}
