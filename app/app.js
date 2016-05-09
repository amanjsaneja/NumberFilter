var mApp = angular.module('mApp', []);


mApp.filter('phoneNumber', function() {

  return function(input,country) {
    var listOfCountries =
    {
      "US" : {
        "code" : "+1",
        "format" : "___-___-____"
      },
      "Hong Kong": {
        "code" : "+852",
        "format" : "____-____"
      },
      "Iceland" : {
        "code" : "+354",
        "format" : "___ ____"
      },
      "France"  : {
        "code" : "+33",
        "format" : "_ __ __ __ __"
      },
      "India" :  {
        "code" : "+91",
        "format" : "_____-_____"
      },
      "Other" :  {
        "code" : "",
        "format" : "___-___-____"
      },

    };
    input =input+ '';
    // remove alphabets and '-' from the string
    input = input.replace(/[^\d|\-+|\.+]/g, '');
    input = input.replace(/[-]/g, '');

    //get the current format for the number
    if(listOfCountries[country] == undefined)
      args = listOfCountries["Other"].format;
    else
      args = listOfCountries[country].format;
    //replace the '_' with the number
    for (i = 0; i < input.length; i++)
    {
      args = args.replace("_", input[i]);
    }
    redundant = args.indexOf('_');
    if(redundant != -1)
      args = args.substring(0,redundant);

    args = args.trim();  // Removing blank space at the ends 
       args =  args[args.length -1] == '-' ? args.substring(0, args.length -1 ) : args; // Removing last '-'

      return args;

  }
});

mApp.directive('format', ['$filter', function ($filter) {
  return {
    require: '?ngModel',
    link: function (scope, elem, attrs, ctrl) {

      scope.$watch(attrs.ngModel, function (v) {
        // return if number field is empty
        if(!v) return;

        // remove alphabets and '-' from the string
        v = v.replace(/[^\d|\-+|\.+]/g, '');
        v = v.replace(/[-]/g, '');

        //get the current format for the number
        args = scope.info.getCurrentFormat();
        //replace the '_' with the number
        for (i = 0; i < v.length; i++)
        {
          args = args.replace("_", v[i]);
        }
        redundant = args.indexOf('_');
        //remove the left over format expression
        if(redundant != -1)
          args = args.substring(0,redundant);
        //set the value of the number field
        elem.val(args);

      });

    }
  };
}]);




mApp.controller('ExampleController', ['$scope', function($scope) {
  $scope.info = {
    selectedCountry : "US",
    countryCode : "+1",
    listOfCountries :
    {
      "US" : {
        "code" : "+1",
        "format" : "___-___-____"
      },
      "Hong Kong": {
        "code" : "+852",
        "format" : "____-____"
      },
      "Iceland" : {
        "code" : "+354",
        "format" : "___ ____"
      },
      "France"  : {
        "code" : "+33",
        "format" : "_ __ __ __ __"
      },
      "India" :  {
        "code" : "+91",
        "format" : "_____-_____"
      },
      "Other" :  {
        "code" : "",
        "format" : "___-___-___"
      },

    },

    getCurrentFormat : function(){
      return this.listOfCountries[this.selectedCountry].format;
    }
  };


}] ); //End of controller function

