function Toolbox($scope){
    $scope.tools = [
        {   'groupName':'Wymuszenia',
            'items': [ {   'id':'step','name':'step','type':'step',},
                       {   'id':'pulse','name':'pulse','type':'pulse',},
                       {   'id':'sin','name':'sin','type':'sin',},] },
        {   'groupName':'Wyj≈õcia',
            'items': [ {   'id':'scope','name':'scope','type':'scope',},] },
         {   'groupName':'Ciπg≥e',
            'items': [ {   'id':'integrator','name':'integrator','type':'integrator',},
                        {   'id':'transferFcn','name':'transferFcn','type':'transferFcn',},
            ] },
         {   'groupName':'Inne',
            'items': [ {   'id':'feedback','name':'feedback','type':'feedback',},] },
        {   'groupName':'Operacje matematyczne',
            'items': [ {   'id':'sum','name':'sum','type':'sum',},
                        {   'id':'multiply','name':'multiply','type':'multiply',},
                        {   'id':'mathfcn','name':'mathfcn','type':'mathfcn',},
            ] },
        
       
    ];
     
}

function Page($scope){
    $scope.objects = [];
    $scope.temps = [];
    $scope.properties = [];
    
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
     $scope.getData = function(selector){
        var scope = getObjectByID(selector);
        console.log(scope);
        return scope[0].previousValues;
    }
    $scope.setToInitial = function(){
        var scope = getObjectByType('scope');
       //console.log(length(scope));
        for(var i=0; i<scope.length; i++)
        {
            scope[i].previousValues = [];
        }
       
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
    
    function getObjectByID(id){
        return _.filter($scope.objects,function(obj){return obj.settings.id===id;});        
    }
    function getObjectByType(type){
        return _.filter($scope.objects,function(obj){return obj.settings.type===type;});        
    }
    
    $scope.getObject = function(id){
        return getObjectByID(id);
    }
    
    var ppp=0;
    $scope.addObject = function(position, toolboxWidth, id,fromFile){
        //console.log(toolboxWidth);
        var blockId;
       var constructor;
       if(!fromFile)
       {
            blockId = id+getMaxID();
            constructor = {'id':id+getMaxID(),
                                     'name':id + ' ' + getMaxID(),
                                     'left':parseInt(position.left),
                                     'top':position.top,
                                } 
        } else {
            blockId = position.settings.id;
            constructor = position.settings;
            id=position.settings.type;
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
                    var block = new TransferFcn(constructor);
                break;
            case 'square':
                var block = new Gain(constructor);
                break;
            case 'multiply':
                var block = new Multiply(constructor);
            break;
             case 'mathfcn':
                var block = new MathFcn(constructor);
            break;
              case 'pulse':
                var block = new Pulse(constructor);
            break;
              case 'sin':
                var block = new Sin(constructor);
            break;
           
        }
              
       
        
        $scope.objects.push( block ) ;
                
        
        $scope.$apply();
        
        if(fromFile)
        {
            block.setFromFile(position);
            if (id==='transferFcn') 
            {console.log('aaaa');
                block.buildArrays();
            }
        }
        
        $scope.$apply();
        block.setJsPlumb();
       
        block.updatePosition(); 
        block.setConnectors();
        block.setParametersDraggable();
        
        
        
       
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
    
    $scope.getObjects = function()
    {
        return $scope.objects;        
    }
    
    $scope.refresh = function()
    {
        $scope.$apply();        
    }
  
    function getMaxID(){
        return ($scope.objects.length);
    }
    function getLastID(){
        return ($scope.objects[($scope.objects.length-1)].settings.id);
    }
    
    
    
}
