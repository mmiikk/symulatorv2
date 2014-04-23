function saveToFile(data){
    
    var connections =[];
    var dataToSave = 'dataToRead=[';
    console.log(data);
    for(var i=0; i<data.length;i++)
    {
        dataToSave += "{";
        dataToSave += "'settings':";
        dataToSave += JSON.stringify(data[i].settings);
        dataToSave += ",'parameters':";
        dataToSave += JSON.stringify(data[i].parameters);
        dataToSave += ",'previousValues':";
        dataToSave += JSON.stringify(data[i].previousValues);
        
        
        dataToSave += "},";
        
    }
    dataToSave += "];"
    
    dataToSave += "connections=[";
    getConnections(jsPlumb.getAllConnections());
           //dataToSave +=  connections;
    for(var i=0; i<connections.length;i++)
    {
        dataToSave +=  JSON.stringify(connections[i]);
        dataToSave += ",";
    }
    console.log(connections);
    dataToSave += "];";
    
        //console.log(data[i].settings.type);
       // dataToSave += data[i];
   
   
console.log(dataToSave);
    return dataToSave;

    
    function getConnections(plumbConnectors){
        for(i=0;i<plumbConnectors.length;i++)
            {
                connections.push({
                   targetId : plumbConnectors[i].targetId,
                   targetIdParam : plumbConnectors[i].getParameter('func'),
                   sourceId : plumbConnectors[i].sourceId,
                   sourceIdParam : plumbConnectors[i].getParameter('func'),
                });                
            }
    }
}
