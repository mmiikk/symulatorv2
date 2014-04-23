var Multiply = function(config){
    var basicConfig = {
        'id' : 'multiply',
        'name' : 'multiply',
        'type' : 'multiply',
        'in' : '2',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left, 'func':'mul'},
                    {'position':positions.bottom, 'func':'mul'},
                    ],
        'outPos' : [{'position':positions.right}],
        

    };
    
    updateFunc(basicConfig.inPos);
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.previousValues = buildPreviousValuesObject(basicConfig.inPos);
    this.endpoints = $.extend([],this.endpoints,[]);
   
    
  
    this.parameters = [
       
        
        
       
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
Multiply.prototype = new Block();

Multiply.prototype.outputValue = function(){
    var outVal = 1;
      
    for(var i=0;i<this.settings.inPos.length;i++)
    {
        
        //if(this.settings.inPos[i].func.indexOf('add') === -1)
         //   outVal = parseFloat( outVal - this.previousValues[this.settings.inPos[i].func] );
       // else
       console.log(this.previousValues[this.settings.inPos[i].func]);
           outVal = parseFloat( outVal * this.previousValues[this.settings.inPos[i].func] );
    }
    //console.log(outVal);
    return outVal;
}
Multiply.prototype.updatePreviousValues = function(func,value){
   
    this.previousValues[func]=value;
}
