/*
var arrayZ = [];

    var FlatTerrainMesh = function(glPlease,or,sc,of,X,Y)
    {
        Mesh.apply(this,arguments);
        this.sizeX =X;
        this.sizeY =Y;
    }
    FlatTerrainMesh.prototype = new Mesh();
    
    FlatTerrainMesh.prototype.generate = function()
    {
        for(var i=0; i< this.sizeY;i++)
        {
            for(var j=0; j<this.sizeX;j++)
            {
                this.vertices.push(vec3(j,0,i));
                if(i<this.sizeY-1 && j<this.sizeX-1)
                {
                    this.faces.push(vec3( this.vertices.length -1, this.vertices.length, this.vertices.length-1+this.sizeX ));
                    this.faces.push(vec3( this.vertices.length, this.vertices.length-1+this.sizeX, this.vertices.length + this.sizeX));
                }
            }
        }

    }
*/    

var pointList = [];
var newPointList = [];

function clamp(v,max,min)
{
    if(v<min)
        return parseFloat(min);
    else if(v>max)
        return parseFloat(max);
    else
        return parseFloat(v);
}
 var Gradient = [];
 var SizeX;
 var SizeY;
    
   
    var perlinNoiseTerrainMesh = function(glPlease,or,sc,of,X,Y)
    {
        Mesh.apply(this,arguments);
        this.ready=false;
        this.sizeX =X;
        this.sizeY =Y;
        SizeX=X;
        SizeY=Y;
    }
    perlinNoiseTerrainMesh.prototype = new Mesh();
    
    perlinNoiseTerrainMesh.prototype.generate = function()
    {
    	for(var i = 0; i < this.sizeX; i++)
		{
			Gradient[i] = [];
			for(var j = 0; j < this.sizeY; j++)
			{
				Gradient[i][j] = normalize(vec2((Math.random() * 2.0) - 1.0, ((Math.random() * 2.0) - 1.0)));
			}
		}
    
    	doStuff(this.sizeX, this.sizeY);
    	for(var j = 0; j < this.sizeX; j++)
    	{
    		for(var i = 0; i < this.sizeY; i++)
    		{
                this.vertices.push(vec3(j, newPointList[j][i], i));
                //document.write("perlin val: " + p + "<br>");
                if(i<this.sizeY-1 && j<this.sizeX-1)
                {
                    this.faces.push(vec3( this.vertices.length -1, this.vertices.length, this.vertices.length-1+this.sizeX ));
                    this.faces.push(vec3( this.vertices.length, this.vertices.length-1+this.sizeX, this.vertices.length + this.sizeX));
                }
            }
        }
        this.ready=true;
    }
/*    
var newValfbm1 = [];
var newValfbm2 = [];
var newValfbm3 = [];
var newValfmbfinal = [];
var newValperlin = [];
var newValsmooth = [];
var newValsmooth2 = [];
*/
function doStuff(sizeX, sizeZ)
{
	var octaves = 8.0; //parseFloat(document.getElementById("octaves").value);
    var lacunarity = 2.0; //parseFloat(document.getElementById("lacunarity").value);
    var gain = 0.5; //parseFloat(document.getElementById("gain").value);
    for(var j=0; j< sizeX;j++)
    {
        pointList[j] = [];
    /*
        newValfbm1[j] = [];
        newValfbm2[j] = [];
        newValfbm3[j] = [];
        newValfmbfinal[j] = [];
    */
        for(var i=0; i<sizeZ;i++)
        {
            var p = fBM(parseFloat(j), parseFloat(i), octaves, lacunarity, gain);
            /*
    				newValfbm1[j][i] = p;
   					newValfbm1[j][i] /= 2.0;
    				newValfbm1[j][i] *= 255;
    				newValfbm1[j][i] = parseInt(newValfbm1[j][i]);
    			*/
            var q = fBM(parseFloat(j), parseFloat(i), octaves, lacunarity, gain);
            /*
            		newValfbm2[j][i] = q;
   					newValfbm2[j][i] /= 2.0;
    				newValfbm2[j][i] *= 255;
    				newValfbm2[j][i] = parseInt(newValfbm2[j][i]);
    			*/
            var r = fBM(parseFloat(j), parseFloat(i), octaves, lacunarity, gain);
            /*
           			newValfbm3[j][i] = r;
   					newValfbm3[j][i] /= 2.0;
    				newValfbm3[j][i] *= 255;
    				newValfbm3[j][i] = parseInt(newValfbm3[j][i]);
    			*/
            var s = (p + q + r);
            /*
            		newValfmbfinal[j][i] = s;
   					newValfmbfinal[j][i] /= 2.0;
    				newValfmbfinal[j][i] *= 255;
    				newValfmbfinal[j][i] = parseInt(newValfmbfinal[j][i]);
    			*/
            pointList[j][i] = s;
        }
    }
    smooth(sizeX, sizeZ);
    //printValue(sizeX, sizeZ);
}
/*
function printValue(sizeX, sizeZ)
{
	document.write("<br><br><br><br><br><br><br><br> FBMMMMM1111111 <br><br><br><br><br><br><br><br><br>");
	for(var j = 0; j < sizeX; j++)
	{
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValfbm1[j][i] + " " + newValfbm1[j][i] + " " + newValfbm1[j][i] + " ");
		}
	}
	document.write("<br><br><br><br><br><br><br> FBMMMMM222222222 <br><br><br><br><br><br><br><br><br>");
	for(var j = 0; j < sizeX; j++)
	{
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValfbm2[j][i] + " " + newValfbm2[j][i] + " " + newValfbm2[j][i] + " ");
		}
	}
	document.write("<br><br><br><br><br><br><br><br><br><br> FBM23333333333 <br><br><br><br><br><br><br><br><br>");
	for(var j = 0; j < sizeX; j++)
	{
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValfbm3[j][i] + " " + newValfbm3[j][i] + " " + newValfbm3[j][i] + " ");
		}
	}
	document.write("<br><br><br><br><br><br><br><br><br> finalFBM <br><br><br><br><br><br><br><br><br><br>");
	for(var j = 0; j < sizeX; j++)
	{
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValfmbfinal[j][i] + " " + newValfmbfinal[j][i] + " " + newValfmbfinal[j][i] + " ");
		}
	}
	document.write("<br><br><br><br><br><br><br><br> PERLINNNNNNNNNN <br><br><br><br><br><br><br><br><br><br>");
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValperlin[i] + " " + newValperlin[i] + " " + newValperlin[i] + " ");
		}
	document.write("<br><br><br><br><br><br><br><br><br><br><br> SMOOOOOOOOOTH1111111111111 \<br><br><br><br><br><br><br><br><br><br>");
	for(var j = 0; j < sizeX; j++)
	{
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValsmooth[j][i] + " " + newValsmooth[j][i] + " " + newValsmooth[j][i] + " ");
		}
	}
	document.write("<br><br><br><br><br><br><br><br><br><br><br> SMOOOOOOOOOTH2222222 <br><br><br><br><br><br><br><br><br><br><br>");
	for(var j = 0; j < sizeX; j++)
	{
		for(var i = 0; i < sizeZ; i++)
		{
    		document.write(newValsmooth2[j][i] + " " + newValsmooth2[j][i] + " " + newValsmooth2[j][i] + " ");
		}
	}
}
*/

// Function to linearly interpolate between a and b
 // Weight w should be in the range [0.0, 1.0]
function interpolate(a, b, w)
{
	a = parseFloat(a);
	b = parseFloat(b);
	w = parseFloat(w);
	//document.write("Interpolate val: " + parseFloat((1.0 - w) * a + (w * b)) + "<br>");
	return parseFloat((1.0 - w) * a + (w * b));
}
  
// Computes the dot product of the distance and gradient vectors.  
function dotGridGradient(ix,  iy,  x,  y)
{
	ix = parseFloat(ix);
	iy = parseFloat(iy);
	x = parseFloat(x);
	y = parseFloat(y);

	// Precomputed (or otherwise) gradient vectors at each grid point X,Y
	
	
	// Compute the distance vector
	var dx = x - ix;
	var dy = y - iy;
	
	// Compute the dot-product
	//document.write("dotGridGradient val: " + parseFloat(normalize(dx * Gradient[clamp(iy,SizeY-1.0,0)][clamp(ix,SizeX-1.0,0)][0] + dy * Gradient[clamp(iy,SizeY-1.0,0)][clamp(ix,SizeX-1.0,0)][1])) + "<br>");
	return parseFloat(normalize(dx * Gradient[clamp(iy,SizeY-1.0,0)][clamp(ix,SizeX-1.0,0)][0] + dy * Gradient[clamp(iy,SizeY-1.0,0)][clamp(ix,SizeX-1.0,0)][1]));
}

var asdf = 0;
// Compute Perlin noise at coordinates x, y
function perlin(x,  y)
{
	x = parseFloat(x);
	y = parseFloat(y);
	// Determine grid cell coordinates
	var x0 = 0.0;
	if(x < 0.0)
	{
		x0 = x;
	}
	else
	{
		x0 = x - 1.0;
	}
	var x1 = x + 1.0;
	var y0 = 0.0;
	if(y < 0.0)
	{
		y0 = y;
	}
	else
	{
		y0 = y - 1.0;
	}
	var y1 = y + 1.0;
	
	// Determine interpolation weights
    // Could also use higher order polynomial/s-curve here
	var sx = parseFloat(x) - parseFloat(x0);
	var sy = parseFloat(y) - parseFloat(y0);
	
	// Interpolate between grid point gradients
	var n0, n1, ix0, ix1, value;
	n0 = parseFloat(dotGridGradient(x0, y0, x, y));
	n1 = parseFloat(dotGridGradient(x1, y0, x, y));
	ix0 = parseFloat(interpolate(n0, n1, sx));
	n0 = parseFloat(dotGridGradient(x0, y1, x, y));
	n1 = parseFloat(dotGridGradient(x1, y1, x, y));
	ix1 = parseFloat(interpolate(n0, n1, sx));
	value = parseFloat(interpolate(ix0, ix1, sy));
	
/*
    		newValperlin[asdf] = value;
   			newValperlin[asdf] /= 2.0;
    		newValperlin[asdf] *= 255;
    		newValperlin[asdf] = parseInt(newValperlin[asdf]);
			asdf++;
	*/
	
	return parseFloat(value);
}



function fBM(x, z, octaves /*8*/, lacunarity /*2.0*/, gain /*0.5*/)
{
    var amplitude = 1.0;
    var frequency = 1.0;
    var sum = 0.0;
    for(var i = 0; i < octaves; i++)
    {
        sum += amplitude * perlin(x * frequency, z * frequency);
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return sum;
}

var avgHeight = 0.0;
function smooth(sizeX, sizeZ)
{
	for(var x = 0; x < sizeX; x++)
	{
		newPointList[x] = [];
		//newValsmooth[x] = [];
		for(var z = 0; z < sizeZ; z++)
		{
			if(x > 0 && z > 0 && x < sizeX - 1 && z < sizeZ - 1)
			{
				avgHeight = (pointList[x][z] + pointList[x-1][z] + pointList[x][z-1] +
			 					 pointList[x-1][z-1] + pointList[x+1][z] + pointList[x][z+1] +
			 					 pointList[x+1][z+1] + pointList[x-1][z+1] + pointList[x+1][z-1]) / 9.0;
			 	newPointList[x][z] = avgHeight;
			}
			else
				newPointList[x][z] = pointList[x][z] / 2.0;
				
		/*		
			newValsmooth[x][z] = pointList[x][z];
   			newValsmooth[x][z] /= 2.0;
    		newValsmooth[x][z] *= 255;
    		newValsmooth[x][z] = parseInt(newValsmooth[x][z]);
		*/		
				
		}
	}
	for(var x = 0; x < sizeX; x++)
	{
		//newValsmooth2[x] = [];
		for(var z = 0; z < sizeZ; z++)
		{
			if(x > 0 && z > 0 && x < sizeX - 1 && z < sizeZ - 1)
			{
				avgHeight = (newPointList[x][z] + newPointList[x-1][z] + newPointList[x][z-1] +
			 					 newPointList[x-1][z-1] + newPointList[x+1][z] + newPointList[x][z+1] +
			 					 newPointList[x+1][z+1] + newPointList[x-1][z+1] + newPointList[x+1][z-1]) / 9.0;
			 	newPointList[x][z] = avgHeight;
			}
			else
				newPointList[x][z] = newPointList[x][z] / 2.0;
				
		/*		
			newValsmooth2[x][z] = newPointList[x][z];
   			newValsmooth2[x][z] /= 2.0;
    		newValsmooth2[x][z] *= 255;
    		newValsmooth2[x][z] = parseInt(newValsmooth2[x][z]);
    	*/
		}
	}
}
    


/*    
    
var perlinArray = [];

function perlinNoise(width, height)
{
	var frequency = 5.0 / parseFloat(width);
	for(var x = 0; x < width; x++)
	{
		for(var y = 0; y < height; y++)
		{
			perlinArray[x][y] = parseFloat(noise(x * frequency, y * frequency));
			perlinArray[x][y] = (perlinArray[x][y] + 1.0) / 2.0;
		}
	}
}

*/
    
    
    
/*    
var squareCount = 0;
var diamondCount = 0;
var midPointCount = 0;

var square = [];
var diamond = [];
var midPointNum = [];

var topLeft = Math.random();
square[squareCount] = topLeft;
squareCount++;

var topRight = Math.random();
square[squareCount] = topRight;
squareCount++;

var bottomLeft = Math.random();
square[squareCount] = bottomLeft;
squareCount++;

var bottomRight = Math.random();
square[squareCount] = bottomRight;
squareCount++;

var midPoint = 0.0;
var midTop = 0.0;
var midLeft = 0.0;
var midRight = 0.0;
var midBottom = 0.0;

var pointList = [];

var i = 0;


function diamondSquare(topLeft, topRight, bottomLeft, bottomRight)
{
	//top left side
	if(i == 5) // NEED TO SET THIS TO ONE PIXEL
		break;//do nothing
	else
	{
		midPoint = midPointAverage(topLeft, topRight, bottomLeft, bottomRight);
		midPointNum[midPointCount] = midPoint;
		midPointCount++;
		
		midTop = average(topLeft, topRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midTop;
		diamondCount++;
	
		midRight = average(topRight, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midRight;
		diamondCount++;
		
		midLeft = average(topLeft, bottomLeft, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midLeft;
		diamondCount++;
		
		midBottom = average(bottomLeft, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midBottom;
		diamondCount++;
		
		pointList.push(topLeft);
		pointList.push(topRight);
		pointList.push(bottomLeft);
		pointList.push(bottomRight);
		pointList.push(midPoint);
		pointList.push(midTop);
		pointList.push(midLeft);
		pointList.push(midRight);
		pointList.push(midBottom);
				
		i++;
		
		diamondSquare(square[squareCount - 4], diamond[diamondCount - 4], diamond[diamondCount - 2], midPointNum[midPointCount - 4]);
	}
	
	//top right side
	i = 0;
	
	topLeft = diamond[diamondCount - 4];
	topRight = square[squareCount - 3];
	bottomLeft = midPointNum[midPointCount - 4];
	bottomRight = diamond[diamondCount - 3];
	
	if(i == 5) // NEED TO SET THIS TO ONE PIXEL
		break;//do nothing
	else
	{
		midPoint = midPointAverage(topLeft, topRight, bottomLeft, bottomRight);
		midPointNum[midPointCount] = midPoint;
		midPointCount++;
		
		midTop = average(topLeft, topRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midTop;
		diamondCount++;
	
		midRight = average(topRight, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midRight;
		diamondCount++;
		
		midLeft = average(topLeft, bottomLeft, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midLeft;
		diamondCount++;
		
		midBottom = average(bottomLeft, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midBottom;
		diamondCount++;
		
		pointList.push(topLeft);
		pointList.push(topRight);
		pointList.push(bottomLeft);
		pointList.push(bottomRight);
		pointList.push(midPoint);
		pointList.push(midTop);
		pointList.push(midLeft);
		pointList.push(midRight);
		pointList.push(midBottom);
				
		i++;
		
		diamondSquare(diamond[diamondCount - 4], square[squareCount - 3], midPointNum[midPointCount - 4], diamond[diamondCount - 3]);
	}
	
	//bottom left side
	i = 0;
	
	topLeft = diamond[diamondCount - 2];
	topRight = midPointNum[midPointCount - 4];
	bottomLeft = square[squareCount - 2];
	bottomRight = diamond[diamondCount - 1];
	
	if(i == 5) // NEED TO SET THIS TO ONE PIXEL
		break;//do nothing
	else
	{
		midPoint = midPointAverage(topLeft, topRight, bottomLeft, bottomRight);
		midPointNum[midPointCount] = midPoint;
		midPointCount++;
		
		midTop = average(topLeft, topRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midTop;
		diamondCount++;
	
		midRight = average(topRight, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midRight;
		diamondCount++;
		
		midLeft = average(topLeft, bottomLeft, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midLeft;
		diamondCount++;
		
		midBottom = average(bottomLeft, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midBottom;
		diamondCount++;
		
		pointList.push(topLeft);
		pointList.push(topRight);
		pointList.push(bottomLeft);
		pointList.push(bottomRight);
		pointList.push(midPoint);
		pointList.push(midTop);
		pointList.push(midLeft);
		pointList.push(midRight);
		pointList.push(midBottom);
				
		i++;
		
		diamondSquare(diamond[diamondCount - 2], midPointNum[midPointCount - 4], square[squareCount - 2], diamond[diamondCount - 1]);
	}
	
	//bottom right side
	i = 0;
	
	topLeft = midPointNum[midPointCount - 4];
	topRight = diamond[diamondCount - 3];
	bottomLeft = diamond[diamondCount - 1];
	bottomRight = square[squareCount - 1];
	
	if(i == 5) // NEED TO SET THIS TO ONE PIXEL
		break;//do nothing
	else
	{
		midPoint = midPointAverage(topLeft, topRight, bottomLeft, bottomRight);
		midPointNum[midPointCount] = midPoint;
		midPointCount++;
		
		midTop = average(topLeft, topRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midTop;
		diamondCount++;
	
		midRight = average(topRight, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midRight;
		diamondCount++;
		
		midLeft = average(topLeft, bottomLeft, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midLeft;
		diamondCount++;
		
		midBottom = average(bottomLeft, bottomRight, midPointNum[midPointCount - 1]);
		diamond[diamondCount] = midBottom;
		diamondCount++;
		
		pointList.push(topLeft);
		pointList.push(topRight);
		pointList.push(bottomLeft);
		pointList.push(bottomRight);
		pointList.push(midPoint);
		pointList.push(midTop);
		pointList.push(midLeft);
		pointList.push(midRight);
		pointList.push(midBottom);
				
		i++;
		
		diamondSquare(diamond[diamondCount - 2], midPointNum[midPointCount - 4], square[squareCount - 2], diamond[diamondCount - 1]);
	}
}


function midPointAverage(topL, topR, bottomL, bottomR)
{
	return (topL + topR + bottomL + bottomR) / 4.0;
}


function average(x, y, vz)
{
	return (x + y + z) / 3.0;
}
*/