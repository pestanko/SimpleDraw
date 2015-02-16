/**
 * Created by Peter on 12.2.2015.
 */

/// <reference path="shapes/GeomObject.ts"/>
/// <reference path="shapes/Circle.ts"/>
/// <reference path="shapes/Square.ts"/>
/// <reference path="GraphObject.ts"/>


class GraphEngine
{
    private shapes:Array<GeomObject>;
    private gObj:GraphObject;
    private gBuff:GraphObject;

    public bgColor:string;
    public fillColor:string;
    public stripeColor:string;




    public getOrig():GraphObject
    {
        return this.gObj;
    }

    public getBuffer():GraphObject
    {
        return this.gBuff;
    }

    public constructor(gObj:GraphObject)
    {
        this.gObj = gObj;
        this.shapes = new Array<GeomObject>();
        var buffc = document.createElement("canvas");
        var canvas = gObj.Canvas();
        buffc.height = canvas.height;
        buffc.width = canvas.width;
        this.gBuff = new GraphObject(buffc);
        this.bgColor = "white";
        this.fillColor = "black";
        this.stripeColor = "black";
        this.Clear();
    }

    public addObject(obj:GeomObject):void
    {
        this.shapes.push(obj);
    }

    public removeObject(obj:GeomObject):GeomObject
    {
        var index = this.shapes.indexOf(obj);
        if(index == -1) return null;
        this.shapes.splice(index, 1);
    }

    public drawAll(gObj:GraphObject):void
    {
        gObj.clearGraphics();
        this.shapes.forEach(function(shape:GeomObject)
        {
            gObj.paint(shape);
        });
    }

    public paintBuffer(gBuff:GraphObject):void
    {
        this.gObj.paintBuffer(this.gBuff);
    }

    public DrawAllObjects():void
    {
        this.drawAll(this.gBuff);
        this.paintBuffer(this.gBuff);
    }


    public draw(object:GeomObject, add:boolean = false)
    {
        if(add)
            this.addObject(object);
        this.gBuff.paint(object);
        this.gObj.paintBuffer(this.gBuff);
    }


    public Clear()
    {
        this.gBuff.clearGraphics();
        this.gObj.clearGraphics();
        this.shapes = [];
        this.setBgColor();
    }

    public Refresh()
    {
        this.gBuff.clearGraphics();
        this.gObj.clearGraphics();
        this.DrawAllObjects();
    }

    public setBgColor(color:string = null)
    {
        if(color == null)
            color = this.bgColor;

        this.gBuff.bgColor = color;
        this.gObj.bgColor  = color;
        this.gObj.refreshBackground();
        this.gBuff.refreshBackground();
        this.bgColor = color;
    }

    public select(pos:Point2d)
    {
        var res = this.shapes.filter(function(obj:GeomObject) {
            return obj.contains(pos);
        });
        if(res == null) return null;
        return res[res.length - 1];
    }



}






