class Search {
  constructor(client) {
    this.client = client;
  }

  async search(options = {}) {
    const { query, filter = 'all', continuation } = options;

    const params = this.getFilterParams(filter);
    
    const payload = {
      ...this.client.getContextPayload(),
      query: query || '',
      params: params,
      continuation: continuation
    };

    return this.client.makeRequest('search', payload);
  }

  getFilterParams(filter) {
    switch (filter.toLowerCase()) {
      case 'video':
        return 'EgIQAQ%3D%3D'; // Video only
      case 'channel':
        return 'EgIQAg%3D%3D'; // Channel only
      case 'playlist':
        return 'EgIQAw%3D%3D'; // Playlist only
      case 'all':
      default:
        return ''; // No filter
    }
  }
}

module.exports = Search;
