import { expect } from 'chai'
import fetch from 'fetch-everywhere'
import { createClient } from './index'


describe('Shopify index', () => {
    it('fetch can be overridden', () => {
        const shopify = new createClient({
            store_name: 'XXX',
            client_key: 'XXX',
            client_pass: 'XXX',
            fetch: fetch
        })
        expect(shopify.fetch).to.be.an.instanceof(Function)
    })

    it('get products', () => {
        const shopify = new createClient({
            store_name: 'XXX',
            client_key: 'XXX',
            client_pass: 'XXX',
            fetch: fetch
        })

        return shopify
            .get('admin/products.json')
            .then(results => {
                expect(results).to.not.be.null
            })
            .catch(error => {
                expect(error).to.deep.equal({ statusCode: 404, body: { message: 'Not Found' } })
            })
    })

    it('get products with custom fetch', () => {
        const shopify = new createClient({
            store_name: 'particulartest',
            client_key: '391f2a8e307dafe3e0c4bc818bc59e54',
            client_pass: '691a9a67e6b92e4b269a97088362109f',
            fetch: fetch
        })

        return shopify
            .get('admin/products.json')
            .then(results => {
                expect(results).to.not.be.null
            })
            .catch(error => {
                expect(error).to.deep.equal({ statusCode: 404, body: { message: 'Not Found' } })
            })
    })
})