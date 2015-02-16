/**
 * Created by Peter on 12.2.2015.
 */
/// <reference path="shapes/GeomObject.ts"/>
/// <reference path="shapes/Circle.ts"/>
/// <reference path="shapes/Square.ts"/>
/// <reference path="GraphObject.ts"/>
var GraphEngine = (function () {
    function GraphEngine(gObj) {
        this.gObj = gObj;
        this.shapes = new Array();
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
    GraphEngine.prototype.getOrig = function () {
        return this.gObj;
    };
    GraphEngine.prototype.getBuffer = function () {
        return this.gBuff;
    };
    GraphEngine.prototype.addObject = function (obj) {
        this.shapes.push(obj);
    };
    GraphEngine.prototype.removeObject = function (obj) {
        var index = this.shapes.indexOf(obj);
        if (index == -1)
            return null;
        this.shapes.splice(index, 1);
    };
    GraphEngine.prototype.drawAll = function (gObj) {
        gObj.clearGraphics();
        this.shapes.forEach(function (shape) {
            gObj.paint(shape);
        });
    };
    GraphEngine.prototype.paintBuffer = function (gBuff) {
        this.gObj.paintBuffer(this.gBuff);
    };
    GraphEngine.prototype.DrawAllObjects = function () {
        this.drawAll(this.gBuff);
        this.paintBuffer(this.gBuff);
    };
    GraphEngine.prototype.draw = function (object, add) {
        if (add === void 0) { add = false; }
        if (add)
            this.addObject(object);
        this.gBuff.paint(object);
        this.gObj.paintBuffer(this.gBuff);
    };
    GraphEngine.prototype.Clear = function () {
        this.gBuff.clearGraphics();
        this.gObj.clearGraphics();
        this.shapes = [];
        this.setBgColor();
    };
    GraphEngine.prototype.Refresh = function () {
        this.gBuff.clearGraphics();
        this.gObj.clearGraphics();
        this.DrawAllObjects();
    };
    GraphEngine.prototype.setBgColor = function (color) {
        if (color === void 0) { color = null; }
        if (color == null)
            color = this.bgColor;
        this.gBuff.bgColor = color;
        this.gObj.bgColor = color;
        this.gObj.refreshBackground();
        this.gBuff.refreshBackground();
        this.bgColor = color;
    };
    GraphEngine.prototype.select = function (pos) {
        var res = this.shapes.filter(function (obj) {
            return obj.contains(pos);
        });
        if (res == null)
            return null;
        return res[res.length - 1];
    };
    return GraphEngine;
})();
//# sourceMappingURL=GraphEngine.js.map