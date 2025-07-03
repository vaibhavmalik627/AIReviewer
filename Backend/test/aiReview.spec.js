const request = require('supertest');
const app = require('../src/app');

describe('AI Review API', () => {
  it('GET /ai should return welcome message', async () => {
    const res = await request(app).get('/ai');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Welcome to the AI Code Review API');
  });

  it('POST /ai/get-review should return 400 if no code provided', async () => {
    const res = await request(app)
      .post('/ai/get-review')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
  });

  // This test requires a valid OPENAI_API_KEY and quota
  it('POST /ai/get-review should return review for valid code', async () => {
    const res = await request(app)
      .post('/ai/get-review')
      .send({ code: 'function test() { return 1 + 1; }' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.review).toBeDefined();
  });
});
