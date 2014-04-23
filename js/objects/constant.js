var Constant = function(config,prevVal,params){
   
    var basicConfig = {
        'id' : 'constant',
        'name' : 'constant',
        'type' : 'constant',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
    
    this.previousValues = {
        'end' : 1,
        
    };
    
    this.previousValues = $.extend({},this.previousValues,prevVal);
    
    this.parameters = [
        
        {   
            'type' : 'range',
            'label' : 'Wartoœæ koñcowa',
            'value' : this.previousValues.end,
            'id' : 'end',
        },
       
    ];
    
    this.parameters = $.extend({},this.parameters,params);
}

Constant.prototype = new Block();
Constant.prototype.outputValue = function(y,h,time){
    return this.previousValues.end;      
   
}