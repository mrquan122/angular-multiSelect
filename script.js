(function(){
  
  //angular module
  var myApp = angular.module('myApp', ['angularMultiSelect']);

  //test controller
  myApp.controller('myController', function($scope){

  	//test tree model 1
      $scope.dataSet=[{id:'001',name:'测试一'},{id:'002',name:'测试二'},{id:'003',name:'测试三'},
                             ];


         /*下拉框选中传值*/
      $scope.itemClicked=function($item,$type){
        
                 console.log(angular.toJson($item));  
       } 
  
  });
  
})();