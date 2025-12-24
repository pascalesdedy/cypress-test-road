describe('EverShop E2E Test', () => {
  afterEach(() => {
    cy.wait(1500); // 
  });

  it('SOAL 1 - Navigasi dan validasi URL', () => {
    cy.visit('https://demo.evershop.io/')
    // click icon
    cy.get('svg[width="25"][height="25"]').click();
    cy.url().should('include', '/login');
    // click create account
    cy.contains('Create an account').click();
    cy.url().should('include', '/register');
    // input data valid
    cy.get('input[name="email"]').type(`test${Date.now()}@mail.com`);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="full_name"]').type('Test User');
    cy.contains('button', 'Sign Up').click();
    cy.url().should('include', 'https://demo.evershop.io/');
    // pastikan user login dan dapat mengakses /account
    cy.get('svg[width="25"][height="25"]').click();
    cy.url().should('include', '/account');
  })

  it('SOAL 2 - Filter product, add to cart dan verifikasi quantity', () => {
    cy.visit('https://demo.evershop.io/accessories  ')
    // set harga low $14
    cy.get('.range-slider__thumb[data-lower="true"]').focus().type('{rightarrow}{rightarrow}');
    // set harga high $30
    cy.get('.range-slider__thumb[data-upper="true"]').focus().type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}');
    // pilih warna white
    cy.contains('label', 'White').find('input[type="checkbox"]').check().should('be.checked', { timeout: 5000 });;
    // tambahkan ke cart
    cy.get('.product__list__item__inner.group')
      .first()
      .scrollIntoView()
      .trigger('mouseover')
      .scrollIntoView()
      .find('button.product__list__add-to-cart')
      .click({ force: true });
    // close side menu
    cy.get('button[aria-label="Close cart"]').click();
    // cek chart badge mempunyai text 1
    cy.get('span.bg-red-500.rounded-full')
      .should('be.visible')
      .and('have.text', '1');
  })

  it('SOAL 3 - Hapus product dari keranjang', () => {
    cy.visit('https://demo.evershop.io/accessories')
    // menambahkan produk ke keranjang
    cy.get('.product__list__item__inner.group')
      .first()
      .scrollIntoView()
      .trigger('mouseover')
      .scrollIntoView()
      .find('button.product__list__add-to-cart')
      .click({ force: true });
    // tunggu cart update
    cy.get('span.bg-red-500.rounded-full').should('be.visible').and('have.text', '1');
    // ke halaman /cart
    cy.visit('https://demo.evershop.io/cart')
    cy.url().should('include', '/cart');
    cy.contains('a', 'CHECKOUT').should('be.visible');
    // hapus item
    cy.contains('a', 'Remove').click()
    cy.contains('Your cart is empty', { timeout: 10000 }).scrollIntoView().should('exist');
  })

  it('SOAL 4 - Checkout Flow', () => {
    cy.visit('https://demo.evershop.io/accessories')
    // menambahkan produk ke keranjang
    cy.get('.product__list__item__inner.group')
      .first()
      .scrollIntoView()
      .trigger('mouseover')
      .scrollIntoView()
      .find('button.product__list__add-to-cart')
      .click({ force: true });
    // tunggu cart update
    cy.get('span.bg-red-500.rounded-full').should('be.visible').and('have.text', '1');
    // ke halaman /cart
    cy.visit('https://demo.evershop.io/cart')
    cy.url().should('include', '/cart')
    // klik tombol checkout
    cy.contains('a', 'CHECKOUT').should('be.visible').click()
    cy.url().should('include', '/checkout')
    // isi form checkout
    cy.get('input[name="contact.email"]').type('dummy@dummy.com');
    cy.get('input[name="shippingAddress.full_name"]').type('Dummy User');
    cy.get('input[name="shippingAddress.telephone"]').type('08123456789');
    cy.get('input[name="shippingAddress.address_1"]').type('Jl. Testing No. 1');
    cy.get('input[name="shippingAddress.city"]').type('Jakarta');
    cy.get('select[name="shippingAddress.country"]').should('be.visible').select('United States');
    cy.get('select[name="shippingAddress.province"]').should('be.visible').select('Alaska');
    cy.get('input[name="shippingAddress.postcode"]').type('90210');
    // pilih shipping method
    cy.contains('a', 'Express').should('be.visible').click({ force: true });
    cy.get('input[name="shippingMethod"]:checked').should('exist');
    // pilih payment method
    cy.get('input[name="paymentMethod"][value="cod"]').should('exist').check()
    cy.get('#same-address').should('be.checked')
    // lanjut ke halaman payment
    cy.contains('span', 'Place Order').should('be.visible').and('not.be.disabled').click({ force: true })
    cy.url().should('include', '/checkout/success/')
  })

  it('SOAL 5 - Mobile viewport test', () => {
    cy.viewport('iphone-x')
    cy.visit('https://demo.evershop.io/');
    // cek burger menu
    cy.get('svg.w-6.h-6').should('exist');
    cy.get('svg').find('path[d*="M4 6h16"]').closest('a,button,div').first().click()
  })

})
