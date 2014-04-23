function loadFromFile(evt)
{
    var files = evt.target.files; // FileList object    

    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        bob = reader.result;
        
        var str = bob;
        
        var loadedArray = eval(str);
        console.log(connections);
        console.log(dataToRead);
        
        for(var i=0;i<dataToRead.length;i++)
        {
            console.log(dataToRead[i]);
            angular.element('[ng-controller=Page]').scope().addObject( dataToRead[i], $('#toolbox').width(), 'step',true  );
            
            
            
        }
        console.log(connections);
        
        for(var i=0;i<connections.length;i++)
        {
            var s = new Object();
            var t = new Object();
            var obj = angular.element('[ng-controller=Page]').scope().getObject(connections[i].sourceId);
            
            for(var j=0; j<obj[0].endpoints.length;j++)
            {
                if(obj[0].endpoints[j].isSource)
                {
                 //   console.log(obj[0].endpoints[j]);
                 console.log(obj[0].endpoints[j].isFull());
                   if(!obj[0].endpoints[j].isFull())
                    {
                        s = obj[0].endpoints[j];
                        break;
                    }
                }
            }
            obj = angular.element('[ng-controller=Page]').scope().getObject(connections[i].targetId);
            
            for(var j=0; j<obj[0].endpoints.length;j++)
            {
                if(obj[0].endpoints[j].isTarget)
                {
                    if(obj[0].endpoints[j]._jsPlumb.parameters.func === connections[i].targetIdParam)
                    {
                        t = obj[0].endpoints[j];
                        break;
                    }
                }
            }
            
            
            console.log(t);
            var f = jsPlumb.connect({source:s,           target:t});
            
           // console.log(f);
            
           // angular.element('[ng-controller=Page]').scope().addObject( dataToRead[i], $('#toolbox').width(), 'step',true  );
            
            
            
        }
        
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
    };
    
  

   
    reader.readAsText(file);


}