const request = require("supertest")
const app = require("../app")

const URL_BASE_USERS = '/users'
const URL_BASE = '/categories'
const category = {
  name: 'electronica'
}

let TOKEN
let categoryId

beforeAll(async () => {
    const user = {
      email: "fernando@gmail.com",
      password: 'fernando1234'
    }
  
    const res = await request(app)
      .post(`${URL_BASE_USERS}/login`)
      .send(user)
  
    TOKEN = res.body.token
  })


test("POST -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.name === category.name", async () => {
    const res = await request(app)
      .post(URL_BASE)
      .send(category)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    categoryId = res.body.id
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
  })

test("GET -> 'URL_BASE/categories', should return status code 200, res.body to be defined and res.body to have lenght === 1", async () => {
    const res = await request(app)
      .get(URL_BASE)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })

test("Delete -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${URL_BASE}/${categoryId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(204)
  })