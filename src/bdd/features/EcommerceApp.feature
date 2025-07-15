Feature: Client App Ecommerce Website Validations

  Scenario: Placing the order on ecommerce Website
    Given Login to ecommerce Website with "anshika@gmail.com" and "Iamking@000"
    When Add item "zara coat 3" to the cart
    Then Verify item "zara coat 3" is displayed in the Cart page
    When Enter additional details and place the order
    Then Verify order is present in the OrderHistory page
