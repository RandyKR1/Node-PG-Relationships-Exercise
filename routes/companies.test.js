process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');
let testUser1;

beforeEach(async () => {
    const result = await db.query(`INSERT INTO companies (name, description) VALUES ('testUser1', 'testDescription') RETURNING  id, name, description`);
    testUser1 = result.rows[0]
  })
  
  afterEach(async () => {
    await db.query(`DELETE FROM companies`)
  })
  
  afterAll(async () => {
    await db.end()
  })

describe('GET /companies', () => {
    test('Get a list of companies', async () => {
        try {
            const res = await request(app).get('/companies');
            expect(res.statusCode).toBe(200);
            expect(res.body.Companies).toContainEqual({ code: testUser1.id, name: 'testUser1' });
        } catch (error) {
            console.error("Error occurred during test:", error);
        }
    });
});