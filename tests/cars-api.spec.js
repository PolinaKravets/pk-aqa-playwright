import { test, expect } from '@playwright/test';
import AuthPage from '../PageObjects/AuthPage';

let headers;

test.describe('API cars tests', () => {
  test.beforeEach(async ({ page }) => {
    const authPage = new AuthPage(page);
    const context = page.context();
    await authPage.navigateToMainPageWithAuth();
    await page.waitForTimeout(2000);
    const cookies = await context.cookies();
    const cookiesParsed = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    headers = { Cookie: cookiesParsed };
  });
  test.afterAll(async({ request }) => {
    const response = await request.get('/api/cars', { headers });
    const respJson = await response.json();
    if(respJson.data.length){
      for await (const { id } of respJson.data){
        const responseDelete = await request.delete(`/api/cars/${id}`, { headers });
        expect(responseDelete.ok()).toBeTruthy();
        expect(responseDelete.status()).toEqual(200);
        const responseDeleteJson = await responseDelete.json();
        expect(responseDeleteJson.data.carId).toEqual(id);
      }
    };
  });

  test('API Valid Add car item', { tag: '@api' }, async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers,
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122
      }
    });
    expect(response.ok()).toBeTruthy(); 
    expect(response.status()).toEqual(201);
  });

  test('API  Add car item invalid brandId', { tag: '@api' }, async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers,
      data: {
        carBrandId: 999,
        carModelId: 1,
        mileage: 122
      }
    });
    const responseBody = await response.json();
    expect(responseBody.message).toEqual('Brand not found'); 
    expect(response.status()).toEqual(404);
    
  });

  test('API  Add car item invalid modelId', { tag: '@api' }, async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers,
      data: {
        carBrandId: 1,
        carModelId: 1000,
        mileage: 122
      }
    });
    const responseBody = await response.json();
    expect(responseBody.message).toEqual('Model not found'); 
    expect(response.status()).toEqual(404);
  });

  test('API  Add car item invalid milliage', { tag: '@api' }, async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers,
      data: {
        carBrandId: 1,
        carModelId: 2,
        mileage: 1000000
      }
    });
    const responseBody = await response.json();
    expect(responseBody.message).toEqual('Mileage has to be from 0 to 999999'); 
    expect(response.status()).toEqual(400);
  });
});
