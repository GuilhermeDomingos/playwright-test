import {test as base, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {InventoryPage} from "../pages/InventoryPage"; 

type UIFixture = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};


export const test = base.extend<UIFixture>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page));
    }
});

export {expect};