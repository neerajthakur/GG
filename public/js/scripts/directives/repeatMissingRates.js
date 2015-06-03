angular.module('draymasterApp')
.directive('repeatMissingRates', function() {
    return {
      require: '^missingRatesDataTable',
      link: function(scope, element, attrs, missingRatesCtrl) {
        var rates = missingRatesCtrl.provideRates();
        var html = '';
        for(var i=0; i < rates.length; i++) {
          html +=  "<tr class='clickable-missing-rate'>"+
                   "<td class='hidden'>"+i+"</td>"+
                   "<td>"+rates[i].city+"</td>"+
                   "<td>"+rates[i].state+"</td>"+
                   "<td>"+rates[i].zip+"</td>"+
                   "<td>"+rates[i].miles+"</td>"+
                   "</tr>";
        }
        element.append(html);
      }
    };
});