/* eslint-disable playwright/no-wait-for-timeout */


class GaragePage  {

  constructor(page) {
    this.page= page;

    this.selectors = {

      navigateToGaragePage: this.page.locator('a[routerlink="garage"]'),  
      addCarButton: this.page.locator('.panel-page_heading .btn-primary'),
      addCarPopupMainTitle: this.page.locator('.modal-title'),
      addCarPopup: this.page.locator("div[class='modal-content']"),
      addCarBrandTitle: this.page.locator("select[id='addCarBrand']~ label"),
      addCarBrandField: this.page.locator("select[id='addCarBrand']"),
      addModelTitle: this.page.locator("select[id='addCarModel']~ label"),
      addModelField: this.page.locator("select[id='addCarModel']"),
      addMiliageTitle: this.page.locator("div[class='input-group']~ label"),
      addMiliageField: this.page.locator("input[id='addCarMileage']"),
      addCarClose: this.page.locator("button[class='close']"),
      addCarAdd: this.page.locator('.modal-footer .btn-primary'),
      addCarCancel: this.page.locator('.modal-footer .btn-secondary'),
      addCarEdit: this.page.locator('span[class="icon icon-edit"]'),
      addCarDelete: this.page.locator('button.btn.btn-outline-danger'),
      addCarConfirmDelete: this.page.locator('button.btn.btn-danger'),
      addCarCheckCar: this.page.locator('ul.car-list > li.car-item:first-of-type .car_name'),
      addFuelExpense: this.page.locator('button.car_add-expense.btn.btn-success'),
      addExpMiliageField: this.page.locator("input[id='addExpenseMileage']"),
      addFuelLitresField: this.page.locator("input[id='addExpenseLiters']"),
      addFuelCostField: this.page.locator("input[id='addExpenseTotalCost']"),
      saveFuelExpense: this.page.getByRole('button', { name: 'Add' })


    };
  };
  async addCar(brand, model, milliage){
    await this.page.goto('/panel/garage');
    await this.selectors.addCarButton.click();
    await this.selectors.addCarBrandField.selectOption({ label:brand });
    await this.selectors.addModelField.selectOption({ label:model });
    await this.selectors.addMiliageField.fill(milliage);
    await this.selectors.addCarAdd.click();
  };

  async deleteCar(){
    const carEditButtons = await this.selectors.addCarEdit; 
    let count = await carEditButtons.count();

    while (count > 0) {
      await carEditButtons.nth(0).click();
      await this.selectors.addCarDelete.click();
      await this.selectors.addCarConfirmDelete.click(); 
      await this.page.waitForTimeout(1000);
      const updatedCarEditButtons = await this.selectors.addCarEdit;
      count = await updatedCarEditButtons.count();
    };
  };
  async addFuel(addexp, litres, cost){
    const editFuelButton = await this.selectors.addFuelExpense;
    await editFuelButton.nth(0).click();
    await this.page.waitForTimeout(2000);
    await this.selectors.addExpMiliageField.fill(addexp);
    await this.selectors.addFuelLitresField.fill(litres);
    await this.selectors.addFuelCostField.fill(cost);
    await this.selectors.saveFuelExpense.click();
  }
};


export default GaragePage;