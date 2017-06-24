
(function ( angular ) {
	'use strict';

	angular.module( 'angularMultiSelect', [] ).directive("multiSelect", function($document){
 var template =  "<div class='multiSelectContainer' style='width: 120px; position: relative;'> <div id='input' class='titleSelect' style='height:24px; width:100px;border:1px solid #d4d9e3;border-radius:15px;font-size: 12px;text-align: center;' ng-click='toggleAction()'>{{selectedName}}</div>";      
 	 template += "<div class='filterAndDropdown' ng-show='drop' style=' width: 120px; max-height: 200px; overflow: auto;  text-align: center;  border: 1px solid #ccc; border-radius: 3px; background-color: #fff; position: absolute;   z-index: 100;   top: 33px;'>";
 	 template += "<ul class='menuDrop' style='list-style: none;'><li style='text-align:left;'><input type='checkbox' class='selectAll' ng-checked='isAll' ng-click='selectAll($event,data)'/>全选</li>";
 	 template += "<li ng-repeat='item in data' style='text-align:left' >";
 	 template += "<input type='checkbox'  ng-checked='isChecked(item.id)' ng-click='checkboxClick(item,$event)'/> {{item.name}}</li></ul></div></div>";
	 return {
	 	restrict:"AEC",
	 	template:template,
	 	scope:{
	 	
	 		type:"@",
	 		data:'=',
	 		itemClicked: '&',
	 		
	 	},
	 	link:function(scope, element, attrs, controller){
	 		//$compile(element.contents())(scope);
	 		
	 	},
	
	 	controller:function($scope){
	 	
	 		function contains(collection, target) {
	 			var containsTarget = false;
	 			collection.some(function(object){
	 				if (object === target) {
	 					containsTarget = true;
	 					return true;
	 				}
	 				return false;
	 			});
	 			return containsTarget;
	 		 }  
	 		
	 	$document.on('click', function(e){
	 			 
	 			   
				if ($scope.drop){
					var  target = e.target.parentElement;
					var  parentFound = false;

					while (angular.isDefined(target) && target !== null && !parentFound) {
						if (!!target.className.split && contains(target.className.split(' '), 'multiSelectContainer') && !parentFound) {
						
								parentFound = true;
						
						}
						target = target.parentElement;
					}

					if (!parentFound) {
						 $scope.$apply(function(){
						  $scope.drop=false;
						});
						
					}
				}
			});   
	 		 				 		
	 	    $scope.selectedName="";	
	 		$scope.selectedName="全选"; 		 		 	 		 	 	  	 		
			$scope.selecteditems = "";
			$scope.titleShow = true;
			$scope.isAll=true;
			var selecteditem = [];
			var selectedName=[];
			var item={id:"",name:""};
		    var map = Array.prototype.map;
	
		    
		 var watch= $scope.$watch('data',function(newValue,oldValue,scope){
			 
               if(newValue){            	              
			       selecteditem = map.call(newValue, function(value) { return value.id; });
			       selectedName= map.call(newValue, function(value) { return value.name; });
			       watch();
               }
               
		    

		  });
		 
		
			
			$scope.selectAll=function($event,values){
			
				 
                     var checkbox = $event.target;
		             var action = (checkbox.checked?'add':'remove');
		            
		             var map = Array.prototype.map
		        
		         
	        	    	  if(action == 'add' ){
	        	    		
	        	    	 
	        	    	       selecteditem = map.call(values, function(value) { return value.id; });
	        	    	       selectedName=map.call(values,function(value){return value.name;});
	        	    	       
	        	    	      
	       		               
	      	               
	      	            }else if(action == 'remove' ){
	      	            	 selecteditem = [];
	      	            	 selectedName=[];
			      	            
	      	             }
                     ($scope.itemClicked|| angular.noop)({
                                 $item: {id:selecteditem,name:selectedName},
                                 $type: $scope.type,
                                });
                     $scope.selectedName=selectedName.toString();	
                      
			      }

			$scope.checkboxClick = function(item,$event){
				 console.log("innerdrop"+ $scope.drop);
			       $scope.isAll=false;
				var idx = selecteditem.indexOf(item.id);
					if($scope.inputType ==="radio"){
						selecteditem = [];
					}
				    if (idx > -1) {
				      selecteditem.splice(idx, 1);
				      selectedName.splice(idx,1);

				      console.log('names'+selectedName);
				    }else {
				      selecteditem.push(item.id);
				      selectedName.push(item.name);
				    }

					//$scope.selecteditems = selecteditem.join();

				    if(selecteditem.length>0){
				    	$scope.titleShow = false 
				    }else{
				    	$scope.titleShow = true
				    }

                   ($scope.itemClicked|| angular.noop)({
                    $item:{id:selecteditem,name:selectedName},
                    $type: $scope.type,
                });
                   
                   $scope.selectedName=selectedName.toString();	

				}
			$scope.isChecked = function (item){
				    
			 	return selecteditem.indexOf(item) > -1;
			}									
	 		$scope.dropDowncontent = true;
	 		$scope.toggleAction = function(){
	 		  	$scope.drop=!$scope.drop;
	 			
	 		}
	 		
	 		$scope.hideSelect=function(){
	 			$scope.drop=false;
	 		}
	 		

	 	 
	 	  
	 	}
	 }
});

})( angular );
