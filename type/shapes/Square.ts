/**
 * Created by Peter on 12.2.2015.
 */

/// <reference path="GeomObject.ts" />
/// <reference path="../GraphObject.ts" />



class Rectangle extends BasicObject
{
    private width:number;
    private height:number;


    public constructor(pos:Point2d, width:number = 100, height:number = 50 ,center:boolean = false ,fillColor:string = null, stroke:string = null)
    {
        super(pos, center, fillColor, stroke);
        this.width = width;
        this.height = height;

        if(center)
        {
            //console.log("CENTER -: " + (this.getWidth() / 2));
            this.pos = new Point2d( this.pos.getX() - (this.getWidth()/2), this.pos.getY() - (this.getHeight()/2));
        }
    }

    public getX():number { return this.pos.getX();}
    public getY():number { return this.pos.getY();}


    public getWidth() { return this.width;}
    public getHeight() { return this.height;}

    public getCenterX():number { return this.getCenter().getX(); }
    public getCenterY():number { return this.getCenter().getY(); }
    public getCenter():Point2d
    {
        var x:number = this.width - this.pos.getX();
        var y:number =this.height - this.pos.getY();
        x /= 2;
        y /= 2;
        return new Point2d(x,y);
    }

    public paint(g:CanvasRenderingContext2D):void {

        if (g != null) {
            if(this.fillColor != null)
                g.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
            if(this.stroke != null)
                g.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        }
    }

    static createFromPoints(begpos:Point2d, endpos:Point2d): Rectangle
    {
        var width:number = begpos.getX() - endpos.getX();
        var height:number = begpos.getY() - endpos.getY();
        return new Rectangle(begpos, width, height);
    }


    public contains(p:Point2d):boolean
    {
        var x = p.getX();
        var y = p.getY();
        var rect_x = this.getX();
        var rect_y = this.getY();
        x -= rect_x;
        y -= rect_y;
        if(x < 0 || y < 0) return false;
        if(x > this.width || y > this.height ) return false;
        return true;
    }

}



class Square extends Rectangle
{
    public constructor(p:Point2d, width:number, center:boolean = false,fillColor:string = null, stroke:string = null)
    {
        super(p, width, width,center, fillColor, stroke);
    }
}