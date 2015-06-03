describe("login page", function () {
  
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('/');
  });
  
  it("should load the form", function() {
    var ele = by.id('login-form');
    expect(browser.isElementPresent(ele)).toBe(true);
  });
  
  it("should not allow login with no information provided", function() {
    element(by.id('login-btn')).sendKeys('\n').then(function() {
      var ele = by.id('login-form');
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });
  
  it("should not allow a user with no email to login", function() {
    element(by.id('login-password')).sendKeys('asdfg11');
    element(by.id('login-btn')).sendKeys('\n').then(function() {
      var ele = by.id('login-form');
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });
  
  it("should not allow a user with no password to login", function() {
    element(by.id('login-email')).sendKeys('cwillis@tcompanies.com');
    element(by.id('login-btn')).sendKeys('\n').then(function() {
      var ele = by.id('login-form');
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });
  
  it("should not allow an invalid user to login", function() {
    element(by.id('login-email')).sendKeys('cwillis@tcompanies.com');
    element(by.id('login-password')).sendKeys('bad-password');
    element(by.id('login-btn')).sendKeys('\n').then(function() {
      var ele = by.id('login-form');
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });
  
  it("should allow a valid user to login", function() {
    element(by.id('login-email')).sendKeys('cwillis@tcompanies.com');
    element(by.id('login-password')).sendKeys('asdfg11');
    element(by.id('login-btn')).sendKeys('\n').then(function() {
      var ele = by.id('content');
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });
   
});