function tfc(y,h,time)
{
    var num=[1];
    var den=[1, 1];
    
    var w=y;
    var wym = y;
    console.log(y);
    var integrals=[];
    var derivates=[];
    var derivatesPrev=[];
   
    console.log(den.length);
    for(var i=0;i<den.length-1;i++)
    {
        integrals.push([0, 0]);
    }
    
    
    for(var i=0;i<num.length;i++)
    {
        derivates.push(new Array());
        derivatesPrev.push(new Array());
       
    }
    
    for(var i=0;i<num.length;i++)
    {
        for(var j=0;j<num.length;j++)
        {
            derivates[i][j]=0;
            derivatesPrev[i][j]=0;
           
        }
    }
    
    
    
        
    
    
    var wymPrev = [];
    for(var j=0;j<=5;j++)
    {
        for(var k=0;k<num.length;k++)
        {
            //console.log(num[j]);
            for(var i=0;i<num.length-k;i++)
            {
               
                
                    if(i===0)
                    {
                        
                        derivates[k][i]=num[k]*wym;
                       
                    }
                    else 
                    {
                        if(i===1)
                        {
                            
                            derivates[k][i]=(derivates[k][i-1]-derivatesPrev[k][i-1])/h;
                        }
                        else 
                        {                      
                          //  console.log(k+' '+i+' '+ derivatesPrev[k]);
                            if(derivatesPrev[k][i-1] !== derivates[k][i-1] )
                                derivates[k][i]=(derivates[k][i-1]-derivatesPrev[k][i-1])/h;
                             else 
                                derivates[k][i]=0;

                           
                        } 
                    }
                    
                    
                   
                 
               
             //   else
            //        derivates[j][i]=num[j]*(derivates[j][i]-derivates[j][i-1])/h;
            }
            wymPrev[k] = num[k]*wym;
        }
        derivates[num.length-1][0]=num[num.length-1]*wym;
        
         //console.log(derivates);
        //             console.log(derivatesPrev[0]);
       
        var b=0;
        w=0;
        for(var k=num.length-1;k>=0;k--)
        {
          
            w=w+derivates[k][b];       
            b++;
        }
        for(var i=0;i<num.length;i++)
        {
            for(var k=0;k<num.length;k++)
            {
               
                derivatesPrev[i][k]=derivates[i][k];

            }
        }
        console.log(w);
        b=0;
       //  console.log(derivates[0]);
          //           console.log(derivatesPrev[0]);
     //  console.log(w);
       //console.log(derivates);
       //  console.log(derivates[0]);
       // console.log(derivatesPrev[0]);
         for(var i=0;i<integrals.length;i++)
        {
            integrals[i][0]=integrals[i][1];
        }
        
        
        for(var i=0;i<integrals.length;i++)
        {
            w=w-den[i+1]*integrals[i][0];
        
        }
    for(var i=0;i<integrals.length;i++)
    {
        if(i==0)
            integrals[i][1]=integrals[i][0]+w*h;
        else
            integrals[i][1]=integrals[i][0]+integrals[i-1][0]*h;
    }
    // console.log(integrals)
   y=integrals[0][0];
    console.log(y);
    
   
}
   // w=
    
    
    
    //console.log(integrals)
}