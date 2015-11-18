var gl;
var program;
var PlayerMesh;

window.onload = function init () 
{
    console.log("INIT:");
    //startup sequence
    var canvas = document.getElementById("gl-canvas");
    //makes a GL instance for our canvas
    gl=WebGLUtils.setupWebGL(canvas);
    //Enables Z-buffer depth testing
    gl.enable(gl.DEPTH_TEST)
    
    //gets the shader programs from the HTML file
    //and initializes our vertex and fragment shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    //sets the resulting shader program to use
    gl.useProgram(program);
    
    
    //use black for the defaault color
    gl.clearColor(0.0,0.0,0.0,1.0);
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    
    PlayerMesh = new Mesh();
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var text = xhttp.responseText;
            //window.alert(text);
            PlayerMesh.decodePly(text);
            //window.alert("Mesh has "+ PlayerMesh.vertices.length + " vertices" );
        }
    };
    xhttp.open("GET", "airplane.ply", true);
    xhttp.send();
    
    
}

function setupAttributes()
{
    //if there are points in the point list...
    if (pointList.length>0)
	{
	    //activates pointBuff buffer
	    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuff);    
	    //associates vPosition atribute with the current buffer
	    var vPosition = gl.getAttribLocation(program, "vPosition");
	    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(vPosition);
	}

    //if there are normals in the normal list...
    if (nrmList.length>0)
	{
	    //activates normBuff buffer
	    gl.bindBuffer(gl.ARRAY_BUFFER, normBuff);
	    //associates vPosition atribute with the current buffer
	    var vNormal = gl.getAttribLocation(program, "vNormal");
	    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(vNormal);
	}
}

function render()
{
    //request refreshed frame for animation
    requestAnimFrame(render);

    //clears screen and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //increases angle of rotation by half a degree each frame
    //theta+=0.5;

    //this will be our model view matrix
    var modelMat=mat4();
    //sets the camera at the origin, facing down the z-axis, with the up vector along the y-axis
    modelMat=lookAt(vec3(0, 0, 0), vec3(0, 0, 1), vec3(0, 1, 0));
    
    //scales geometry
    modelMat=mult(modelMat, scalem(vec3(2.0, 2.0, 2.0)));
    //translates geometry
    modelMat=mult(modelMat, translate(vec3(0.0, 0.0, 5.0)));
    //rotates geometry
    modelMat=mult(modelMat, rotate(90.0, vec3(1.0, 0.0, 0.0)));
    modelMat=mult(modelMat, rotate(190.0, vec3(0.0, 1.0, 0.0)));
    modelMat=mult(modelMat, rotate(12.0, vec3(0.0, 0.0, 1.0)));

    //this will be out projection matrix
    var projMat=mat4();
    
    //sets up a projection with a 45 degree field of view,
    //apsect ratio, near clipping plane of 0.1 and far of 1000.0
    projMat=mult(projMat, perspective(45.0, 1.0, 0.1, 1000.0));

    //gets location of the vRotMat uniform on the GPU
    var modelMatLoc=gl.getUniformLocation(program, "vRotMat");

    var colorLoc=gl.getUniformLocation(program, "vColor");

    //gets location of the vRotMat uniform on the GPU
    var projMatLoc=gl.getUniformLocation(program, "vProjMat");

    //Sends the rotation matrix to the GPU as a uniform
    gl.uniformMatrix4fv(modelMatLoc, false, flatten(modelMat));

    //Sends the rotation matrix to the GPU as a uniform
    gl.uniformMatrix4fv(projMatLoc, false, flatten(projMat));

    //sets up attributes
    setupAttributes()

    //Sends color to the GPU as a uniform
    gl.uniform4fv(colorLoc, flatten( vec4(0.0, 0.0, 0.0, 1.0) ));
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuff);
    //draws point list array as Triangles
    gl.drawArrays(gl.TRIANGLES, 0, pointList.length);

    //Sends new color to the GPU
    gl.uniform4fv(colorLoc, flatten( vec4(1.0, 1.0, 1.0, 1.0)));
    //draws point list array as Lines
    for(var i = 0; i < pointList.length; i+=3)
    {
    	gl.drawArrays(gl.LINE_LOOP, i, 3);
    }
}