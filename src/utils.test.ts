import { removeLeadingSlash } from './utils'

describe('Shopify utils', () => {
  it('leading slash is removed', () => {
    const string = '/test'
    expect(removeLeadingSlash(string)).toEqual('test')
  })
})
