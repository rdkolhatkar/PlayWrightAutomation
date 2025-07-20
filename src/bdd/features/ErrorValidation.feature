Feature: Error Validation for Client App

  @ErrorValidation
  Scenario: Placing the order on ecommerce Website
    Given Login to client app ecommerce Website with "rahulshetty" and "learning"
    Then Verify Error message is displayed.
