/**
 * Created by Peter on 12.2.2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="GeomObject.ts" />
/// <reference path="../GraphObject.ts" />
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(pos, width, height, center, fillColor, stroke) {
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 50; }
        if (center === void 0) { center = false; }
        if (fillColor === void 0) { fillColor = null; }
        if (stroke === void 0) { stroke = null; }
        _super.call(this, pos, center, fillColor, stroke);
        this.width = width;
        this.height = height;
        if (center) {
            //console.log("CENTER -: " + (this.getWidth() / 2));
            this.pos = new Point2d(this.pos.getX() - (this.getWidth() / 2), this.pos.getY() - (this.getHeight() / 2));
        }
    }
    Rectangle.prototype.getX = function () {
        return this.pos.getX();
    };
    Rectangle.prototype.getY = function () {
        return this.pos.getY();
    };
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };
    Rectangle.prototype.getCenterX = function () {
        return this.getCenter().getX();
    };
    Rectangle.prototype.getCenterY = function () {
        return this.getCenter().getY();
    };
    Rectangle.prototype.getCenter = function () {
        var x = this.width - this.pos.getX();
        var y = this.height - this.pos.getY();
        x /= 2;
        y /= 2;
        return new Point2d(x, y);
    };
    Rectangle.prototype.paint = function (g) {
        if (g != null) {
            if (this.fillColor != null)
                g.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
            if (this.stroke != null)
                g.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        }
    };
    Rectangle.createFromPoints = function (begpos, endpos) {
        var width = begpos.getX() - endpos.getX();
        var height = begpos.getY() - endpos.getY();
        return new Rectangle(begpos, width, height);
    };
    Rectangle.prototype.contains = function (p) {
        var x = p.getX();
        var y = p.getY();
        var rect_x = this.getX();
        var rect_y = this.getY();
        x -= rect_x;
        y -= rect_y;
        if (x < 0 || y < 0)
            return false;
        if (x > this.width || y > this.height)
            return false;
        return true;
    };
    return Rectangle;
})(BasicObject);
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(p, width, center, fillColor, stroke) {
        if (center === void 0) { center = false; }
        if (fillColor === void 0) { fillColor = null; }
        if (stroke === void 0) { stroke = null; }
        _super.call(this, p, width, width, center, fillColor, stroke);
    }
    return Square;
})(Rectangle);
//# sourceMappingURL=Square.js.map