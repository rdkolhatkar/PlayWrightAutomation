Feature: Error Validation for Client App

  @Parameterization
  Scenario Outline: Placing the order on ecommerce Website
    Given Login to client app ecommerce Website with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username          | password    |
      | rahulshetty       | learning    |
      | rahul             | shetty      |
      | rahulshetty       | Iamking     |
      | anshika@gmail.com | Iamking@000 |
