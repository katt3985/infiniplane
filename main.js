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

function render()
{
    //request refreshed frame for animation
    requestAnimFrame(render);
    
    //clears screen and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    

    
}