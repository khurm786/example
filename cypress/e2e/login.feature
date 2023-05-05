Feature: Login to Application

  As a valid user
  I want to log into the application

  Scenario: Valid login
    Given I open the login page
    When I enter valid credentials
    And I click login
    Then I should see the homepage

  Scenario: Invalid Credentials
    Given I open the login page
    When I enter invalid credentials
    And I click login
    Then I should see a validation error message

  Scenario: API is Offline
    Given I open the login page
    When I enter valid credentials
    And The API is offline
    And I click login
    Then I should see a server error message

  