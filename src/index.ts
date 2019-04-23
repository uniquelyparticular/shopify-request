import fetch from 'cross-fetch'

import {
  InitOptions,
  Options,
  Headers,
  Fetch
} from './types'
import { removeLeadingSlash } from './utils'

export class createClient {
  private client_key: string
  private client_pass: string
  private options?: Options
  public fetch?: Fetch

  constructor(options: InitOptions) {
    const { store_name, client_key, client_pass, ...others } = options
    this.client_key = client_key
    this.client_pass = client_pass
    this.fetch = options.fetch ? options.fetch : fetch
    this.options = {
      host: `${store_name}.myshopify.com`,
      ...others
    }
  }

  async request(
    method: string,
    path: string,
    data: object = undefined,
    requestHeaders: Headers = {}
  ) {
    const {
      options: {
        application,
        host,
        headers: classHeaders
      }
    } = this

    const uri: string = `https://${host}/${removeLeadingSlash(path)}`

    const customHeaders = {
      ...classHeaders,
      ...requestHeaders
    }

    const basic_auth = Buffer.from(`${this.client_key}:${this.client_pass}`).toString('base64')

    const headers: Headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basic_auth}`,
      'api-key': this.client_key,
      'X-API-KEY': this.client_key,
      'X-SHOPIFY-SDK-LANGUAGE': 'JS-REQUEST',
      ...(application && { 'X-SHOPIFY-APPLICATION': application }),
      ...customHeaders
    }

    const body = customHeaders['Content-Type']
      ? data
      : { body: JSON.stringify({ ...data }) }

    const response = await this.fetch(uri, {
      method,
      headers,
      ...(data && body)
    })

    if (response.status === 204)
      return response.text()

    if (response.status >= 400)
      throw {
        statusCode: response.status,
        body: {
          message: response.statusText
        }
      }

    const json = await response.json()

    if (!response.ok) {
      throw {
        statusCode: response.status,
        ...json
      }
    }

    return json
  }

  post(path: string, data: object, headers?: Headers) {
    return this.request('POST', path, data, headers)
  }

  get(path: string, headers?: Headers) {
    return this.request('GET', path, undefined, headers)
  }

  put(path: string, data: object, headers?: Headers) {
    return this.request('PUT', path, data, headers)
  }
  
  delete(path: string, data: object, headers?: Headers) {
    return this.request('DELETE', path, data, headers)
  }
}
