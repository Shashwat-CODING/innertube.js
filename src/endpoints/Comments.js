class Comments {
  constructor(client) {
    this.client = client;
  }

  async getComments({ videoId, continuation }) {
    if (!videoId) {
      throw new Error('Video ID is required');
    }

    const endpoint = continuation ? 'next' : 'comments';
    const data = {
      ...this.client.getContextPayload(),
      videoId,
      ...(continuation && { continuation })
    };

    const response = await this.client.makeRequest(endpoint, data);
    return response;
  }
}

module.exports = Comments; 