var Sum = function(config){
    var basicConfig = {
        'id' : 'sum',
        'name' : 'sum',
        'type' : 'sum',
        'in' : '2',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':[ 0, 0.33, -1, 0 ], 'func':'add', 'funcPos':[1.5,0.33]},
                    {'position':[ 0, 0.667, -1, 0 ], 'func':'sub', 'funcPos':[1.5,0.4]},
                    ],
        'outPos' : [{'position':positions.right}],
        

    };
    
    updateFunc(basicConfig.inPos);
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.previousValues = buildPreviousValuesObject(basicConfig.inPos);
    this.endpoints = $.extend([],this.endpoints,[]);
   
     console.log(this.endpoints);

  
    this.parameters = [
        {   
            'type' : 'addsub',
            'label' : '',
            'value' : '+-',
            'id' : 'sumSetting',
            'func' : ['add','sub'],
            'positionsLabel' : ['Prawo','Lewo','Dó³','Góra'],
        },
      
        
        
       
    ];
   
    this.outputValue();
    
    
    //function buildParameters
    
   
}

function updateFunc(functions){
        for(var i=0;i<functions.length;i++)
        {
            functions[i].func=functions[i].func+i;
        }
}
 function buildPreviousValuesObject(functions)
{
    var prevVal = {};
    for(var i=0;i<functions.length;i++)
    {
        prevVal[functions[i].func]=0;
    }
    return prevVal;
}
Sum.prototype = new Block();
Sum.prototype.updateParameters = function(){
    
    var allParams = $('#'+this.settings.id+'Parameters').find('.boxParameterContent'); 
    var inputsString = allParams.find('#'+this.settings.id+this.parameters[0].id).val();
   this.settings.inPos.length = 0;
   
   var func;
   
   
  
   if(inputsString.length>2)
   {
        $('#'+this.settings.id).css("height",50 + 40*(inputsString.length-2) + "px");
        
        $('#'+this.settings.id).children().children().css("margin-top",50+ 40*(inputsString.length-2) + "px");
    }
    else
    {
        $('#'+this.settings.id).css("height",50 + "px");
        
        $('#'+this.settings.id).children().children().css("margin-top",50+ "px");
    }
   
   var fromTop=0;
   for(var i=0; i< inputsString.length; i++) 
   {
       if(inputsString[i]==='-')
            func = 'sub';
      
        else
               func = 'add';
           
        fromTop = fromTop + 1/ (inputsString.length+1);  
       
       if(func=='sub')
            this.settings.inPos.push({'position':[ 0, fromTop, -1, 0 ],'func':func, 'funcPos':[1.5,fromTop-0.15]});
        else
            this.settings.inPos.push({'position':[ 0, fromTop, -1, 0 ],'func':func, 'funcPos':[1.5,fromTop]});
   }
   
   updateFunc(this.settings.inPos);
   
   
   
   this.settings.in = inputsString.length;
   this.previousValues = buildPreviousValuesObject(this.settings.inPos);
   
  
   for(var j=0; j< this.endpoints.length; j++)
       jsPlumb.deleteEndpoint(this.endpoints[j]);
   
   this.endpoints.length = 0;
   
   this.setConnectors();
   this.updatePosition();
   
}
Sum.prototype.outputValue = function(){
    var outVal = 0;
      

    for(var i=0;i<this.settings.inPos.length;i++)
    {
        
        if(this.settings.inPos[i].func.indexOf('add') === -1)
            outVal = parseFloat( outVal - this.previousValues[this.settings.inPos[i].func] );
        else
           outVal = parseFloat( outVal + this.previousValues[this.settings.inPos[i].func] );
    }
    //console.log(outVal);
    return outVal;
}
Sum.prototype.updatePreviousValues = function(func,value){
   
    this.previousValues[func]=value;
}
