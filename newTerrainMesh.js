
    var FlatTerrainMesh = function(glPlease,or,sc,of,X,Y,Z)
    {
        Mesh.apply(this,arguments);
        this.sizeX =X;
        this.sizeY =Y;
        this.sizeZ =Z;
    }
    FlatTerrainMesh.prototype = new Mesh();
    
    FlatTerrainMesh.prototype.generate = function()
    {
        for(var i=0; i< this.sizeZ;i++)
        {
            for(var j=0; j<this.sizeX;j++)
            {
            	for(var n=0; n<this.sizeY;n++)
            	{
                	this.vertices.push(vec3(j, arrayZ[n], i));
	                if(i<this.sizeY-1 && j<this.sizeX-1 && n<this.sizeY-1)
    	            {
        	            this.faces.push(vec3( this.vertices.length -1, this.vertices.length, this.vertices.length-1+this.sizeX ));
            	        this.faces.push(vec3( this.vertices.length, this.vertices.length-1+this.sizeX, this.vertices.length + this.sizeX));
                	}
                }
            }
        }

    }
    
    
var arrayZ = [];    
    
function perlinNoise()
{
	var x = 0.0;
	for (var width = 0; width < canvas.width; width++) //This is how many pixels wide it is (x in 2D)
	{
    	var y = 0.0;
   		for (var height = 0; height < canvas.height; height++) //This is how many pixels high it is (y in 2D)
    	{
        	var bright = map(noise(x, y), 0, 1, 0, 255);
    	    stroke(bright, bright, bright);
	        arrayZ.push(point(width, height));
        	y += 0.01;
    	}
    	x += 0.01;
	}
}