

    var Mesh=function()
    {
        this.vertices = [];
        this.faces = [];
        this.normals = [];
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
    
    Mesh.prototype.decodePly = function(text)
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