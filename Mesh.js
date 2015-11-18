

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