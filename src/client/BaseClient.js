const REFERER_YOUTUBE = 'https://www.youtube.com/';
const USER_AGENT_MWEB = 'Mozilla/5.0 (Linux; Android 9; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36';
const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36';
const USER_AGENT_WEB = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36';

class BaseClient {
  constructor(options = {}) {
    this.baseUrl = 'https://youtubei.googleapis.com/youtubei/v1/';
    this.webContext = {
      clientName: 'MWEB',
      clientVersion: '2.20231204.09.00',
      clientId: 2,
      apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
      userAgent: USER_AGENT_MWEB,
      referer: REFERER_YOUTUBE
    };
    
    this.androidContext = {
      clientName: 'ANDROID',
      clientVersion: '19.17.34',
      clientId: 3,
      apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
      userAgent: USER_AGENT_ANDROID,
      referer: REFERER_YOUTUBE
    };

    this.ytmusicContext = {
      clientName: 'WEB_REMIX',
      clientVersion: '1.20231218.01.00',
      clientId: 67,
      apiKey: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
      userAgent: USER_AGENT_WEB,
      referer: 'https://music.youtube.com/'
    };

    this.context = options.useYTMusic ? this.ytmusicContext : 
                   options.useAndroid ? this.androidContext : 
                   this.webContext;
  }

  getHeaders() {
    return {
      'X-Goog-Api-Format-Version': '1',
      'X-YouTube-Client-Name': this.context.clientId.toString(),
      'X-YouTube-Client-Version': this.context.clientVersion,
      'User-Agent': this.context.userAgent,
      'Referer': this.context.referer,
      'Content-Type': 'application/json'
    };
  }

  getContextPayload() {
    return {
      context: {
        client: {
          clientName: this.context.clientName,
          clientVersion: this.context.clientVersion,
          clientId: this.context.clientId,
          userAgent: this.context.userAgent
        }
      }
    };
  }

  async makeRequest(endpoint, payload, signal) {
    try {
      const url = new URL(endpoint, this.baseUrl);
      url.searchParams.set('key', this.context.apiKey);

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: signal // Add signal support for timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error; // Let the caller handle specific errors
    }
  }
}

module.exports = BaseClient;
