angular.module('draymasterApp')
.directive('repeatRates', function() {
    return {
      require: '^ratesDataTable',
      link: function(scope, element, attrs, ratesCtrl) {
        var rates = ratesCtrl.provideRates();
        var html = '';
        for(var i=0; i < rates.length; i++) {
          html +=  "<tr class='clickable-rate'>"+
                   "<td class='hidden'>"+i+"</td>"+
                   "<td>"+rates[i].city+"</td>"+
                   "<td>"+rates[i].state+"</td>"+
                   "<td>"+rates[i].zip+"</td>"+
                   "<td>"+rates[i].miles+"</td>"+
                   "<td>$"+rates[i].price+"<a href='javascript:;' style='color:#f0ad4e;padding-left:5px;'><i class='fa fa-pencil'></i></a></td>"+
                   "<td><input type='checkbox' "+ ((rates[i].freeDrop)? 'checked' : '' ) +" class='free-drop-checkbox'/></td>"+
                   "</tr>";
        }
        element.append(html);
      }
    };
});