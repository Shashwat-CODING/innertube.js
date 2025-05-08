class YTMBrowse {
  constructor(client) {
    this.client = client;
  }

  async browse(options = {}) {
    const payload = {
      ...this.client.getContextPayload(),
      browseId: options.browseId,
      params: options.params,
      continuation: options.continuation
    };
    return this.client.makeRequest('browse', payload);
  }

  async getHomeData() {
    return this.browse({ browseId: 'FEmusic_home' });
  }

  async getArtist(channelId) {
    return this.browse({ browseId: channelId });
  }

  async getAlbum(browseId) {
    return this.browse({ browseId: browseId });
  }
}

module.exports = YTMBrowse;
