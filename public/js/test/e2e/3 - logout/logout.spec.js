describe("logout", function() {
  
  it("should redirect to the login page", function() {
    element(by.id('user-options-dropdown')).click();
    element(by.id('logout')).click().then(function() {
      expect(browser.isElementPresent(by.id('login-form'))).toBe(true);
    });
  });
  
});