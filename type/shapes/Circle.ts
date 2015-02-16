/**
 * Created by Peter on 12.2.2015.
 */

/// <reference path="GeomObject.ts"/>

class Circle extends BasicObject {
    private radius:number;


    public constructor(pos:Point2d, radius:number = 100, center:boolean = false, fillColor:string = null, stroke:string = null) {
        super(pos, center, fillColor, stroke);
        this.radius = radius;
        if (center) {
            this.pos = new Point2d(pos.getX() - (this.getWidth() / 2), pos.getY() - (this.getHeight() / 2));
        }
    }

    public getX():number {
        return this.pos.getX() - (this.radius / 2);
    }

    public getY():number {
        return this.pos.getY() - (this.radius / 2);
    }


    public getWidth() {
        return this.radius * 2;
    }

    public getHeight() {
        return this.radius * 2;
    }

    public getRadius() {
        return this.radius;
    }

    public getCenterX():number {
        return this.getCenter().getX();
    }

    public getCenterY():number {
        return this.getCenter().getY();
    }

    public getCenter():Point2d {
        return this.pos;
    }

    public paint(g:CanvasRenderingContext2D):void {
        if (g != null) {
            g.beginPath();
            g.arc(this.getCenterX(), this.getCenterY(), this.radius, 0, Math.PI * 2);
            if(this.fillColor != null)
                g.fill();
            if(this.stroke != null)
                g.stroke();
            g.closePath();
        }

    }

    public moveTo(pos:Point2d, center:boolean = false)
    {
        this.pos = pos;
    }
}

