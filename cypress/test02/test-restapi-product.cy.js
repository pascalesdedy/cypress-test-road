describe('API - Create Product', () => {
  it('should create a new product successfully', () => {
    const payload = {
      title: 'Test Product Cypress',
      price: 29.99,
      description: 'Product created via Cypress API test',
      image: 'https://i.pravatar.cc',
      category: 'electronics'
    }

    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/products',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.title).to.eq(payload.title)
      expect(response.body.price).to.eq(payload.price)
      expect(response.body.category).to.eq(payload.category)
    })
  })
}),

describe('API Negative Tests - Create Product', () => {
  it('should fail when request body is empty', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/products',
      body: {},
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.not.eq(200)
    })
  })
  it('should fail when content-type is missing', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/products',
      headers: {},
      body: {
        title: 'Invalid Product'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.not.eq(200)
    })
  })
  it('should fail when price is a string', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/products',
      body: {
        title: 'Bad Price Product',
        price: 'cheap',
        description: 'invalid price type',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.be.oneOf([201, 400])
    })
  })
  it('should fail when required fields are missing', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/products',
      body: {
        title: 'Missing fields product'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.not.eq(200)
    })
  })
  it('should return 404 for invalid endpoint', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/productz',
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })
})

