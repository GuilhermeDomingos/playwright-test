import {test as base, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {InventoryPage} from "../pages/InventoryPage";
import {CartPage} from "../pages/CartPage";

type UIFixture = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
};


export const test = base.extend<UIFixture>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    }
});

export {expect};