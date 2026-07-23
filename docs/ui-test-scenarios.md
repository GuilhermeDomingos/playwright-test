# UI Test Scenarios

## Login

- Should login successfully with valid credentials.
- Should show error message with invalid credentials.

## Inventory

- Should display the inventory list for a valid user.

## Cart

- Should display cart page with added product.
- Should validate product data in cart.
- Should remove product from cart.
- Should continue shopping after adding product to cart.
- Should navigate to checkout step.

## Checkout Information

- Should display checkout information page.
- Should continue to checkout overview with valid information.
- Should show error when first name is missing.
- Should show error when last name is missing.
- Should show error when postal code is missing.
- Should return to cart when cancel is clicked.

## Checkout Overview

- Should display checkout overview page.
- Should validate product data in checkout overview.
- Should validate payment and shipping information.
- Should validate price total information.
- Should return to inventory when cancel is clicked.
- Should finish checkout successfully.

## Checkout Complete

- Should display checkout complete page.
- Should return to inventory when back home is clicked.
- Should keep cart empty after order is completed.
- Should keep generate PDF order button available.
