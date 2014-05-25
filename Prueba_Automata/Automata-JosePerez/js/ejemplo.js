var diagram = new go.Diagram("canvas");
var $$ = go.GraphObject.make;
diagram.initialContentAlignment = go.Spot.Center;
diagram.undoManager.isEnabled = false;
diagram.isReadOnly = true
diagram.allowSelect = false;
diagram.initialAutoScale = go.Diagram.Uniform;
//diagram.linkTemplate = $$(go.Link, { curve: go.Link.Bezier }, $(go.Shape), $(go.Shape, { toArrow: "Standard" }), $(go.TextBlock,                        // this is a Link label
//new go.Binding("text", "text")));

///////////////////////////////////////////////////////////

var estados = $("#cboEstados").select2("data");
var elementos = $("#cboElementos").select2("data");
var estadosFinales = $("#cboEstados").select2("data");

var iEstados = [];
var iTransiciones = [];
var nodos = [];

$.each(estados, function (i, v) {
    iEstados.push({ key: v.text });
    var node = new go.Node(go.Panel.Auto);
    var shape = new go.Shape();

    shape.figure = "Circle";
    $.each($('#cboFinal').val(), function (ii, vv) {
        if (v.text == vv)
            shape.figure = "Ring";
    });

    if (v.text == $("#cboInicial").val()) {
        shape.fill = "lightblue";
    } else {
        shape.fill = "White";
    }

    node.key = v.text;


    node.add(shape);
    var textblock = new go.TextBlock();
    textblock.text = v.text;
    textblock.margin = 15;
    node.add(textblock);
    diagram.add(node);

});

$.each(transiciones, function (i, v) {
    //var link = new go.Link();
    diagram.startTransaction("Añadir link");
    console.log('inicio: ' + v.Inicio + ' Fin: ' + v.Fin);
    var nodeInicio = diagram.findNodeForKey(v.Inicio);
    var nodeFin = diagram.findNodeForKey(v.Fin);

    var link = new go.Link();
    link.fromNode = nodeInicio;
    link.toNode = nodeFin;

    var model = diagram.model;
    var linkdata = {};
    linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(v.Inicio);
    linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(v.Fin);
    // and add the link data to the model
    model.addLinkData(linkdata);
    diagram.commitTransaction("Añadir link");
});






//diagram.model = new go.GraphLinksModel(iEstados, iTransiciones);