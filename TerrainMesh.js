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
      
function clamp(v,max,min)
{
    if(v<min)
        return min;
    else if(v>max)
        return max;
    else
        return v;
}
 var Gradient = [];
 var SizeX;
 var SizeY;
    
    
    var perlinNoiseFlatTerrainMesh = function(glPlease,or,sc,of,X,Y)
    {
        Mesh.apply(this,arguments);
        this.sizeX =X;
        this.sizeY =Y;
        SizeX=X;
        SizeY=Y;
    }
    perlinNoiseFlatTerrainMesh.prototype = new Mesh();
    
    perlinNoiseFlatTerrainMesh.prototype.generate = function()
    {
    	for(var i = 0; i < this.sizeX; i++)
		{
			Gradient[i] = [];
			for(var j = 0; j < this.sizeY; j++)
			{
				Gradient[i][j] = normalize(vec2((Math.random() * 2) - 1, ((Math.random() * 2) - 1)));
			}
		}
    
        for(var i=0; i< this.sizeY;i++)
        {
            for(var j=0; j<this.sizeX;j++)
            {
                this.vertices.push(vec3(j, perlin(j,i), i));
                if(i<this.sizeY-1 && j<this.sizeX-1)
                {
                    this.faces.push(vec3( this.vertices.length -1, this.vertices.length, this.vertices.length-1+this.sizeX ));
                    this.faces.push(vec3( this.vertices.length, this.vertices.length-1+this.sizeX, this.vertices.length + this.sizeX));
                }
            }
        }

    }
    





// Function to linearly interpolate between a0 and a1
 // Weight w should be in the range [0.0, 1.0]
function interpolate( a, b, w)
{
	return ((1.0 - w) * a) + (w * b);
}
  
  // Computes the dot product of the distance and gradient vectors.  
function dotGridGradient( ix,  iy,  x,  y)
{
	// Precomputed (or otherwise) gradient vectors at each grid point X,Y
	
	// Compute the distance vector
	var dx = x - ix;
	var dy = y - iy;
	
	// Compute the dot-product
	return (dx * Gradient[clamp(iy,SizeY-1,0)][clamp(ix,SizeX-1,0)][0] + dy * Gradient[clamp(iy,SizeY-1,0)][clamp(ix,SizeX-1,0)][1]);
}

// Compute Perlin noise at coordinates x, y
function perlin(x,  y)
{
	// Determine grid cell coordinates
	var x0 = 0.0;
	if(x > 0.0)
	{
		x0 = x;
	}
	else
	{
		x0 = x - 1.0;
	}
	var x1 = x0 + 1.0;
	var y0 = 0.0;
	if(y > 0.0)
	{
		y0 = y;
	}
	else
	{
		y0 = y - 1.0;
	}
	var y1 = y0 + 1;
	
	// Determine interpolation weights
     // Could also use higher order polynomial/s-curve here
	var sx = x - x0;
	var sy = y - y0;
	
	// Interpolate between grid point gradients
	var n0, n1, ix0, ix1, value;
	n0 = dotGridGradient(x0, y0, x, y)
	n1 = dotGridGradient(x1, y0, x, y);
	ix0 = interpolate(n0, n1, sx);
	n0 = dotGridGradient(x0, y1, x, y);
	n1 = dotGridGradient(x1, y1, x, y);
	ix1 = interpolate(n0, n1, sx);
	value = interpolate(ix0, ix1, sy);
	
	return value;
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