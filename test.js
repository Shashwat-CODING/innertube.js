const InnerTube = require('./src/index.js');
const util = require('util');

// Initialize InnerTube instance
const yt = new InnerTube();

// Helper function for pretty printing
function prettyPrint(obj) {
  return util.inspect(obj, { 
    depth: 4, 
    colors: true, 
    maxArrayLength: 10
  });
}

// Test results tracking
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  details: []
};

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
    testResults.passed++;
    testResults.details.push({ name: 'Player Information', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Player Information Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Player Information', status: 'FAILED', error: error.message });
  }
  testResults.total++;

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
    testResults.passed++;
    testResults.details.push({ name: 'Search Functionality', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Search Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Search Functionality', status: 'FAILED', error: error.message });
  }
  testResults.total++;

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
    testResults.passed++;
    testResults.details.push({ name: 'Browse Functionality', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Browse Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Browse Functionality', status: 'FAILED', error: error.message });
  }
  testResults.total++;

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
    testResults.passed++;
    testResults.details.push({ name: 'Related Content', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Related Content Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Related Content', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 5: Playlist Information
  try {
    console.log('\n[TEST 5] Fetching Playlist Information');
    const playlistInfo = await yt.getPlaylist({ 
      playlistId: 'PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji'
    });
    
    if (!playlistInfo || !playlistInfo.header) {
      throw new Error('Invalid playlist response received');
    }
    
    console.log('✅ Playlist Info Fetched Successfully');
    console.log('Playlist Title:', playlistInfo.header?.playlistHeaderRenderer?.title?.runs?.[0]?.text || 'N/A');
    console.log('Full Playlist Response:');
    console.log(prettyPrint(playlistInfo));
    testResults.passed++;
    testResults.details.push({ name: 'Playlist Information', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Playlist Information Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Playlist Information', status: 'FAILED', error: error.message });
  }
  testResults.total++;

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
    testResults.passed++;
    testResults.details.push({ name: 'Channel Information', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Channel Information Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Channel Information', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 7: Comments
  try {
    console.log('\n[TEST 7] Fetching Video Comments');
    const comments = await yt.getComments({ videoId: 'dQw4w9WgXcQ' });
    
    if (!comments) {
      throw new Error('No comments received');
    }
    
    console.log('✅ Comments Fetched Successfully');
    console.log('Full Comments Response:');
    console.log(prettyPrint(comments));
    testResults.passed++;
    testResults.details.push({ name: 'Comments', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Comments Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Comments', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 8: Captions
  try {
    console.log('\n[TEST 8] Fetching Video Captions');
    const captions = await yt.getCaptions({ videoId: 'dQw4w9WgXcQ' });
    
    if (!captions) {
      throw new Error('No captions received');
    }
    
    console.log('✅ Captions Fetched Successfully');
    console.log('Available Caption Tracks:', captions.length);
    console.log(prettyPrint(captions));
    testResults.passed++;
    testResults.details.push({ name: 'Captions', status: 'PASSED' });
  } catch (error) {
    console.error('❌ Captions Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'Captions', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 9: YTMusic Search
  try {
    console.log('\n[TEST 9] YTMusic Search');
    const ytmResults = await yt.ytmSearch({ 
      query: 'The Weeknd',
      filter: 'song'
    });
    
    if (!ytmResults) {
      throw new Error('No YTMusic search results received');
    }
    
    console.log('✅ YTMusic Search Completed Successfully');
    console.log('Full YTMusic Search Response:');
    console.log(prettyPrint(ytmResults));
    testResults.passed++;
    testResults.details.push({ name: 'YTMusic Search', status: 'PASSED' });
  } catch (error) {
    console.error('❌ YTMusic Search Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'YTMusic Search', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 10: YTMusic Home
  try {
    console.log('\n[TEST 10] YTMusic Home Data');
    const ytmHome = await yt.ytmGetHomeData();
    
    if (!ytmHome) {
      throw new Error('No YTMusic home data received');
    }
    
    console.log('✅ YTMusic Home Data Fetched Successfully');
    console.log('Full YTMusic Home Response:');
    console.log(prettyPrint(ytmHome));
    testResults.passed++;
    testResults.details.push({ name: 'YTMusic Home', status: 'PASSED' });
  } catch (error) {
    console.error('❌ YTMusic Home Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'YTMusic Home', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 11: YTMusic Lyrics
  try {
    console.log('\n[TEST 11] YTMusic Lyrics');
    const lyrics = await yt.ytmGetLyrics('MPREb_4pL8gzRtw1p');
    
    if (!lyrics) {
      throw new Error('No lyrics received');
    }
    
    console.log('✅ YTMusic Lyrics Fetched Successfully');
    console.log('Full Lyrics Response:');
    console.log(prettyPrint(lyrics));
    testResults.passed++;
    testResults.details.push({ name: 'YTMusic Lyrics', status: 'PASSED' });
  } catch (error) {
    console.error('❌ YTMusic Lyrics Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'YTMusic Lyrics', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Test 12: YTMusic Mood Categories
  try {
    console.log('\n[TEST 12] YTMusic Mood Categories');
    const moods = await yt.ytmGetMoodCategories();
    
    if (!moods) {
      throw new Error('No mood categories received');
    }
    
    console.log('✅ YTMusic Mood Categories Fetched Successfully');
    console.log('Full Mood Categories Response:');
    console.log(prettyPrint(moods));
    testResults.passed++;
    testResults.details.push({ name: 'YTMusic Mood Categories', status: 'PASSED' });
  } catch (error) {
    console.error('❌ YTMusic Mood Categories Test Failed:', error.message);
    testResults.failed++;
    testResults.details.push({ name: 'YTMusic Mood Categories', status: 'FAILED', error: error.message });
  }
  testResults.total++;

  // Print test report
  console.log('\n📊 Test Report');
  console.log('=============');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log('\nDetailed Results:');
  testResults.details.forEach((test, index) => {
    const status = test.status === 'PASSED' ? '✅' : '❌';
    console.log(`${index + 1}. ${test.name}: ${status}`);
    if (test.error) {
      console.log(`   Error: ${test.error}`);
    }
  });
  console.log('\n=============');
}

// Run the tests
runTests().catch(error => {
  console.error('Test suite error:', error);
  process.exit(1);
});
