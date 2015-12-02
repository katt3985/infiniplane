var arrayZ = [];

    var FlatTerrainMesh = function(glPlease,or,sc,of,X,Y)
    {
        Mesh.apply(this,arguments);
        this.sizeX =X;
        this.sizeY =Y;
    }
    FlatTerrainMesh.prototype = new Mesh();
    
    FlatTerrainMesh.prototype.generate = function()
    {
        for(var i=0; i< this.sizeY;i++)
        {
            for(var j=0; j<this.sizeX;j++)
            {
                this.vertices.push(vec3(j,0,i));
                if(i<this.sizeY-1 && j<this.sizeX-1)
                {
                    this.faces.push(vec3( this.vertices.length -1, this.vertices.length, this.vertices.length-1+this.sizeX ));
                    this.faces.push(vec3( this.vertices.length, this.vertices.length-1+this.sizeX, this.vertices.length + this.sizeX));
                }
            }
        }

    }
    
    
    
    
    
    
    var diamondSquareFlatTerrainMesh = function(glPlease,or,sc,of,X,Y)
    {
        Mesh.apply(this,arguments);
        this.sizeX =X;
        this.sizeY =Y;
    }
    diamondSquareFlatTerrainMesh.prototype = new Mesh();
    
    diamondSquareFlatTerrainMesh.prototype.generate = function()
    {
        for(var i=0; i< this.sizeY;i++)
        {
            for(var j=0; j<this.sizeX;j++)
            {
                this.vertices.push(vec3(j, diamondSquare.pointList[i],i));
                if(i<this.sizeY-1 && j<this.sizeX-1)
                {
                    this.faces.push(vec3( this.vertices.length -1, this.vertices.length, this.vertices.length-1+this.sizeX ));
                    this.faces.push(vec3( this.vertices.length, this.vertices.length-1+this.sizeX, this.vertices.length + this.sizeX));
                }
            }
        }

    }