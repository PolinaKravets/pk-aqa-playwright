/* eslint-disable playwright/no-wait-for-timeout */
 
import { test } from "../fixtures/garage.fixtures";
import { expect } from "@playwright/test";

test('Add car item', { tag: '@auth' }, async ({  garagePage }) => {
  const carAdded = garagePage.page.locator('text=Ford Focus').nth(0);
  await expect(carAdded).toBeVisible(); 
  await garagePage.page.waitForTimeout(2000);
  await garagePage.addFuel('239', '10', '45');
  await garagePage.page.waitForTimeout(2000);
  const fuelAdded = garagePage.page.locator('text=239').nth(0);
  await expect(fuelAdded).toBeVisible();
  
    
});