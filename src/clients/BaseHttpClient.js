class BaseHttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async GET(url, params) {
    return fetch(new URL(url, this.baseUrl), {
      method: 'GET',

      ...params
    })
  }

  async POST(url, params) {
    return fetch(new URL(url, this.baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...params
    })
  }
}

export default BaseHttpClient
