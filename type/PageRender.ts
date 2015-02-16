/**
 * Created by Peter on 13.2.2015.
 */

/// <reference path="shapes/Circle.ts"/>
/// <reference path="shapes/GeomObject.ts"/>
/// <reference path="shapes/Square.ts"/>
/// <reference path="GraphObject.ts"/>
/// <reference path="GraphEngine.ts"/>


enum Actions
{
    NONE,
    RECTANGE,
    SQUARE,
    CIRCLE,
    DELETE,
    MOVE
}

class PageRender
{
    private engine:GraphEngine;
    private canvas:HTMLCanvasElement;

    private action:Actions = Actions.NONE;
    private selectedCanvas:HTMLElement = null;

    private selectedObject:GeomObject = null;

    private tmpBuffer:GraphObject = null;

    public constructor()
    {
        this.canvas = <HTMLCanvasElement> (document.getElementById("playground"));
        if(this.canvas == null)
        {
            console.log("Canvas is not loaded or cannot be converted.");
            return;
        }
        this.engine = new GraphEngine(new GraphObject(this.canvas));
        this.engine.bgColor = "#" + ( <HTMLInputElement>  document.getElementById("backgroundColor")).value;
        this.engine.fillColor = "#" + ( <HTMLInputElement> document.getElementById("fillColor")).value;
        this.engine.stripeColor = "#" + ( <HTMLInputElement>  document.getElementById("stripeColor")).value;
        this.engine.Clear();
    }

    public run()
    {
        this.canvas.onclick = (e) => this.clickEvent(e);
        this.canvas.onmousedown = (e) => this.mouseDownEvent(e);
        this.canvas.onmouseup  = (e) => this.mouseUpEvent(e);
        this.canvas.onmousemove= (e) => this.mouseMoveEvent(e);
        this.bind_header();
        this.bind_obj_menu();
    }


    public mouseUpEvent(e:MouseEvent):void
    {
        if(this.selectedObject == null || this.action != Actions.MOVE)
            return;
        var point = this.getMousePosInCanvas(new Point2d(e.clientX, e.clientY));
        this.selectedObject.moveTo(point, true);
        this.engine.draw(this.selectedObject, true);
        this.engine.Refresh();
        this.selectedObject = null;
    }


    public mouseDownEvent(e:MouseEvent):void
    {
        var point = this.getMousePosInCanvas(new Point2d(e.clientX, e.clientY));

        if(this.action != Actions.MOVE)
            return;
        this.selectedObject = this.engine.select(point);
        if(this.selectedObject == null){
            console.log("No selected object.");
            return;
        }

        var tmp_canvas = <HTMLCanvasElement> document.createElement("canvas");
        tmp_canvas.width = this.canvas.width;
        tmp_canvas.height = this.canvas.height;
        this.tmpBuffer = new GraphObject(tmp_canvas);

        this.engine.removeObject(this.selectedObject);
        this.engine.drawAll(this.tmpBuffer);
        this.engine.Refresh();
        this.engine.getOrig().paint(this.selectedObject);
    }

    public mouseMoveEvent(e)
    {
        if(this.action != Actions.MOVE)
            return;

        if(this.selectedObject == null || this.tmpBuffer == null)
            return null;

        var point = this.getMousePosInCanvas(new Point2d(e.clientX, e.clientY));

        this.engine.paintBuffer(this.tmpBuffer);
        this.selectedObject.moveTo(point, true);
        this.engine.getOrig().paint(this.selectedObject);
    }



    public clickEvent(e:MouseEvent)
    {
        var point = new Point2d(e.clientX, e.clientY);
        point = this.getMousePosInCanvas(point);


        switch (this.action){
            case Actions.CIRCLE:
                var circle = new Circle(point, 30, false, this.engine.fillColor, this.engine.stripeColor);
                this.engine.draw(circle, true);
                break;
            case Actions.RECTANGE:
                var rect = new Rectangle(point, 100, 50, true ,this.engine.fillColor, this.engine.stripeColor);
                this.engine.draw(rect, true);
                break;
            case Actions.SQUARE:
                var square = new Square(point, 50, true, this.engine.fillColor, this.engine.stripeColor);
                this.engine.draw(square, true);
                break;
            case Actions.DELETE:
                var item = this.engine.select(point);
                if(item)
                {
                    this.engine.removeObject(item);
                    this.engine.Refresh();
                }
                break;
        }
    }

    public getMousePosInCanvas(pos:Point2d):Point2d
    {
        var rect = this.canvas.getBoundingClientRect();
        var x:number = pos.getX() - rect.left;
        var y:number = pos.getY() - rect.top;
        return new Point2d(x,y);
    }


    private bind_header()
    {
        var backgroundColor = <HTMLInputElement> document.getElementById("backgroundColor");
        var stripeColor = <HTMLInputElement> document.getElementById("stripeColor");
        var fillColor = <HTMLInputElement> document.getElementById("fillColor");

        document.getElementById("ClearAll").onclick = () => this.engine.Clear();

        backgroundColor.onchange = () => this.change_background(backgroundColor.value);
        fillColor.onchange = () => this.change_fill(fillColor.value);
        stripeColor.onchange = () => this.change_stripe(stripeColor.value);

    }

    private change_background(color:string)
    {
        console.log("BG_COLOR: " + color);
        color = "#" + color;
        this.engine.bgColor = color;
        this.engine.setBgColor(color);

    }

    private change_fill(color:string)
    {
        console.log("FILL_COLOR: " + color);
        this.engine.fillColor = "#" + color;

    }

    private change_stripe(color:string)
    {
        console.log("STRIPE_COLOR: " + color);
        this.engine.stripeColor = "#" + color;

    }

    private bind_obj_menu()
    {
        var c_square = <HTMLCanvasElement> document.getElementById("c_square");
        var c_rect = <HTMLCanvasElement> document.getElementById("c_rect");
        var c_circle = <HTMLCanvasElement> document.getElementById("c_circle");
        var c_remove = <HTMLImageElement> document.getElementById("img_remove");
        var c_move = <HTMLImageElement> document.getElementById("img_move");

        var g_sq = c_square.getContext("2d");
        g_sq.strokeStyle = "black";
        g_sq.strokeRect(8,8, 34, 34);
        g_sq.fillStyle = "#FFFFFF";
        g_sq.fillRect(8,8, 34, 34);

        var g_rc = c_rect.getContext("2d");
        g_rc.strokeStyle = "black";
        g_rc.fillStyle = "white";
        g_rc.strokeRect(8, 12, 34, 26);
        g_rc.fillRect(8, 12, 34, 26);
        var g_c = c_circle.getContext("2d");
        g_c.beginPath();
        g_c.arc( 25, 25 ,20, 0, 2 * Math.PI, false);
        g_c.strokeStyle = "black";
        g_c.fillStyle = "white"
        g_c.stroke();
        g_c.fill();
        g_c.closePath();

        c_square.onclick = () => this.action_square(c_square);
        c_rect.onclick = () => this.action_rect(c_rect);
        c_circle.onclick = () => this.action_circle(c_circle);
        c_remove.onclick = () => this.action_remove(c_remove);
        c_move.onclick  = () => this.action_move(c_move);


    }

    private action_remove(canv)
    {
        this.action = Actions.DELETE;
        this.action_class_mod(canv);
    }

    private action_move(canv)
    {
        this.action = Actions.MOVE;
        this.action_class_mod(canv);
    }

    private action_class_mod(can)
    {
        if(this.selectedCanvas)
            this.selectedCanvas.className = "menu_item_not_selected";
        can.className = "menu_item_selected";
        this.selectedCanvas = can;
    }


    private action_square(can)
    {
        this.action = Actions.SQUARE;
        this.action_class_mod(can);

    }

    private action_rect(can)
    {
        this.action = Actions.RECTANGE;
        this.action_class_mod(can);
    }

    private action_circle(can)
    {
        this.action = Actions.CIRCLE;
        this.action_class_mod(can);
    }

    public loadImage(canvas:HTMLCanvasElement, url:string)
    {
        if(canvas == null)
            console.log("canvas is null");
        var img = new Image();
        var cont = canvas.getContext("2d");
        img.onload = () => function()
        {
            cont.drawImage(this, 5,5, 40,40);
        };
        img.src = url;
    }

}









