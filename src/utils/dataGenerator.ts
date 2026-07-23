import { faker } from '@faker-js/faker';

export type CheckoutFormData = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

export function generateCheckoutFormData(): CheckoutFormData {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode(),
    };
}
