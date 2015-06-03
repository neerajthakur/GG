exports.config = {
  
  specs: [
    '../../test/e2e/**/*.spec.js'
  ],
  
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  
  baseUrl: 'http://www.dm2.branch/'
  
};