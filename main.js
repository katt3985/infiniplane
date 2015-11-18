var gl;
var program;

window.onload = function init () 
{
    console.log("INIT:");
    currentMesh = new Mesh();
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
    
}