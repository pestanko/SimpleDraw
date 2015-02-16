/**
 * Created by Peter on 12.2.2015.
 */

/// <reference path="../GraphObject.ts" />


interface GeomObject {

    fillColor:string;
    stroke:string;
    pos:Point2d;
    center:boolean;

    getWidth():number;
    getHeight():number;

    getCenter():Point2d;
    getCenterX():number;
    getCenterY():number;

    getX():number;
    getY():number;
    getPos():Point2d;

    moveX(x:number);
    moveY(y:number);
    moveTo(pos:Point2d, center:boolean);

    contains(p:Point2d):boolean;


    paint(g):void;

}

class BasicObject implements GeomObject
{
    public fillColor:string;
    public stroke:string;
    public center:boolean;
    public pos:Point2d;

    public constructor(pos:Point2d, center:boolean = false ,fillColor:string = null, stroke:string = null)
    {
        this.pos = pos;
        this.fillColor = fillColor;
        this.stroke = stroke;
        this.center = center;
    }

    getWidth():number { return 0; }
    getHeight():number { return 0;}

    getCenter():Point2d { return this.pos;}
    getCenterX():number { return this.pos.getX();}
    getCenterY():number {return this.pos.getY();}

    getPos():Point2d {return this.pos;}
    getX():number {return this.pos.getX();}
    getY():number {return this.pos.getY();}

    moveX(x:number) {this.pos.moveX(x);}
    moveY(y:number) {this.pos.moveY(y);}
    moveTo(pos:Point2d, center:boolean = false) {
        this.pos.moveTo(pos,center);

        if(center) {
            var off_x = this.getWidth() / 2;
            this.pos.moveX(-off_x);
            var off_y = this.getHeight() / 2;
            this.pos.moveY(-off_y);
        }
    }

    contains(p:Point2d):boolean
    {
        var x = p.getX();
        var y = p.getY();
        var rect_x = this.getX();
        var rect_y = this.getY();
        x -= rect_x;
        y -= rect_y;
        if(x < 0 || y < 0)
            return false;
        if(x > this.getWidth() || y > this.getHeight())
            return false;
        return true;
    }

    paint(g):void
    {
        if(g == null) return;
    }
}


class Point2d implements GeomObject
{
    private x:number;
    private y:number;

    public fillColor:string;
    public stroke:string;
    public pos:Point2d;
    center:boolean;


    moveX(x:number) { this.x += x; }
    moveY(y:number) {this.y += y;}
    moveTo(pos:Point2d, center:boolean = false) {

        var off_x = pos.getCenterX();
        var off_y = pos.getCenterY();
        if(center) {
            off_x += this.getWidth() / 2;
            off_y += this.getHeight() / 2;
        }
        this.x = off_x;
        this.y = off_y;
    }

    public constructor(x:number, y:number, color:string = "black", outline?:string)
    {
        this.x = x;
        this.y = y;
        this.fillColor = color;
        this.stroke = outline;
        this.center = true;
    }

    public getX():number { return this.x;}
    public getY():number { return this.y;}


    public getWidth():number
    {
        return 0;
    }
    public getHeight():number { return 0; }

    public getCenterX():number { return this.x;}
    public getCenterY():number { return this.y;}


    public paint(g):void
    {
        if(g) {
            g.arc(this.getCenterX(), this.getCenterY(), 5, 0, Math.PI * 2);
            if(this.fillColor != null)
                g.fill();
            if(this.stroke != null)
                g.stroke();
        }

    }

    contains(p:Point2d):boolean
    {
        return (this.x == p.getX() && this.y == p.getY());
    }

    public getCenter():Point2d { return new Point2d(this.x, this.y); }
    public getPos():Point2d {return this.getCenter();}

    public toString():string
    {
        return "[" + this.x + ", "+ this.y +"]";
    }

}




