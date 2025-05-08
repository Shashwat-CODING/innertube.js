class Channel {
  constructor(client) {
    this.client = client;
  }

  async getChannel(options = {}) {
    const payload = {
      ...this.client.getContextPayload(),
      browseId: options.channelId,
      params: options.params,
      continuation: options.continuation
    };
    return this.client.makeRequest('browse', payload);
  }
}

module.exports = Channel;
