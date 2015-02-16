/// <reference path="shapes/GeomObject.ts"/>
var GraphObject = (function () {
    function GraphObject(canvas) {
        this.bgColor = "#000";
        this.canvas = canvas;
        this.createGraphics();
    }
    GraphObject.prototype.Canvas = function () {
        return this.canvas;
    };
    GraphObject.prototype.paintBuffer = function (gb) {
        this.clearGraphics();
        this.canvasGraph.drawImage(gb.Canvas(), 0, 0);
    };
    GraphObject.prototype.isInicialised = function () {
        return this.canvasGraph != null;
    };
    GraphObject.prototype.createGraphics = function () {
        return this.canvasGraph = this.canvas.getContext("2d");
    };
    GraphObject.prototype.Graphics2D = function () {
        return this.canvasGraph;
    };
    GraphObject.prototype.paint = function (geomObj) {
        if (!this.isInicialised() || geomObj == null)
            return;
        var g = this.Graphics2D();
        g.strokeStyle = geomObj.stroke;
        g.fillStyle = geomObj.fillColor;
        geomObj.paint(g);
        if (geomObj.fillColor != null) {
            g.fill();
        }
        if (geomObj.stroke != null) {
            g.stroke();
        }
    };
    GraphObject.prototype.width = function () {
        return this.canvas.width;
    };
    GraphObject.prototype.height = function () {
        return this.canvas.height;
    };
    GraphObject.prototype.clearGraphics = function () {
        this.canvas.width = this.canvas.width;
        this.refreshBackground();
    };
    GraphObject.prototype.refreshBackground = function () {
        this.canvas.style.backgroundColor = this.bgColor;
    };
    return GraphObject;
})();
//# sourceMappingURL=GraphObject.js.map