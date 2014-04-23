var MathFcn = function(config){
    var basicConfig = {
        'id' : 'mathfcn',
        'name' : 'mathfcn',
        'type' : 'mathfcn',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left, 'func':''},
                   
                    ],
        'outPos' : [{'position':positions.right, 'func':''}],
      

    };
    
    updateFunc(basicConfig.inPos);
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.previousValues = { 'mathfcn': 'u*u'};
    this.endpoints = $.extend([],this.endpoints,[]);
   
    
  
    this.parameters = [
       {   
            'type' : 'text',
            'label' : 'Funkcja',
            'value' : 'u*u',
            'id' : 'mathfcn',
          
           
        },
     
        
       
    ];
   
    this.outputValue();
    
    
    //function buildParameters
    
   
}


MathFcn.prototype = new Block();

MathFcn.prototype.outputValue = function(u,h){
    var outVal = 1;
      console.log(this.previousValues);
    outVal = eval(this.previousValues.mathfcn);
    console.log(outVal);
    return outVal;
}

