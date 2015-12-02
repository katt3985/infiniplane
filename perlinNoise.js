/*Simple Perlin Noise implementation*/

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
	        point(width, height);
        	y += 0.01;
    	}
    	x += 0.01;
	}
}




/*simplex perlin noise*/
var perlinArray = [];

function simplexPerlinNoise(width, height)
{
	var frequency = 5.0 / parseFloat(width);
	for(var x = 0; x < width; x++)
	{
		for(var y = 0; y < height; y++)
		{
			perlinArray[x][y] = parseFloat(noise(x * frequency, y * frequency);
			perlinArray[x][y] = (perlinArray[x][y] + 1.0) / 2.0;
		}
	}
}


/*Just another method of doing this*/
/*
function fractionalBownianMoment(var x, var y, var z, var octaves = 8, var lacunarity = 2.0, var gain = 0.5)
{
    var amplitude = 1.0;
    var frequency = 1.0;
    var sum = 0.0;
    for(var i = 0; i < octaves; i++)
    {
        sum += amplitude * noise(x * frequency, y * frequency, z * frequency);
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return sum;
}
*/