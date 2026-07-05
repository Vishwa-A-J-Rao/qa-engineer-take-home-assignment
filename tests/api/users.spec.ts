import {
  APIRequestContext,
  expect,
  request,
  test
} from '@playwright/test';
import { ApiRoutes } from '../../utils/apiRoutes';

let apiContext: APIRequestContext;

test.describe('ReqRes API', () => {
  test.beforeAll(async () => {
        console.log(process.env.REQRES_API_KEY);

    apiContext = await request.newContext({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: {
        'x-api-key': process.env.REQRES_API_KEY!,
        Accept: 'application/json'
      }
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET /api/users?page=2 should return a list of users', async () => {
const response = await apiContext.get(ApiRoutes.usersPage2);

console.log(await response.text());

expect(response.status()).toBe(200);
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();

    for (const user of body.data) {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String)
        })
      );
    }
  });

  test('POST /api/users should create a user', async () => {
    const payload = {
      name: 'morpheus',
      job: 'leader'
    };

    const response = await apiContext.post('/api/users', {
      data: payload
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toEqual(
      expect.objectContaining({
        name: payload.name,
        job: payload.job,
        id: expect.any(String),
        createdAt: expect.any(String)
      })
    );
  });

  test('should demonstrate a create then verify flow', async () => {
    const payload = {
      name: 'morpheus',
      job: 'leader'
    };

    const createResponse = await apiContext.post(ApiRoutes.users, {
        data: payload
    });

    expect(createResponse.ok()).toBeTruthy();

    const createdUser = await createResponse.json();

    expect(createdUser.name).toBe(payload.name);
    expect(createdUser.job).toBe(payload.job);
    expect(createdUser.id).toBeDefined();
    expect(createdUser.createdAt).toBeDefined();
  });
});