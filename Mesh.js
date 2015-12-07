

    var Mesh=function(glPlease,or,sc,of)
    {
        this.vertices = [];
        this.faces = [];
        this.normals = [];
        this.isLoaded = false;
        this.gl = glPlease;
        this.vertexBuff = null;
        this.elemBuff = null;
        this.normalBuff = null;
        this.xkcd=0;
        this.orentation=or;
        this.scale=sc;
        this.offset=of;
        this.SolidColor=vec4(1.0,1.0,1.0, 1,0);
        this.LineColor=vec4(0.0,1.0,1.0, 1.0);
        this.useLines=true;
        this.useTexture=false;
        this.useNormals=false;

    }
    Mesh.prototype.testElements = function()
    {
        for(var i=0; i<this.faces.length;i++)
        {
            if((this.faces[i][0]>= this.vertices.length)
                || (this.faces[i][1]>= this.vertices.length)
                || (this.faces[i][2]>= this.vertices.length) )
            {
                console.log(this.faces[i]);
                console.log(i);
            }
        }
    }
    Mesh.prototype.getLinearPointList = function()
    {
        ret = [];
        for(var i=0; i<this.faces.length;i++)
        {
            ret.push( this.vertices[ this.faces[i][0] ] );
            ret.push( this.vertices[ this.faces[i][1] ] );
            ret.push( this.vertices[ this.faces[i][2] ] );
            
        }
        return ret;
    }
    Mesh.prototype.render = function(viewM)
    {
        //this will be our model view matrix
        var modelMat=mat4();
        //sets the camera at the origin, facing down the z-axis, with the up vector along the y-axis
        
        //camera??
        modelMat=lookAt(vec3(0, 0, 0), vec3(0, 0, 1), vec3(0, 1, 0));
    
       
        //scales geometry
        modelMat=mult(modelMat, scalem(this.scale));
        //translates geometry
        modelMat=mult(modelMat, translate(this.offset));
         //rotates geometry
        modelMat=mult(modelMat, rotate(this.orentation[0], vec3(1.0, 0.0, 0.0)));
        modelMat=mult(modelMat, rotate(this.orentation[1], vec3(0.0, 1.0, 0.0)));
        modelMat=mult(modelMat, rotate(this.orentation[2], vec3(0.0, 0.0, 1.0)));

        if(arguments.length >= 1)
            modelMat=mult(modelMat, viewM);
        //association time!
        var modelMatGPtr=gl.getUniformLocation(program, "vModelMat");
        //Sends the rotation matrix to the GPU
        gl.uniformMatrix4fv(modelMatGPtr, false, flatten(modelMat));
        
        var normalMatGPtr=this.gl.getUniformLocation(program, "vNormalMat");
        this.gl.uniformMatrix4fv(normalMatGPtr, false, flatten(transpose(inverse(  modelMat ))));
    
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuff);
            //associates vPosition atribute with the current buffer
            var vPositionGPtr =this.gl.getAttribLocation(program, "vPosition");
            this.gl.vertexAttribPointer(vPositionGPtr, 3,this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(vPositionGPtr); 
        
           
 
    /*    
    this.gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuff);
        //associates vNormal atribute with the current buffer
        var vNormalGPtr =this.gl.getAttribLocation(program, "vNormal");
        this.gl.vertexAttribPointer(vNormalGPtr, 3,this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(vNormalGPtr);
    */
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.elemBuff);
    //contex: MeshElemGBufferr

        var colorGPtr = this.gl.getUniformLocation(program, "vColor");
        //var xGPtr = this.gl.getUniformLocation(program, "xkcd");
        //this.gl.uniform1i(xGPtr, 0);

        //Sends color to the GPU as a uniform
        this.gl.uniform4fv(colorGPtr, flatten( this.SolidColor ));
        //draws point list array as Triangles
        this.gl.drawElements(this.gl.TRIANGLES, this.faces.length*3, this.gl.UNSIGNED_SHORT, 0);
        if(this.useLines)
        {
            //Sends new color to the GPU
            this.gl.uniform4fv(colorGPtr, flatten( this.LineColor));
            //draws point list array as Lines
            this.gl.drawElements(this.gl.LINES, this.faces.length*3, this.gl.UNSIGNED_SHORT, 0);
        }

    
    }
    Mesh.prototype.loadToGPU = function()
    {
        
               //Makes a buffer object for the points
       this.elemBuff=this.gl.createBuffer();
       this.vertexBuff=this.gl.createBuffer();
       this.normalBuff=this.gl.createBuffer();
       
       this.isLoaded = true;
       
       //loads vertices into a vertex buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuff);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten( this.vertices  ), this.gl.STATIC_DRAW );
        //loads normals into a buffer
        if(this.normals.length > 0)
        {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuff);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten( this.normals  ),this.gl.STATIC_DRAW );
            this.useNormals=true
        }
        //loads faces into an element buffer
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.elemBuff);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array( flatten( this.faces  )),this.gl.STATIC_DRAW );
    
    }
    
    var PlyMesh = function()
    {
        Mesh.apply(this,arguments);
    }
    PlyMesh.prototype = new Mesh();
    PlyMesh.prototype.decodePly = function(text)
    {
    var textByLine=text.split("\n");
    //window.alert("\"" + textByLine[0].trim() + "\"");
    var facesCount;
    var verticesCount;
    if (textByLine[0].trim().toLowerCase()=="ply")
    {
        //window.alert("appears to be a complete ply file");
        var i=0;
        while(textByLine[i].trim().toLowerCase() != "end_header")
        {
            var line = textByLine[i].split(" ");
            if (line[0].toLowerCase() == "element")
            {
                if (line[1].toLowerCase() == "vertex")
                {
                    verticesCount = parseInt(line[2]);
                }
                if (line[1].toLowerCase() == "face")
                {
                    facesCount = parseInt(line[2]);
                }
            }
            i++;
        }
        
        i++
        var j =i;
        for(;i<verticesCount+j;i++)
        {
            var line = textByLine[i].split(" ");
            this.vertices.push( vec3(
                parseFloat( line[0] ),
                parseFloat( line[1] ),
                parseFloat( line[2] )
            ));
            this.normals.push( vec3(
                parseFloat( line[3] ),
                parseFloat( line[4] ),
                parseFloat( line[5] )
            ));

        }
        var pos = i
        for(;i < facesCount+pos;i++)
        {
            var line = textByLine[i].split(" ");
            this.faces.push( vec3(
                parseInt(line[1]),
                parseInt(line[2]),
                parseInt(line[3])
            ));
        }
    }
    else
    {
        facesCount = parseInt(textByLine[1]);
        verticesCount = parseInt(textByLine[0]);
        var j =2;
        for(;j<verticesCount+2;j++)
        {
            var line = textByLine[j].split(" ");
            this.vertices.push( vec3(
                parseFloat( line[0] ),
                parseFloat( line[1] ),
                parseFloat( line[2] )
            ));
            this.normals.push( vec3(
                parseFloat( line[3] ),
                parseFloat( line[4] ),
                parseFloat( line[5] )
            ));

        }
        var pos = j
        for(;j < facesCount+pos;j++)
        {
            var line = textByLine[j].split(" ");
            this.faces.push( vec3(
                parseInt(line[1]),
                parseInt(line[2]),
                parseInt(line[3])
            ));
        }
    }
    
}