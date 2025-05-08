class YTMSearch {
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
      case 'song':
        return 'EgWKAQIIAWoKEAMQBBAJEAoQBQ%3D%3D';
      case 'video':
        return 'EgWKAQIQAWoKEAMQBBAJEAoQBQ%3D%3D';
      case 'album':
        return 'EgWKAQIYAWoKEAMQBBAJEAoQBQ%3D%3D';
      case 'artist':
        return 'EgWKAQIgAWoKEAMQBBAJEAoQBQ%3D%3D';
      case 'playlist':
        return 'EgWKAQIoAWoKEAMQBBAJEAoQBQ%3D%3D';
      case 'all':
      default:
        return 'EgWKAQQoAWoKEAMQBBAJEAoQBQ%3D%3D';
    }
  }
}

module.exports = YTMSearch;
