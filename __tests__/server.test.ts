const request = require('supertest')
import app from '../src/app'

describe("Test the root path", () => {

  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })

})

describe("Test the Client path", () => {

  test("It should response the GET Client method", async () => {
    const response = await request(app).get("/client")
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data.length).toBe(1)
  })

  test("It should response the GET Client by id method", async () => {
    const response = await request(app).get("/client/1")
    expect(response.body.name).toBe('Allan Lancioni')
  })

  test("It should create a Client", async () => {
    const response = await request(app)
    .post("/client")
    .send({
      "name": "Cliente Test",
      "document": "000.000.000-00",
      "address": "Rua João Machado Alves, 200",
      "email": "cliente@example.com",
      "phone": "11 99999-9999"
    })
    .expect(200)
  })

  
  test("It should response the GET created Client by name - using regexp", async () => {
    const response = await request(app).get("/client?name=Cliente")
    const { data, count } = response.body
    console.log({x: response.body})
    expect(Array.isArray(data) && count === 1).toBe(true)
    expect(data[0].name).toBe('Cliente Test')
  })

})


describe("Test the Product path", () => {

  test("It should response the GET Product method", async () => {
    const response = await request(app).get("/product")
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data.length).toBe(2)
  })

  test("It should response the GET Product by id method", async () => {
    const response = await request(app).get("/product/1")
    expect(response.body.type).toBe('MOVIE')
  })

  test("It should create a Product", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      title: 'Book 1',
      type: 'BOOK',
      category: 'COMEDY',
      img: null,
      priceSell: 10,
      priceRentPerDay: 10,
      isAvailableForSell: true,
      isAvailableForRent: true,
      qtyStock: 10,
      qtyRented: 0
    })

    console.log(response.body)
    expect(response.statusCode).toBe(200)

  })

  
  test("It should response the GET created product by name - using regexp", async () => {
    const response = await request(app).get("/product?type=BOOK")
    const { data, count } = response.body
    expect(Array.isArray(data) && count === 1).toBe(true)
    expect(data[0].title).toBe('Book 1')
  })

})
