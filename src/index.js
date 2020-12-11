const Axios = require('axios').default

const TARGET = 'https://resources.transcendsync.com'

class SyncHandler {
  /**
   * Creates a synchronization handler instance
   * @param {Object} options
   * @param {String} options.apiKey Transcend Sync Api Key
   * @param {String} options.siteKey Transcend Sync Site Key
   */
  constructor({ apiKey = '', siteKey = '' }) {
    this.apiKey = apiKey
    this.session = Axios.create({
      baseURL: TARGET,
      headers: {
        authorization: `APIKEY ${apiKey}`,
        sitekey: siteKey
      }
    })
  }

  /**
   * Fetch deployment configuration
   */
  fetchDeployConfig() {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          url: 'deploy/config',
          method: 'POST'
        }

        const { data } = await this.session(options)

        const { success, resources } = data

        if (!success) {
          throw new Error('Unable to fetch deploy config')
        }

        const payloadBuffer = Buffer.from(resources, 'base64')
        const payloadString = payloadBuffer.toString('utf-8')
        const payload = JSON.parse(payloadString)

        resolve(payload)
      } catch (e) {
        return reject(e)
      }
    })
  }

  /**
   * Fetch Origin Configuration
   */

  fetchOriginConfig() {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          url: 'deploy/origin',
          method: 'POST'
        }

        const { data } = await this.session(options)

        const { success, resources } = data

        if (!success) {
          throw new Error('Unable to fetch origin config')
        }

        const payloadBuffer = Buffer.from(resources, 'base64')
        const payloadString = payloadBuffer.toString('utf-8')
        const payload = JSON.parse(payloadString)

        resolve(payload)
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = { SyncHandler }
