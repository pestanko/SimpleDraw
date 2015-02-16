/**
 * Created by Peter on 12.2.2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="GeomObject.ts"/>
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(pos, radius, center, fillColor, stroke) {
        if (radius === void 0) { radius = 100; }
        if (center === void 0) { center = false; }
        if (fillColor === void 0) { fillColor = null; }
        if (stroke === void 0) { stroke = null; }
        _super.call(this, pos, center, fillColor, stroke);
        this.radius = radius;
        if (center) {
            this.pos = new Point2d(pos.getX() - (this.getWidth() / 2), pos.getY() - (this.getHeight() / 2));
        }
    }
    Circle.prototype.getX = function () {
        return this.pos.getX() - (this.radius / 2);
    };
    Circle.prototype.getY = function () {
        return this.pos.getY() - (this.radius / 2);
    };
    Circle.prototype.getWidth = function () {
        return this.radius * 2;
    };
    Circle.prototype.getHeight = function () {
        return this.radius * 2;
    };
    Circle.prototype.getRadius = function () {
        return this.radius;
    };
    Circle.prototype.getCenterX = function () {
        return this.getCenter().getX();
    };
    Circle.prototype.getCenterY = function () {
        return this.getCenter().getY();
    };
    Circle.prototype.getCenter = function () {
        return this.pos;
    };
    Circle.prototype.paint = function (g) {
        if (g != null) {
            g.beginPath();
            g.arc(this.getCenterX(), this.getCenterY(), this.radius, 0, Math.PI * 2);
            if (this.fillColor != null)
                g.fill();
            if (this.stroke != null)
                g.stroke();
            g.closePath();
        }
    };
    Circle.prototype.moveTo = function (pos, center) {
        if (center === void 0) { center = false; }
        this.pos = pos;
    };
    return Circle;
})(BasicObject);
//# sourceMappingURL=Circle.js.map