var gl;
var program;
var PlayerMesh;
var pointBuff;
var normBuff;
var theta;
var aspect;
var placeMesh;
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
    
    gl.viewport(0, 0,canvas.width, canvas.height);
    
    PlayerMesh = new PlyMesh(gl, vec3(0, 90, 0), vec3(0.1,0.1,0.1), vec3(0.0, -2.0, 10.0));
    placeMesh = new FlatTerrainMesh(gl, vec3(0,0,0), vec3(1,1,1), vec3(0,-1,0), 128, 128);
    placeMesh.generate();
    placeMesh.loadToGPU();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var text = xhttp.responseText;
            //window.alert(text);
            PlayerMesh.decodePly(text);
            window.alert("Mesh has "+ PlayerMesh.vertices.length + " vertices" );
            PlayerMesh.loadToGPU();
            

        }
    };
    xhttp.open("GET", "f16.ply", true);
    xhttp.send();
    theta=0;
    aspect = canvas.clientWidth / canvas.clientHeight;

    //
    
    
    
    
    render();
}
/*
function setupAttributes()
{
    //if there are points in the point list...
    if (PlayerMesh.vertices.length>0)
	{
	    //activates pointBuff buffer
	    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuff);    
	    //associates vPosition atribute with the current buffer
	    var vPosition = gl.getAttribLocation(program, "vPosition");
	    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(vPosition);
	}

    //if there are normals in the normal list...
    if (0) //PlayerMesh.normals.length>0)
	{
	    //activates normBuff buffer
	    gl.bindBuffer(gl.ARRAY_BUFFER, normBuff);
	    //associates vPosition atribute with the current buffer
	    var vNormal = gl.getAttribLocation(program, "vNormal");
	    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(vNormal);
	}
}
*/
function render()
{

    //request refreshed frame for animation
    requestAnimFrame(render);
    
    
    //clears screen and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //increases angle of rotation by half a degree each frame
    //updateRotation();

          
        //this will be out projection matrix
        var projMat=mat4();
    
        //sets up a projection with a 45 degree field of view,
        //apsect ratio, near clipping plane of 0.1 and far of 1000.0
        projMat=mult(projMat, perspective(45.0, aspect, 0.1, 1000.0));
        
        //projMat=mult(projMat, rotate(theta, vec3(0.0, 0.0, 0.0)));
        theta += .5;

  
        var projMatGPtr=gl.getUniformLocation(program, "vProjMat");
        gl.uniformMatrix4fv(projMatGPtr, false, flatten(projMat));

        console.log("PlayerMesh test:");
        PlayerMesh.testElements();
        console.log("placeMesh")
        placeMesh.testElements();
        
        if (PlayerMesh.isLoaded)
            PlayerMesh.render(theta);
        placeMesh.render()
        
}