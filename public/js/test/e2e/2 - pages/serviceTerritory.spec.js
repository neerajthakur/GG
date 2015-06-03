describe('service territory page', function() {

  beforeEach(function() {
    browser.get('/territory/create');
  });

  it("should load the header", function() {
    var header = element(by.css('#content-header h1'));
    expect(header.getText()).toBe('Create New Service Territory');
  });
  
  it("should find valid terminals in Chicago", function() {
    var name = element(by.model('serviceTerritory.name'));
    var city = element(by.model('serviceTerritory.city'));
    browser.sleep(2000); //allow time for services to load
    name.sendKeys('Chicago Area');
    city.sendKeys('Chicago, IL');
    element(by.id('citySearch')).click().then(function() {
      browser.sleep(1000); //allow time terminals to load
      var elems = element.all(by.repeater('terminal in search.terminals'));
      expect(elems.count()).toBeGreaterThan(0);
    });
  });
  
});
