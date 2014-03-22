var MathFcn = function(config){
    var basicConfig = {
        'id' : 'mathfcn',
        'name' : 'mathfcn',
        'type' : 'mathfcn',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left, 'func':'mul'},
                   
                    ],
        'outPos' : [{'position':positions.right}],
        

    };
    
    updateFunc(basicConfig.inPos);
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.previousValues = 'u*u';
    this.endpoints = $.extend([],this.endpoints,[]);
   
     console.log(this.endpoints);

  
    this.parameters = [
       {   
            'type' : 'text',
            'label' : '',
            'value' : 'u*u',
            'id' : 'mathfcn',
          
           
        },
     
        
       
    ];
   
    this.outputValue();
    
    
    //function buildParameters
    
   
}


MathFcn.prototype = new Block();
MathFcn.prototype.updateParameters = function(){
  
    var allParams = $('#'+this.settings.id+'Parameters').find('.boxParameterContent');
    var singleParam =  allParams.find('#'+this.settings.id+this.parameters[0].id);
    this.previousValues = singleParam.val();
   
  /*
   this.settings.inPos.length = 0;
   
   for(var i=0; i< this.parameters[0].value.length; i++) 
       this.settings.inPos.push({'position':this.parameters[0].value[i],'func':this.parameters[0].func[i]});
   
   updateFunc(this.settings.inPos);
   
   
   
   this.settings.in = this.parameters[0].value.length;
   this.previousValues = buildPreviousValuesObject(this.settings.inPos);
   
  
   for(var j=0; j< this.endpoints.length; j++)
       jsPlumb.deleteEndpoint(this.endpoints[j]);
   
   this.endpoints.length = 0;
   */
  // this.setConnectors();
 //  this.updatePosition();
   
}
MathFcn.prototype.outputValue = function(u,h){
    var outVal = 1;
      
    outVal = eval(this.previousValues);
    
    return outVal;
}

