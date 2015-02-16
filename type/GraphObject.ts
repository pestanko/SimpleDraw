/// <reference path="shapes/GeomObject.ts"/>


class GraphObject {

    public constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.createGraphics();
    }

    private canvas:HTMLCanvasElement;
    private canvasGraph:CanvasRenderingContext2D;

    public bgColor:string = "#000";



    public Canvas():HTMLCanvasElement {
        return this.canvas;
    }


    public paintBuffer(gb:GraphObject)
    {
        this.clearGraphics();
        this.canvasGraph.drawImage(gb.Canvas(), 0 , 0);
    }

    public isInicialised():boolean { return this.canvasGraph != null;}
    public createGraphics() {
        return this.canvasGraph = this.canvas.getContext("2d");
    }

    public Graphics2D():CanvasRenderingContext2D {
        return this.canvasGraph;
    }

    public paint(geomObj:GeomObject):void {
        if(!this.isInicialised() || geomObj == null)
            return;
        var g:CanvasRenderingContext2D = this.Graphics2D();
        g.strokeStyle = geomObj.stroke;
        g.fillStyle = geomObj.fillColor;


        geomObj.paint(g);

        if(geomObj.fillColor != null)
        {
            g.fill();
        }
        if(geomObj.stroke != null)
        {
            g.stroke();
        }

    }

    public width():number
    {

        return this.canvas.width;
    }

    public height():number
    {
        return this.canvas.height;
    }

    public clearGraphics()
    {
        this.canvas.width = this.canvas.width;
        this.refreshBackground();
    }

    public refreshBackground()
    {
        this.canvas.style.backgroundColor = this.bgColor;
    }

}






