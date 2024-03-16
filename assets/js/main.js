const margin = { top: 5, left: 5, bottom: 5, right: 5 };
const width = parseInt(d3.select("#map").style("width")) - margin.left - margin.right;
const mapRatio = 0.5;
const height = width * mapRatio;
const mapRatioAdjuster = 3;
const beninCenter = [2.32, 9.31];
const projection = d3.geo.mercator().center(beninCenter).translate([width / 2, height / 2]).scale(width * [mapRatio + mapRatioAdjuster]);
const zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 20]).on("zoom", zoomed);
//=====================================================
const svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).call(zoom);
const path = d3.geo.path().projection(projection);
const features = svg.append("g");






d3.select(window).on("resize", resize);


d3.json("assets/data/gadm41_BEN.json", function (t, e) {
	if (t) return console.error(t);
	topojson.feature(e, e.objects.gadm41_BEN_1);

	features.selectAll("path")
		.data(topojson.feature(e, e.objects.gadm41_BEN_1).features).enter()
		.append("path").attr("d", path)
		.attr("fill", "#008850")
		.attr("stroke", "black")
		.attr("stroke-width", .4)
		.on("mousemove", function (t) {
			d3.select("#tooltip").style("top", d3.event.pageY + 20 + "px")
				.style("left", d3.event.pageX + 20 + "px")
				.select("#region-name-tooltip")
				.text(t.properties.NAME_1);

			d3.select("#tooltip").select("#region-type-tooltip")
				.text(t.properties.ENGTYPE_1);

			d3.select("#region-name")
				.text(t.properties.NAME_1), d3.select("#region-type")
					.text(t.properties.ENGTYPE_1);

			d3.select("#tooltip").classed("hidden", !1);
		})
		.on("mouseout", function () {
			d3.select("#tooltip").classed("hidden", !0);
		})
});


// =====================================================
// [Functions]==========================================
// =====================================================

function resize() {
	width = parseInt(d3.select("#map").style("width")),
		width = width - margin.left - margin.right,
		height = width * mapRatio,
		projection.translate([width / 2, height / 2]).center(beninCenter).scale(width * [mapRatio + mapRatioAdjuster]),
		svg.style("width", width + "px").style("height", height + "px"),
		svg.selectAll("path").attr("d", path)
}

function zoomed() {
	features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
}

