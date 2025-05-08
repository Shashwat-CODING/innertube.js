class YTMSearch {
  constructor(client) {
    this.client = client;
  }

  async search({ query, filter = 'all', continuation }) {
    if (!query && !continuation) {
      throw new Error('Query is required for search');
    }

    const data = {
      ...this.client.getContextPayload(),
      query,
      params: this._getFilterParams(filter),
      ...(continuation && { continuation })
    };

    const response = await this.client.makeRequest('search', data);
    return response;
  }

  _getFilterParams(filter) {
    const filters = {
      'song': 'RAAGAggBKgQQAxAB',
      'video': 'RAAGAggBKgQQBAEB',
      'album': 'RAAGAggBKgQQBBAB',
      'artist': 'RAAGAggBKgQQBhAB',
      'playlist': 'RAAGAggBKgQQBxAB',
      'all': ''
    };

    return filters[filter.toLowerCase()] || '';
  }
}

module.exports = YTMSearch;
