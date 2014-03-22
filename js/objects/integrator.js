var Integrator = function(config){
    var basicConfig = {
        'id' : 'integrator',
        'name' : 'integrator',
        'type' : 'integrator',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],
        'outPos' : [{'position':positions.right}],
        'inFunc' : [null],
        'outFunc' : [null],

    };
    this.previousValues = {'start':0};
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.endpoints = $.extend([],this.endpoints,[]);
    this.parameters = [
        {   
            'type' : 'text',
            'label' : 'Wartość początkowa',
            'value' : this.previousValues.start,
            'id' : 'start',
        },];
    
    this.updateParameters = function(){
      
      var allParams = $('#'+this.settings.id+'Parameters').find('.boxParameterContent');
      for (var i=0;i<this.parameters.length;i++)
      {
          var singleParam =  allParams.find('#'+this.settings.id+this.parameters[i].id);
          this.previousValues[this.parameters[i].id] = singleParam.val();
      }
      
    };
}


Integrator.prototype = new Block();
Integrator.prototype.outputValue = function(y,h,time){
    
   
    //var prev = this.previousValues;
    if(time===0)
        return this.previousValues.start ; 
    else
    
        return parseFloat(this.previousValues.start) + y*h;
       
    
}

