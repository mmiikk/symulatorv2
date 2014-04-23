var Block = function(){
    var settings = {
        'id' : 'block',
        'name' : 'block',
        'type' : 'block',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [],
        'outPos' : [{'position':positions.right}],
        'inFunc' : [],
        'outFunc' : [null],
    };
   
    this.settings = settings;
    this.endpoints = [];
    
    
    this.updateParameters = function(){
      
      var allParams = $('#'+this.settings.id+'Parameters').find('.boxParameterContent');
      
      for (var i=0;i<this.parameters.length;i++)
      {
          var singleParam =  allParams.find('#'+this.settings.id+this.parameters[i].id);
          console.log(singleParam);
          this.previousValues[this.parameters[i].id] = singleParam.val();
      }
      var singleParam =  allParams.find('#'+this.settings.id+'label');
    console.log(singleParam);
     this.settings.name = singleParam.val();
      
      
    };
    
    
    
        
}

Block.prototype.setFromFile = function(other){
     this.previousValues = $.extend({},this.previousValues,other.previousValues);
    console.log(other.previousValues);
     console.log(this.parameters);
     
     if(this.hasOwnProperty('parameters'))
     {
        for(var i=0;i<this.parameters.length;i++)
       {
          console.log(other.previousValues[this.parameters[i].id]);
          this.parameters[i].value = other.previousValues[this.parameters[i].id];
       }
     }
}


Block.prototype.updateParameters = function(){
    
    for(var i=0;i<this.parameters.length;i++)
    {
       
       this.parameters[i].value = this.previousValues[this.parameters[i].id];
    }
   
}



Block.prototype.outputConfig = function(){
    return this.settings;        
}
Block.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Block.prototype.updatePosition = function(){
    $('#'+this.settings.id).css('top',this.settings.top);
    $('#'+this.settings.id).css('left',this.settings.left);
    
    $(document).ready(updatePosition(this.settings.id,this.settings));
   
    function updatePosition(id,set){
        return function(){
            $( '#'+id).on( "drag", function( event, ui ) {
                set.top = parseInt($('#'+id).css('top'));
                set.left = parseInt($('#'+id).css('left'));
            });
            
        };
    }
}

Block.prototype.setConnectors = function(){
    
    for(var i=0;i<this.settings.in;i++)
        jsPlumb.ready(addTarget(this.settings.id,this.settings.inPos[i],this.settings.inFunc[i],this.endpoints));
    
    for(var i=0;i<this.settings.out;i++)
        jsPlumb.ready(addSource(this.settings.id,this.settings.outPos[i],this.settings.outFunc[i],this.endpoints));
    
     
    function addSource(id,position,label,endpoints){
           console.log(id,position,label,endpoints);
        return function(){
            var endPoint = jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                anchor:position.position,
                isSource: true,
              //  connector: connectorSettings,
                connectorStyle: connectorPaintStyle,
              //  overlays:   [[ "Label", { label:label, id:"label", location:[-0.5, -0.5] } ]],
             //   paintStyle:{ fillStyle:"#1e8151",radius:7 },
               
                
            });
            console.log(endPoint);
            endpoints.push(endPoint);
        };
     }
    
     function addTarget(id,position,func,endpoints){
         
        var symbol;
        console.log(position);
        if(position.hasOwnProperty('func'))
        {
            console.log(position.func);
            if(position.func!==null)
            {
                if(position.func.indexOf('add')!=-1)
                    symbol='+';
                else if(position.func.indexOf('sub')!=-1)
                    symbol='-';
            }
        }
         
        return function(){
            
            var endPoint = jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                connectorPaintStyle: connectorPaintStyle,
                paintStyle:{ 
                        strokeStyle:"#1e8151",
                        fillStyle:"transparent",
                        radius:7,
                        lineWidth:2 
                },	
                anchor:position.position,
                isTarget: true,
                connector: connectorSettings,	
                parameters:{ 
                    'func' : position.func,
                },
                overlays:   [[ "Label", { label:symbol, id:"label", location:position.funcPos, cssClass:"sumLabelCss" } ]],
            });
            endpoints.push(endPoint);
        };
    }
}
Block.prototype.setParametersDraggable = function(){
    $(document).ready(setParametersDraggable(this.settings.id));
   
    function setParametersDraggable(id){
        return function(){
            $( '#'+id+'Parameters').draggable();
            
        };
            
    } 
    
    $(document).ready(setInputText(this.settings.id));
   
    function setInputText(id){
        return function(){
           $( "input[type=text]").keypress(function(e){
              if($(this).hasClass("text"))
                  console.log('a');
              
               if($(this).hasClass("numeric"))
               {
                   if(!$.isNumeric(String.fromCharCode(e.keyCode)) && e.keyCode!==46)
                        e.preventDefault();
                    if(e.keyCode===46)
                    {
                        if($(this).val().indexOf(".")!==-1) 
                            e.preventDefault();
                    }
               }
               
               if($(this).hasClass("addsub"))
               {
                   if(String.fromCharCode(e.keyCode) !== '+' && String.fromCharCode(e.keyCode) !== '-')
                       e.preventDefault();
               }
                  console.log();
                  
                  console.log($(this).attr('class'));
                  
                  
           });
            
        };
            
    } 
}