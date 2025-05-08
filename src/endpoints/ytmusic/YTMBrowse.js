class YTMBrowse {
  constructor(client) {
    this.client = client;
  }

  async browse({ browseId, continuation }) {
    if (!browseId && !continuation) {
      throw new Error('Browse ID is required');
    }

    const data = {
      ...this.client.getContextPayload(),
      browseId,
      ...(continuation && { continuation })
    };

    const response = await this.client.makeRequest('browse', data);
    return response;
  }

  async getHomeData() {
    return this.browse({ browseId: 'FEmusic_home' });
  }

  async getArtist(channelId) {
    if (!channelId) {
      throw new Error('Channel ID is required');
    }
    return this.browse({ browseId: `UC${channelId}` });
  }

  async getAlbum(browseId) {
    if (!browseId) {
      throw new Error('Browse ID is required');
    }
    return this.browse({ browseId });
  }

  async getPlaylist(playlistId) {
    if (!playlistId) {
      throw new Error('Playlist ID is required');
    }
    return this.browse({ browseId: `VL${playlistId}` });
  }

  async getLyrics(videoId) {
    if (!videoId) {
      throw new Error('Video ID is required');
    }
    const data = {
      ...this.client.getContextPayload(),
      browseId: 'LYRICS',
      videoId
    };
    const response = await this.client.makeRequest('browse', data);
    return response;
  }

  async getSong(videoId) {
    if (!videoId) {
      throw new Error('Video ID is required');
    }
    const data = {
      ...this.client.getContextPayload(),
      videoId
    };
    return this.client.makeRequest('player', data);
  }

  async getMoodCategories() {
    return this.browse({ browseId: 'FEmusic_moods_and_genres' });
  }

  async getMoodPlaylists(moodId) {
    if (!moodId) {
      throw new Error('Mood ID is required');
    }
    return this.browse({ browseId: moodId });
  }
}

module.exports = YTMBrowse;
