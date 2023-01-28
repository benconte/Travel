// all user test for the app

describe("visit_country", () => {
  it("user can visit a country", () => {
    // first user visits page
    cy.visit("http://localhost:3000/");

    // user can login
    cy.findByRole("textbox").type("admin@gmail.com");
    cy.findByPlaceholderText(/password/i).type("localhost");
    cy.findByRole("button", { name: /login/i }).click();

    // user can change theme to light or dark
    cy.findByRole("switch", { name: /use setting/i }).click();

    // wait for page to fully load the countries
    cy.intercept("GET", "https://restcountries.com/v3.1/all").as("getCountries");
    cy.wait("@getCountries");

    // user can filter by continents
    cy.findByRole("button", { name: /filter by region dropdown/i }).click();
    cy.findByText(/europe/i)
    cy.findByRole("button", { name: /filter by region dropdown/i }).click();

    // user can search a country
    cy.findByRole('searchbox').type("France")

    // user can add/remove country to tovissit
    cy.findByRole('button', {  name: /check/i}).click()

    // user can view country
    cy.get('#root > div > div > main > div:nth-child(2) > div:nth-child(2) > div > a').click()

    // user visits the tovisit page
    cy.findByRole('link', {  name: /to visit/i}).click();

    // user can visit a country from tovisit
    cy.findByRole('button', {  name: /visit/i}).click()

    // user can remove country from tovisit
    // cy.findByRole('button', {  name: /check/i}).click()

    // user can view visited countries
    cy.findByRole('link', {  name: /visited/i}).click();

    // user can remove country from visited
    // cy.findByRole('button', {  name: /check/i}).click()

    // user can clear all countries in visited
    cy.findByRole('button', {  name: /clear all/i}).click()

    // user can click profile
    cy.findByRole('img', {  name: /profile/i}).click()

    // user can logout
    cy.findByRole('button', {  name: /logout/i}).click()
  });
});
