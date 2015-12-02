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