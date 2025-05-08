const BaseClient = require('./client/BaseClient');
const Player = require('./endpoints/Player');
const Search = require('./endpoints/Search');
const Browse = require('./endpoints/Browse');
const Playlist = require('./endpoints/Playlist');
const Channel = require('./endpoints/Channel');
const YTMSearch = require('./endpoints/ytmusic/YTMSearch');
const YTMBrowse = require('./endpoints/ytmusic/YTMBrowse');
const Comments = require('./endpoints/Comments');
const Captions = require('./endpoints/Captions');

class InnerTube extends BaseClient {
  constructor(options = {}) {
    super(options);
    
    // Player uses Android client
    const androidClient = new BaseClient({ useAndroid: true });
    const player = new Player(androidClient);
    
    // YouTube Music endpoints
    const ytmClient = new BaseClient({ useYTMusic: true });
    const ytmSearch = new YTMSearch(ytmClient);
    const ytmBrowse = new YTMBrowse(ytmClient);
    
    // Other endpoints use MWEB client
    const mwebClient = new BaseClient({ useAndroid: false }); // This will now use MWEB context
    const search = new Search(mwebClient);
    const browse = new Browse(mwebClient);
    const playlist = new Playlist(mwebClient);
    const channel = new Channel(mwebClient);
    const comments = new Comments(mwebClient);
    const captions = new Captions(mwebClient);
    
    // Core YouTube methods
    this.player = player.player.bind(player);
    this.search = search.search.bind(search);
    this.browse = browse.browse.bind(browse);
    this.next = browse.next.bind(browse);
    this.getPlaylist = playlist.getPlaylist.bind(playlist);
    this.getChannel = channel.getChannel.bind(channel);
    
    // Comments and Captions
    this.getComments = comments.getComments.bind(comments);
    this.getCaptions = captions.getCaptions.bind(captions);
    
    // YTMusic methods
    this.ytmSearch = ytmSearch.search.bind(ytmSearch);
    this.ytmBrowse = ytmBrowse.browse.bind(ytmBrowse);
    this.ytmGetHomeData = ytmBrowse.getHomeData.bind(ytmBrowse);
    this.ytmGetArtist = ytmBrowse.getArtist.bind(ytmBrowse);
    this.ytmGetAlbum = ytmBrowse.getAlbum.bind(ytmBrowse);
    this.ytmGetPlaylist = ytmBrowse.getPlaylist.bind(ytmBrowse);
    this.ytmGetLyrics = ytmBrowse.getLyrics.bind(ytmBrowse);
    this.ytmGetSong = ytmBrowse.getSong.bind(ytmBrowse);
    this.ytmGetMoodCategories = ytmBrowse.getMoodCategories.bind(ytmBrowse);
    this.ytmGetMoodPlaylists = ytmBrowse.getMoodPlaylists.bind(ytmBrowse);
  }
}

module.exports = InnerTube;