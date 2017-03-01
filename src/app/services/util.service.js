(function(){
'use strict';                                                                                                                                                                                            
 angular.module('agwUi')                                                                                                                                                                        
   .factory('util', function(moment) {                                                                                                                                                   
     return {                                                                                                                                                                                                              
       extractValue: function() {   
         //Do something here
       },
       getGreeting: function(){
            var greeting, period;
            var time = moment().format('H');
            if(time > 6 && time <= 11){
                greeting = 'Good Morning!';
                period = 'morning';
            } else if (time > 11 && time <= 18){
                greeting = 'Afternoon!';
                period = 'afternoon';
            } else if(time > 18 && time <= 23){
                greeting = "Evening!";
                period = 'evening';
            } else {
                greeting = "Go to sleep!"
                period = 'super-late';
            }
            return {greeting: greeting, period: period};
        }
    }
	});
})();