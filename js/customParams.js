jsPlumb.ready(function(){
   jsPlumb.Defaults.ConnectionOverlays =[ ["Arrow", { location:1 } ] ]; 
   jsPlumb.Defaults.Connector = [ "Flowchart", {  cornerRadius:5, alwaysRespectStubs:true } ];		
});

var connectorSettings = [ "Flowchart", {  cornerRadius:5, alwaysRespectStubs:false, midPoint: 1 } ];

var positions = {
  
  left: [ 0, 0.5, -1, 0 ],
  leftBottom: [ 0.15, 0.85, 1, 0 ],
  top:   [ 0.5, 0 , -0.5, 0],
  leftTop: [ 0.15, 0.15, -1, 0 ],
  bottom:   [ 0.5, 1 , 0, 1],
  rightBottom: [ 0.85, 0.85, -1, 0 ],
  right:  [ 1, 0.5, 1, 0 ],
  rightTop: [ 0.85, 0.15, -1, 0 ],
  
  
  
};
var positionsSum = {
  
  left: [ 0, 0.5, -1, 0 ],
  leftBottom: [ 0.15, 0.85, 1, 0 ],
  top:   [ 0.5, 0 , -0.5, 0],
  leftTop: [ 0.15, 0.15, -1, 0 ],
  bottom:   [ 0.5, 1 , 0, 1],
  rightBottom: [ 0.85, 0.85, -1, 0 ],
  right:  [ 1, 0.5, 1, 0 ],
  rightTop: [ 0.85, 0.15, -1, 0 ],
  
  
  
};

var connectorPaintStyle = {
				lineWidth:4,
				strokeStyle:"#deea18",
				joinstyle:"round",
				outlineColor:"#eaedef",
				outlineWidth:2
			};
                       
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
       
       

       
 $(function () {

        // Button
        $("#button").button();
        $("#button-disabled").button().addClass("ui-state-disabled").attr("disabled", true);
         $("#accordion").accordion({ header: "h3" });
     
     $('#dialog_link, .icons li').hover(
					function () { $(this).addClass('ui-state-hover'); },
					function () { $(this).removeClass('ui-state-hover'); }
				);
                        
                        
         $('#toolbox').draggable();
         $('#toolbox').resizable();
         $('#simulationParamsBox').draggable();
           
         $('#page .block').each(function(){
            $(this).resizable(); 
         });
 });
 
 $(document).ready(function(){
    $('#run').click(function(){
      angular.element('[ng-controller=Page]').scope().setToInitial();
      
      
      $().solver('init',[jsPlumb.getAllConnections(),angular.element('[ng-controller=Page]').scope().objects,
          $('#timeHorizon').val(),$('#integrateStep').val()]);   
    });
    
    $('#save').click(function(){
        var  data = angular.element('[ng-controller=Page]').scope().getObjects();
        saveToFile(data);
        //tfc(1,0.5,0);
        download('test.txt', saveToFile(data));
    });
    
    
   
    $('#open').click(function(e){
       $('#files').click();

    });
    
     $('#files').change(function(evt){
         console.log(loadFromFile(evt));
         
        
         console.log(files);
     });
    
    
     $('#simulationParams').click(function(){
         console.log('a');
         $('#simulationParamsBox').toggleClass('boxClosed'); 
     });
    $('#simulationParamsBox .boxClose').click(function(){
       $('#simulationParamsBox').toggleClass('boxClosed'); 
    });
    
    
    $('.block').each(function(){
       console.log($(this).id); 
        
    }); 
     
    $('#showToolbox').click(function(){
       $('#toolbox').toggleClass('boxClosed'); 
    });
    $('#toolbox .boxClose').click(function(){
       $('#toolbox').toggleClass('boxClosed'); 
    });
    
    $('#simulationParamsBox input[type=text]').each(function(){
       $(this).keypress(function(e){
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
       }) ;
    });
    
     $('.spacer').each(function(){
     
      $(this).draggable({
           start: function(event, ui){
               //add  temporary object to page
               angular.element('[ng-controller=Page]').scope().addTemp($(this).children()[0].id);
               $(this).children().addClass('invisible');
               
           },
           drag: function( event, ui ) {
               //update temporary object position
               angular.element('[ng-controller=Page]').scope().updateTemp($(this).offset());
           },
           stop: function( event, ui ) {
              
               //remove temporary objevy
               angular.element('[ng-controller=Page]').scope().removeTemp();
               
               $(this).children().removeClass('invisible');
               id = angular.element('[ng-controller=Page]').scope().addObject( $(this).offset(), $('#toolbox').width(), $(this).children()[0].id  );
               
               //set resizable
               //
              // $('#'+id).resizable(); 
             
                //set block to default position
               $(this).css('left','0px');
               $(this).css('top','0px');
           }
       }); 
       
             
   });
    
 });
 
 
function clickable(selector){
    return function(){
        
          var obj = $('#page').find('#'+selector);
        obj.contextPopup({
        title: 'My Popup Menu',
        items: [
          
          {label:'Edytuj', icon:'lib/images/page_white_edit.png',    action:function() { return edit() } },
          {label:'Usuñ',     icon:'lib/images/page_white_delete.png', action:function() { return dele() } },
        ]});

        function dele(){
            
            var endpoints = angular.element('[ng-controller=Page]').scope().getObject(selector);
            angular.element('[ng-controller=Page]').scope().removeObject(selector);

             for(var j=0; j< endpoints[0].endpoints.length; j++)
                  jsPlumb.deleteEndpoint(endpoints[0].endpoints[j]);
             jsPlumb.detachAllConnections(selector);


             angular.element('[ng-controller=Page]').scope().refresh();
            
            console.log(angular.element('[ng-controller=Page]').scope().getObjects());
        }

        function edit(){
            
             var params = $('#page').find('#'+selector+'Parameters');
               params.removeClass('boxClosed');
               var closeParams = params.find('.boxClose');
               closeParams.click(function(){
                   params.addClass('boxClosed');
               })
               
               var save = params.find('input[type=submit]');
               save.each(function(){
                  $(this).button();
                  $(this).click(function( event ) {
                      if(obj.hasClass('scope'))
                        {
                            var data = angular.element('[ng-controller=Page]').scope().getData(selector);
                            var toSave = '';
                            for(var i=0; i<data.length;i++)
                                toSave += data[i][0]+'\t'+data[i][1]+'\r\n';
                            download(selector+'.txt', toSave);
                        }
                                          
                    event.preventDefault();
                  });
                  
               });
               
               if(obj.hasClass('scope'))
               {
                 
                  var data = angular.element('[ng-controller=Page]').scope().getData(selector);console.log(data);
                  console.log('#'+selector+'plotPlot');
                  $('#'+selector+'plotPlot').addClass('plotArea');
                   $.plot('#'+selector+'plotPlot',[data])
               }
             
            
        }
        
        
        // $('.context-menu-one').on('click', function(e){
        
       // if(this === 'edit')
        
       // console.log('clicked', this);
   // })
      
    
         
        
    };
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

