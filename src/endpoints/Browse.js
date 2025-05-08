class Browse {
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

  async next(options = {}) {
    const payload = {
      ...this.client.getContextPayload(),
      videoId: options.videoId,
      playlistId: options.playlistId,
      params: options.params,
      playlistIndex: options.index,
      continuation: options.continuation
    };
    return this.client.makeRequest('next', payload);
  }
}

module.exports = Browse;
