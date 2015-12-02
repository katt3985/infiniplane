var gl;
var program;
var PlayerMesh;
var pointBuff;
var normBuff;
var move;
var aspect;
var placeMesh;
var currentlyPressedKeys = {};
var loc=vec3(0,0,0);
var rot=vec3(0,0,0);
var look=vec3(0,0,0);
var velocity=0;
window.onload = function init () 
{
    console.log("INIT:");
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
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
    placeMesh = new diamondSquareFlatTerrainMesh(gl, vec3(0,0,0), vec3(1,1,1), vec3(0,-1,0), 128, 128);
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
            //window.alert("Mesh has "+ PlayerMesh.vertices.length + " vertices" );
            PlayerMesh.loadToGPU();
            

        }
    };
    xhttp.open("GET", "f16.ply", true);
    xhttp.send();
    move=0;
    aspect = canvas.clientWidth / canvas.clientHeight;

    //
    
    
    
    
    render();
}


function handleKeyDown(event) 
{
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) 
{
    currentlyPressedKeys[event.keyCode] = false;
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
function handlekeys()
{
    
    if (currentlyPressedKeys[16])
        velocity += .01;
    else if(currentlyPressedKeys[17])
        velocity -= .01;
    if (currentlyPressedKeys[87])
        rot[0] += 1;
    else if(currentlyPressedKeys[83])
        rot[0] -= 1;
    if (currentlyPressedKeys[65])
        rot[1] += 1;
    else if(currentlyPressedKeys[68])
        rot[1] -= 1;
    
    if (currentlyPressedKeys[37] && look[1]>-90)
        look[1]--;
    else if (!currentlyPressedKeys[37] && look[1]<0)
        look[1]++;
    else if (currentlyPressedKeys[39] && look[1]<90)
        look[1]++;
    else if (!currentlyPressedKeys[39] && look[1]>0)
        look[1]--; 
    
    if (currentlyPressedKeys[38] && look[0]>-90)
        look[0]--;
    else if (!currentlyPressedKeys[38] && look[0]<0)
        look[0]++;
    else if (currentlyPressedKeys[40] && look[0]<90)
        look[0]++;
    else if (!currentlyPressedKeys[40] && look[0]>0)
        look[0]--;     

}

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
        
        handlekeys();
        var cameraMat =mat4();
        cameraMat=mult(cameraMat, rotate(look[0], vec3(0.0, 0.0, 1.0)));
        cameraMat=mult(cameraMat, rotate(look[1], vec3(0.0, 1.0, 0.0)));
        cameraMat=mult(cameraMat, rotate(look[2], vec3(1.0, 0.0, 0.0)));
        var playerView=inverse(cameraMat);

        var velocityVec = vec3( Math.sin(degToRad(rot[0]-90)) * Math.cos(degToRad(90-rot[1])),
                                Math.cos(degToRad(rot[0]-90)),
                                Math.sin(degToRad(rot[0]-90)) * Math.sin(degToRad(90-rot[1]))
                              );
        velocityVec=normalize(velocityVec);
        loc[0] += velocityVec[0]*velocity;
        loc[1] += velocityVec[1]*velocity;
        loc[2] += velocityVec[2]*velocity;
        
        cameraMat =mat4();
        cameraMat =mult(cameraMat, translate(loc));
        cameraMat=mult(cameraMat, rotate(rot[2]+look[2], vec3(0.0, 0.0, 1.0)));
        cameraMat=mult(cameraMat, rotate(rot[1]+look[1], vec3(0.0, 1.0, 0.0)));
        cameraMat=mult(cameraMat, rotate(rot[0]+look[0], vec3(1.0, 0.0, 0.0)));
        var viewMat=inverse(cameraMat)  ;
        //projMat=mult(projMat, rotate(theta, vec3(0.0, 0.0, 0.0)));
        
        
        

  
        var projMatGPtr=gl.getUniformLocation(program, "vProjMat");
        gl.uniformMatrix4fv(projMatGPtr, false, flatten(projMat));

        //console.log("PlayerMesh test:");
        //PlayerMesh.testElements();
        //console.log("placeMesh")
        //placeMesh.testElements();
        
        if (PlayerMesh.isLoaded)
            PlayerMesh.render(playerView);
        placeMesh.render(viewMat);
        
}
function degToRad(d)
{
    return 0.0174533*d;
}
function RadToDeg(r)
{
    return 57.2958 * r;
}
