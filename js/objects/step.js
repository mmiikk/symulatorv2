var Step = function(config){
   
    var basicConfig = {
        'id' : 'step',
        'name' : 'step',
        'type' : 'step',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
    
    this.previousValues = {
        'start' : 0,
        'end' : 1,
        'delay' : 0,
    };
    
    this.parameters = [
        {   
            'type' : 'numeric',
            'label' : 'Wartość początkowa',
            'value' : this.previousValues.start,
            'id' : 'start',
        },
        {   
            'type' : 'numeric',
            'label' : 'Wartość końcowa',
            'value' : this.previousValues.end,
            'id' : 'end',
        },
        {   
            'type' : 'numeric',
            'label' : 'Opóźnienie',
            'value' : this.previousValues.delay,
            'id' : 'delay',
        }
    ];
    
    console.log(this.parameters);
  
}

Step.prototype = new Block();
Step.prototype.outputValue = function(y,h,time){
    console.log(this.previousValues.end);
    if(time>=this.previousValues.delay)
        return this.previousValues.end;      
    else
        return this.previousValues.start;
}