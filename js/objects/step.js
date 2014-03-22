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
    
    this.updateParameters = function(){
      
      var allParams = $('#'+this.settings.id+'Parameters').find('.boxParameterContent');
      for (var i=0;i<this.parameters.length;i++)
      {
          var singleParam =  allParams.find('#'+this.settings.id+this.parameters[i].id);
          this.previousValues[this.parameters[i].id] = singleParam.val();
      }
      
    };
    
    this.previousValues = {
        'start' : 0,
        'end' : 1,
        'delay' : 0,
    };
    
    this.parameters = [
        {   
            'type' : 'text',
            'label' : 'Wartość początkowa',
            'value' : this.previousValues.start,
            'id' : 'start',
        },
        {   
            'type' : 'text',
            'label' : 'Wartość końcowa',
            'value' : this.previousValues.end,
            'id' : 'end',
        },
        {   
            'type' : 'text',
            'label' : 'Opóźnienie',
            'value' : this.previousValues.delay,
            'id' : 'delay',
        }
    ];
}

Step.prototype = new Block();
Step.prototype.outputValue = function(y,h,time){
    console.log(this.previousValues.end);
    if(time>=this.previousValues.delay)
        return this.previousValues.end;      
    else
        return this.previousValues.start;
}