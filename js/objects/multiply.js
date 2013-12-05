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
   
     console.log(this.endpoints);

  
    this.parameters = [
        {   
            'type' : 'textPositionsIn',
            'label' : '',
            'value' : [positions.left,positions.bottom],
            'id' : 'ItextPositionsIn',
            'func' : ['mul','mul'],
            'positionsLabel' : ['Prawo','Lewo','D�','G�ra'],
        },
       /* {   
            'type' : 'controlgroup',
            'label' : '',
            'value' : [positions.right],
            'id' : 'subCheckbox',
            'positions' : [positions.right,positions.left,positions.bottom,positions.top],
            'positionsLabel' : ['Prawo','Lewo','D�','G�ra'],
        },*/
        
        
       
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
Multiply.prototype.updateParameters = function(){
  
    
  
   this.settings.inPos.length = 0;
   
   for(var i=0; i< this.parameters[0].value.length; i++) 
       this.settings.inPos.push({'position':this.parameters[0].value[i],'func':this.parameters[0].func[i]});
   
   updateFunc(this.settings.inPos);
   
   
   
   this.settings.in = this.parameters[0].value.length;
   this.previousValues = buildPreviousValuesObject(this.settings.inPos);
   
  
   for(var j=0; j< this.endpoints.length; j++)
       jsPlumb.deleteEndpoint(this.endpoints[j]);
   
   this.endpoints.length = 0;
   
  // this.setConnectors();
 //  this.updatePosition();
   
}
Multiply.prototype.outputValue = function(){
    var outVal = 0;
      

    for(var i=0;i<this.settings.inPos.length;i++)
    {
        
        //if(this.settings.inPos[i].func.indexOf('add') === -1)
         //   outVal = parseFloat( outVal - this.previousValues[this.settings.inPos[i].func] );
       // else
           outVal = parseFloat( outVal * this.previousValues[this.settings.inPos[i].func] );
    }
    //console.log(outVal);
    return outVal;
}
Multiply.prototype.updatePreviousValues = function(func,value){
   
    this.previousValues[func]=value;
}
