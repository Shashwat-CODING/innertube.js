class Player {
  constructor(client) {
    this.client = client;
  }

  async player(options) {
    const payload = {
      ...this.client.getContextPayload(),
      videoId: options.videoId
    };
    return this.client.makeRequest('player', payload);
  }
}

module.exports = Player;
