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
    
    
}


Integrator.prototype = new Block();
Integrator.prototype.outputValue = function(y,h,time,sourceID){
    
    if(sourceID.toString()===this.settings.id)
    {
    //var prev = this.previousValues;
        if(time===0)
        {
            var prevOut = parseFloat(this.previousValues.start);
            this.previousValues.start = parseFloat(this.previousValues.start) + y*h;
            
            return prevOut ; 
        }
        else
        {
            var prevOut = parseFloat(this.previousValues.start);
            this.previousValues.start = parseFloat(this.previousValues.start) + y*h;
            
            return prevOut ; 
        }
    }
    else
    {
        if(time===0)
            return parseFloat(this.previousValues.start) ; 
        else
            return parseFloat(this.previousValues.start);
            
    }
       
    
}

