//connecting to the right db
process.env.NODE_ENV = 'test';

//npm package import
const request = require('supertest')

//app imports
const app = require('../app')
const db = require('../db')

let testCompany = {
    name: 'Test Company',
    description: 'Test Description'
  };

beforeEach(async ()=>{
    const result = await db.query(`IMPORT INTO companies (name, description)
    VALUES ($1, $2)
    RETURNING (code, name, description)` [testCompany.name, testCompany.description])

    testCompany = result.rows[0];
})

afterEach(async()=>{
    await db.query(`DELETE FROM companies`)
});

afterAll(async ()=>{
    await db.end;
})


//Testing GET route
describe('GET /companies', ()=>{
    test('Gets all companies in db', async ()=> {
        const response = await request(app).get(`/companies`)
        expect(response.statusCode).toEqual(200) 
    })
})