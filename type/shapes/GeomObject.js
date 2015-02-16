/**
 * Created by Peter on 12.2.2015.
 */
/// <reference path="../GraphObject.ts" />
var BasicObject = (function () {
    function BasicObject(pos, center, fillColor, stroke) {
        if (center === void 0) { center = false; }
        if (fillColor === void 0) { fillColor = null; }
        if (stroke === void 0) { stroke = null; }
        this.pos = pos;
        this.fillColor = fillColor;
        this.stroke = stroke;
        this.center = center;
    }
    BasicObject.prototype.getWidth = function () {
        return 0;
    };
    BasicObject.prototype.getHeight = function () {
        return 0;
    };
    BasicObject.prototype.getCenter = function () {
        return this.pos;
    };
    BasicObject.prototype.getCenterX = function () {
        return this.pos.getX();
    };
    BasicObject.prototype.getCenterY = function () {
        return this.pos.getY();
    };
    BasicObject.prototype.getPos = function () {
        return this.pos;
    };
    BasicObject.prototype.getX = function () {
        return this.pos.getX();
    };
    BasicObject.prototype.getY = function () {
        return this.pos.getY();
    };
    BasicObject.prototype.moveX = function (x) {
        this.pos.moveX(x);
    };
    BasicObject.prototype.moveY = function (y) {
        this.pos.moveY(y);
    };
    BasicObject.prototype.moveTo = function (pos, center) {
        if (center === void 0) { center = false; }
        this.pos.moveTo(pos, center);
        if (center) {
            var off_x = this.getWidth() / 2;
            this.pos.moveX(-off_x);
            var off_y = this.getHeight() / 2;
            this.pos.moveY(-off_y);
        }
    };
    BasicObject.prototype.contains = function (p) {
        var x = p.getX();
        var y = p.getY();
        var rect_x = this.getX();
        var rect_y = this.getY();
        x -= rect_x;
        y -= rect_y;
        if (x < 0 || y < 0)
            return false;
        if (x > this.getWidth() || y > this.getHeight())
            return false;
        return true;
    };
    BasicObject.prototype.paint = function (g) {
        if (g == null)
            return;
    };
    return BasicObject;
})();
var Point2d = (function () {
    function Point2d(x, y, color, outline) {
        if (color === void 0) { color = "black"; }
        this.x = x;
        this.y = y;
        this.fillColor = color;
        this.stroke = outline;
        this.center = true;
    }
    Point2d.prototype.moveX = function (x) {
        this.x += x;
    };
    Point2d.prototype.moveY = function (y) {
        this.y += y;
    };
    Point2d.prototype.moveTo = function (pos, center) {
        if (center === void 0) { center = false; }
        var off_x = pos.getCenterX();
        var off_y = pos.getCenterY();
        if (center) {
            off_x += this.getWidth() / 2;
            off_y += this.getHeight() / 2;
        }
        this.x = off_x;
        this.y = off_y;
    };
    Point2d.prototype.getX = function () {
        return this.x;
    };
    Point2d.prototype.getY = function () {
        return this.y;
    };
    Point2d.prototype.getWidth = function () {
        return 0;
    };
    Point2d.prototype.getHeight = function () {
        return 0;
    };
    Point2d.prototype.getCenterX = function () {
        return this.x;
    };
    Point2d.prototype.getCenterY = function () {
        return this.y;
    };
    Point2d.prototype.paint = function (g) {
        if (g) {
            g.arc(this.getCenterX(), this.getCenterY(), 5, 0, Math.PI * 2);
            if (this.fillColor != null)
                g.fill();
            if (this.stroke != null)
                g.stroke();
        }
    };
    Point2d.prototype.contains = function (p) {
        return (this.x == p.getX() && this.y == p.getY());
    };
    Point2d.prototype.getCenter = function () {
        return new Point2d(this.x, this.y);
    };
    Point2d.prototype.getPos = function () {
        return this.getCenter();
    };
    Point2d.prototype.toString = function () {
        return "[" + this.x + ", " + this.y + "]";
    };
    return Point2d;
})();
//# sourceMappingURL=GeomObject.js.map