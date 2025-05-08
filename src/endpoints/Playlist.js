class Playlist {
  constructor(client) {
    this.client = client;
  }

  async getPlaylist(options = {}) {
    // Special handling for different playlist types
    let browseId = options.playlistId;
    
    // Handle Radio/Mix playlists (RD prefix)
    if (browseId.startsWith('RD')) {
      browseId = `VL${browseId}`; // Keep RD but add VL prefix
    } else if (!browseId.startsWith('VL')) {
      browseId = `VL${browseId}`; // Add VL prefix for normal playlists
    }

    const payload = {
      ...this.client.getContextPayload(),
      browseId: browseId,
      params: options.params || '',
      continuation: options.continuation
    };
    
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // Extended timeout to 15 seconds

      const response = await this.client.makeRequest('browse', payload, controller.signal);
      clearTimeout(timeout);

      if (!response) {
        throw new Error('Empty response received');
      }

      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out after 15 seconds');
      }
      throw new Error(`Failed to fetch playlist: ${error.message}`);
    }
  }
}

module.exports = Playlist;
