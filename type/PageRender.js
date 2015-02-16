/**
 * Created by Peter on 13.2.2015.
 */
/// <reference path="shapes/Circle.ts"/>
/// <reference path="shapes/GeomObject.ts"/>
/// <reference path="shapes/Square.ts"/>
/// <reference path="GraphObject.ts"/>
/// <reference path="GraphEngine.ts"/>
var Actions;
(function (Actions) {
    Actions[Actions["NONE"] = 0] = "NONE";
    Actions[Actions["RECTANGE"] = 1] = "RECTANGE";
    Actions[Actions["SQUARE"] = 2] = "SQUARE";
    Actions[Actions["CIRCLE"] = 3] = "CIRCLE";
    Actions[Actions["DELETE"] = 4] = "DELETE";
    Actions[Actions["MOVE"] = 5] = "MOVE";
})(Actions || (Actions = {}));
var PageRender = (function () {
    function PageRender() {
        this.action = 0 /* NONE */;
        this.selectedCanvas = null;
        this.selectedObject = null;
        this.tmpBuffer = null;
        this.canvas = (document.getElementById("playground"));
        if (this.canvas == null) {
            console.log("Canvas is not loaded or cannot be converted.");
            return;
        }
        this.engine = new GraphEngine(new GraphObject(this.canvas));
        this.engine.bgColor = "#" + document.getElementById("backgroundColor").value;
        this.engine.fillColor = "#" + document.getElementById("fillColor").value;
        this.engine.stripeColor = "#" + document.getElementById("stripeColor").value;
        this.engine.Clear();
    }
    PageRender.prototype.run = function () {
        var _this = this;
        this.canvas.onclick = function (e) { return _this.clickEvent(e); };
        this.canvas.onmousedown = function (e) { return _this.mouseDownEvent(e); };
        this.canvas.onmouseup = function (e) { return _this.mouseUpEvent(e); };
        this.canvas.onmousemove = function (e) { return _this.mouseMoveEvent(e); };
        this.bind_header();
        this.bind_obj_menu();
    };
    PageRender.prototype.mouseUpEvent = function (e) {
        if (this.selectedObject == null || this.action != 5 /* MOVE */)
            return;
        var point = this.getMousePosInCanvas(new Point2d(e.clientX, e.clientY));
        this.selectedObject.moveTo(point, true);
        this.engine.draw(this.selectedObject, true);
        this.engine.Refresh();
        this.selectedObject = null;
    };
    PageRender.prototype.mouseDownEvent = function (e) {
        var point = this.getMousePosInCanvas(new Point2d(e.clientX, e.clientY));
        if (this.action != 5 /* MOVE */)
            return;
        this.selectedObject = this.engine.select(point);
        if (this.selectedObject == null) {
            console.log("No selected object.");
            return;
        }
        var tmp_canvas = document.createElement("canvas");
        tmp_canvas.width = this.canvas.width;
        tmp_canvas.height = this.canvas.height;
        this.tmpBuffer = new GraphObject(tmp_canvas);
        this.engine.removeObject(this.selectedObject);
        this.engine.drawAll(this.tmpBuffer);
        this.engine.Refresh();
        this.engine.getOrig().paint(this.selectedObject);
    };
    PageRender.prototype.mouseMoveEvent = function (e) {
        if (this.action != 5 /* MOVE */)
            return;
        if (this.selectedObject == null || this.tmpBuffer == null)
            return null;
        var point = this.getMousePosInCanvas(new Point2d(e.clientX, e.clientY));
        this.engine.paintBuffer(this.tmpBuffer);
        this.selectedObject.moveTo(point, true);
        this.engine.getOrig().paint(this.selectedObject);
    };
    PageRender.prototype.clickEvent = function (e) {
        var point = new Point2d(e.clientX, e.clientY);
        point = this.getMousePosInCanvas(point);
        switch (this.action) {
            case 3 /* CIRCLE */:
                var circle = new Circle(point, 30, false, this.engine.fillColor, this.engine.stripeColor);
                this.engine.draw(circle, true);
                break;
            case 1 /* RECTANGE */:
                var rect = new Rectangle(point, 100, 50, true, this.engine.fillColor, this.engine.stripeColor);
                this.engine.draw(rect, true);
                break;
            case 2 /* SQUARE */:
                var square = new Square(point, 50, true, this.engine.fillColor, this.engine.stripeColor);
                this.engine.draw(square, true);
                break;
            case 4 /* DELETE */:
                var item = this.engine.select(point);
                if (item) {
                    this.engine.removeObject(item);
                    this.engine.Refresh();
                }
                break;
        }
    };
    PageRender.prototype.getMousePosInCanvas = function (pos) {
        var rect = this.canvas.getBoundingClientRect();
        var x = pos.getX() - rect.left;
        var y = pos.getY() - rect.top;
        return new Point2d(x, y);
    };
    PageRender.prototype.bind_header = function () {
        var _this = this;
        var backgroundColor = document.getElementById("backgroundColor");
        var stripeColor = document.getElementById("stripeColor");
        var fillColor = document.getElementById("fillColor");
        document.getElementById("ClearAll").onclick = function () { return _this.engine.Clear(); };
        backgroundColor.onchange = function () { return _this.change_background(backgroundColor.value); };
        fillColor.onchange = function () { return _this.change_fill(fillColor.value); };
        stripeColor.onchange = function () { return _this.change_stripe(stripeColor.value); };
    };
    PageRender.prototype.change_background = function (color) {
        console.log("BG_COLOR: " + color);
        color = "#" + color;
        this.engine.bgColor = color;
        this.engine.setBgColor(color);
    };
    PageRender.prototype.change_fill = function (color) {
        console.log("FILL_COLOR: " + color);
        this.engine.fillColor = "#" + color;
    };
    PageRender.prototype.change_stripe = function (color) {
        console.log("STRIPE_COLOR: " + color);
        this.engine.stripeColor = "#" + color;
    };
    PageRender.prototype.bind_obj_menu = function () {
        var _this = this;
        var c_square = document.getElementById("c_square");
        var c_rect = document.getElementById("c_rect");
        var c_circle = document.getElementById("c_circle");
        var c_remove = document.getElementById("img_remove");
        var c_move = document.getElementById("img_move");
        var g_sq = c_square.getContext("2d");
        g_sq.strokeStyle = "black";
        g_sq.strokeRect(8, 8, 34, 34);
        g_sq.fillStyle = "#FFFFFF";
        g_sq.fillRect(8, 8, 34, 34);
        var g_rc = c_rect.getContext("2d");
        g_rc.strokeStyle = "black";
        g_rc.fillStyle = "white";
        g_rc.strokeRect(8, 12, 34, 26);
        g_rc.fillRect(8, 12, 34, 26);
        var g_c = c_circle.getContext("2d");
        g_c.beginPath();
        g_c.arc(25, 25, 20, 0, 2 * Math.PI, false);
        g_c.strokeStyle = "black";
        g_c.fillStyle = "white";
        g_c.stroke();
        g_c.fill();
        g_c.closePath();
        c_square.onclick = function () { return _this.action_square(c_square); };
        c_rect.onclick = function () { return _this.action_rect(c_rect); };
        c_circle.onclick = function () { return _this.action_circle(c_circle); };
        c_remove.onclick = function () { return _this.action_remove(c_remove); };
        c_move.onclick = function () { return _this.action_move(c_move); };
    };
    PageRender.prototype.action_remove = function (canv) {
        this.action = 4 /* DELETE */;
        this.action_class_mod(canv);
    };
    PageRender.prototype.action_move = function (canv) {
        this.action = 5 /* MOVE */;
        this.action_class_mod(canv);
    };
    PageRender.prototype.action_class_mod = function (can) {
        if (this.selectedCanvas)
            this.selectedCanvas.className = "menu_item_not_selected";
        can.className = "menu_item_selected";
        this.selectedCanvas = can;
    };
    PageRender.prototype.action_square = function (can) {
        this.action = 2 /* SQUARE */;
        this.action_class_mod(can);
    };
    PageRender.prototype.action_rect = function (can) {
        this.action = 1 /* RECTANGE */;
        this.action_class_mod(can);
    };
    PageRender.prototype.action_circle = function (can) {
        this.action = 3 /* CIRCLE */;
        this.action_class_mod(can);
    };
    PageRender.prototype.loadImage = function (canvas, url) {
        if (canvas == null)
            console.log("canvas is null");
        var img = new Image();
        var cont = canvas.getContext("2d");
        img.onload = function () { return function () {
            cont.drawImage(this, 5, 5, 40, 40);
        }; };
        img.src = url;
    };
    return PageRender;
})();
//# sourceMappingURL=PageRender.js.map