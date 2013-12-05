var Constant = function(config){
   
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
    
    this.parameters = [
        
        {   
            'type' : 'range',
            'label' : 'Warto�� ko�cowa',
            'value' : this.previousValues.end,
            'id' : 'end',
        },
       
    ];
}

Constant.prototype = new Block();
Constant.prototype.outputValue = function(y,h,time){
    return this.previousValues.end;      
   
}