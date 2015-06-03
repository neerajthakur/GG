angular.module("draymasterApp")
.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex = 0;

		scope.next=function(){
			scope.currentIndex < scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},5000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		angular.element(document.querySelectorAll('.arrow')).one('click',function(){
			$timeout.cancel(timer);
		});

    },
	template: '<div class="slider">'+
			  '<div class="slide" ng-repeat="image in images" ng-show="image.visible">'+
				'<img  ng-src="{{image.src}}" />'+
			  '</div>'+
			  '<div class="arrows">'+
				'<a href="#" ng-click="prev()">'+
				  '<img src="http://extremecss.com/demos/slider/img/left-arrow.png" />'+
				'</a>'+
				'<a href="#" ng-click="next()">'+
				  '<img  src="http://extremecss.com/demos/slider/img/right-arrow.png" />'+
				'</a>'+
			  '</div>'+
			'</div>'
  }
});