function Toolbox($scope){
    $scope.tools = [
        {   'groupName':'Wymuszenia',
            'items': [ {   'id':'step','name':'step','type':'step',},] },
        {   'groupName':'Wymuszenia',
            'items': [ {   'id':'scope','name':'scope','type':'scope',},] },
        
       
    ];
     
}

function Page($scope){
    $scope.objects = [
        
    ];
    
    $scope.temps = [];
    $scope.addTemp = function(name){
                
        $scope.temps.push({
           'name':name,
           'type':name,
        });
        
                
        $scope.$apply();
    }
    
    $scope.updateTemp = function(position)
    {
        $('#temp').css({'top':position.top,'left':position.left-$('#toolbox').width()});
    }

    $scope.removeTemp = function(){
        $scope.temps = [];
        $scope.$apply();
    }
    
    $scope.removeObject = function(id){
        var oldObjects = $scope.objects;
        //console.log(id);
        $scope.objects = [];
        angular.forEach(oldObjects, function(object) {
            //console.log(object);
            if (object.settings.id!==id) $scope.objects.push(object);
          });
        //console.log($scope.objects);
    }
    
    $scope.getObject = function(id){
        return _.filter($scope.objects,function(obj){return obj.settings.id===id;});        
    }
    var ppp=0;
    $scope.addObject = function(position, toolboxWidth, id){
        //console.log(toolboxWidth);
        var pos = [positions.bottom,positions.top];
        var blockId = id+getMaxID();
        
        var constructor = {'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':parseInt(position.left),
                                 'top':position.top,
                            } 
       
        switch (id){
            case 'step':
                    var block = new Step(constructor);
                break;
                
            case 'scope':
                    var block = new Scope(constructor);
                break;
            case 'integrator':
                    var block = new Integrator(constructor);
                break;
           case 'sum':
                    var block = new Sum(constructor);
                break;
            case 'feedback':
                    var block = new Feedback(constructor);
                break;
            case 'constant':
                    var block = new Constant(constructor);
                break;
            case 'gain':
                    var block = new Gain(constructor);
                break;
             case 'transferFcn':
                    var block = new Gain(constructor);
                break;
            case 'square':
                var block = new Gain(constructor);
                break;
            case 'multiply':
                var block = new Multiply(constructor);
            break;
           
        }
              
       
        
        $scope.objects.push( block ) ;
        
        $scope.$apply();
        
        block.setJsPlumb();
       
        block.updatePosition(); 
        block.setConnectors();
        
       
        return blockId;
                
    }
    
    $scope.updatePosition = function(top,left)
    {
        
        $('#'+getLastID()).css({'top':top,'left':left});
        
    }
    
    
    $scope.updateScope = function(id, parameters)
    {
        //$scope.$watch();
        console.log(parameters);
        console.log(id);
        angular.forEach($scope.objects, function(object) {
           
            if (object.settings.id===id) {
                console.log(object);
                console.log(parameters);
                if(object.settings.type!=='sum')
                {
                    object.previousValues = parameters;
                    
                }
                else
                {
                    console.log(object.parameters[0]);
                   object.parameters[0] = $.extend({},object.parameters[0],parameters);
                }
                console.log(object);
               
                object.updateParameters();
                
            }
        });
        
        $scope.$apply();
        console.log($scope.objects);
        
    }
    
  
  
    function getMaxID(){
        return ($scope.objects.length);
    }
    function getLastID(){
        return ($scope.objects[($scope.objects.length-1)].settings.id);
    }
    
    
    
}
