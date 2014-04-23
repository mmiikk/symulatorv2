var Sin = function(config){
   
    var basicConfig = {
        'id' : 'sin',
        'name' : 'sin',
        'type' : 'sin',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
    
    this.previousValues = {
        'amplitude' : 1,
        'freq' : 1,
        
    };
    
    this.parameters = [
        {   
            'type' : 'numeric',
            'label' : 'Amplitude',
            'value' : this.previousValues.amplitude,
            'id' : 'start',
        },
        {   
            'type' : 'numeric',
            'label' : 'Czestotliwosc',
            'value' : this.previousValues.freq,
            'id' : 'end',
        },
       
    ];
    
    console.log(this.parameters);
  
}

Sin.prototype = new Block();
Sin.prototype.outputValue = function(y,h,time){
    return this.previousValues.amplitude*Math.sin(this.previousValues.freq*time);
}