var TransferFcn = function(config){
    var basicConfig = {
        'id' : 'transferFcn',
        'name' : 'transferFcn',
        'type' : 'transferFcn',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],
        'outPos' : [{'position':positions.right}],
        'inFunc' : [null],
        'outFunc' : [null],

    };
   // this.previousValues = [0 0 0];
    this.settings = $.extend({},this.settings,basicConfig);
    this.previousValues = {'num' : '[1]', 'den': '[1, 1]'};
    this.settings = $.extend({},this.settings,config);
    this.endpoints = $.extend([],this.endpoints,[]);
    this.parameters = [
       {   
            'type' : 'text',
            'label' : 'num',
            'value' : this.previousValues.num,
            'id' : 'num',
          
           
        },
        {   
            'type' : 'text',
            'label' : 'den',
            'value' : this.previousValues.den,
            'id' : 'den',
          
           
        },
     
        
       
    ];
    this.integrals=[[0,0]];
    this.derivates=[[0]];
    this.derivatesPrev=[[0]];
}

TransferFcn.prototype = new Block();
TransferFcn.prototype.updateParameters = function(){
  
    var allParams = $('#'+this.settings.id+'Parameters').find('.boxParameterContent');
    console.log(allParams);
    for(var i=0;i<this.parameters.length;i++)
    {
        var singleParam =  allParams.find('#'+this.settings.id+this.parameters[i].id);
        console.log(eval(singleParam.val()));
        this.previousValues[this.parameters[i].id] = eval(singleParam.val());
    }
    console.log( this.previousValues);
   // matrixInit();
    //var singleParam =  allParams.find('#'+this.settings.id+this.parameters[0].id);
  //  this.previousValues = singleParam.val();
  
  
 // function matrixInit(){
    this.buildArrays();

}
TransferFcn.prototype.buildArrays = function(){
    this.integrals =[];
   
    for(var i=0;i<eval(this.previousValues.den).length-1;i++)
    {
        this.integrals.push([0, 0]);
    }
    console.log(this.integrals);
    
    for(var i=0;i<eval(this.previousValues.num).length;i++)
    {
        this.derivates.push(new Array());
        this.derivatesPrev.push(new Array());
       
    }
    
    for(var i=0;i<eval(this.previousValues.num).length;i++)
    {
        for(var j=0;j<eval(this.previousValues.num).length;j++)
        {
            this.derivates[i][j]=0;
            this.derivatesPrev[i][j]=0;
           
        }
    }
}

TransferFcn.prototype.outputValue = function(y,h){
  //  var tf = [1 1 1];
  //  var tfp[0] = 
    
    var wym = y;
    
    
    for(var k=0;k<eval(this.previousValues.num).length;k++)
        {
            //console.log(num[j]);
            for(var i=0;i<eval(this.previousValues.num).length-k;i++)
            {
               
                
                    if(i===0)
                    {
                        
                        this.derivates[k][i]=eval(this.previousValues.num)[k]*wym;
                       
                    }
                    else 
                    {
                        if(i===1)
                        {
                            
                            this.derivates[k][i]=(this.derivates[k][i-1]-this.derivatesPrev[k][i-1])/h;
                        }
                        else 
                        {                      
                          //  console.log(k+' '+i+' '+ derivatesPrev[k]);
                            if(this.derivatesPrev[k][i-1] !== this.derivates[k][i-1] )
                                this.derivates[k][i]=(this.derivates[k][i-1]-this.derivatesPrev[k][i-1])/h;
                             else 
                                this.derivates[k][i]=0;

                           
                        } 
                    }
                    
                    
                   
                 
               
             //   else
            //        derivates[j][i]=num[j]*(derivates[j][i]-derivates[j][i-1])/h;
            }
            //wymPrev[k] = num[k]*wym;
        }
        
        this.derivates[eval(this.previousValues.num).length-1][0]=eval(this.previousValues.num)[eval(this.previousValues.num).length-1]*wym;
        
         //console.log(derivates);
        //             console.log(derivatesPrev[0]);
       
        var b=0;
        var w=0;
        console.log(this.derivates);
        for(var k=eval(this.previousValues.num).length-1;k>=0;k--)
        {
          
            w=w+this.derivates[k][b];       
            b++;
        }
        
        for(var i=0;i<eval(this.previousValues.num).length;i++)
        {
            for(var k=0;k<eval(this.previousValues.num).length;k++)
            {
               
                this.derivatesPrev[i][k]=this.derivates[i][k];

            }
        }
        
        b=0;
       
         for(var i=0;i<this.integrals.length;i++)
        {
           this.integrals[i][0]=this.integrals[i][1];
        }
        
        
        for(var i=0;i<this.integrals.length;i++)
        {
            w=w-eval(this.previousValues.den)[i+1]*this.integrals[i][0];
        
        }
        
    for(var i=0;i<this.integrals.length;i++)
    {
        if(i==0)
            this.integrals[i][1]=this.integrals[i][0]+w*h;
        else
            this.integrals[i][1]=this.integrals[i][0]+this.integrals[i-1][0]*h;
    }
    console.log(this.settings.id);
    console.log(this.integrals) ;
    console.log(this.previousValues);
    console.log(eval(this.previousValues.den));
         return this.integrals[eval(this.previousValues.den).length-2][0];
    // console.log(integrals)   
}



