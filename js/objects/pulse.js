var Pulse = function(config){
   
    var basicConfig = {
        'id' : 'pulse',
        'name' : 'pulse',
        'type' : 'pulse',
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
            'label' : 'Amplituda',
            'value' : this.previousValues.amplitude,
            'id' : 'amplitude',
        },
        {   
            'type' : 'numeric',
            'label' : 'Czêstotliwosæ',
            'value' : this.previousValues.freq,
            'id' : 'freq',
        },
       
    ];
    
    
  
}

Pulse.prototype = new Block();
Pulse.prototype.outputValue = function(y,h,time){
    console.log(time - parseInt(time));
    
    var period = (1/this.previousValues.freq);
    console.log(period);
    if(time >= parseInt(time/period)*period && time < parseInt(time/period)*period + period/2 )
        return 0;
    else
        return parseFloat(this.previousValues.amplitude);
    
    /*
    if(time - parseInt(time) < 1/(2*parseFloat(this.previousValues.freq)))
        return 0;
    else
        return parseFloat(this.previousValues.amplitude)
    */
    
}