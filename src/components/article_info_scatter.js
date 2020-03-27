import React, {PureComponent} from 'react';
import * as d3 from "d3";
import { connect } from 'react-redux';
import docEmbed from './../config/articles_docembed_tsne';

class ArticleInfoScatter extends PureComponent {
    componentDidMount() {

        const { article_info } = this.props;

        const data = docEmbed;

        const chapter2arr = ["Housing", "Manpower", "Health", "Education", "Transport", "Environment", "Courts & Crime", "No sub-category",];
        const chapter2arrColor = ["#8dd3c7", "#d9d9d9", "#bebada", "#fdb462", "#fccde5", "#b3de69", "#fb8072", "#80b1d3"];
        
        var currentWidth = parseFloat(d3.select('#articleInfoScatter').style('width'));

        const svg = d3.select("#articleInfoScatter")
            .append("svg")
            .attr("width", currentWidth)
            .attr("height", currentWidth)
            .append("g")

        var x = d3.scaleLinear()
            .domain([-140, 100])
            .range([30, currentWidth - 15]);
        var xAxis = svg.append("g")
            .attr("transform", "translate(0," + (currentWidth - 30) + ")")
            .call(d3.axisBottom(x));
        
        var y = d3.scaleLinear()
            .domain([-140, 100])
            .range([ currentWidth-30, 15]);
        var yAxis = svg.append("g")
            .attr("transform", "translate(" + 30 + ", 0)")
            .call(d3.axisLeft(y));
        
        var colorScale = d3.scaleOrdinal()
            .domain(chapter2arr)
            .range(chapter2arrColor)

        var tooltip = d3.select("#articleInfoScatter")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("border-radius", "0.5em")
            .style("padding", "5px")

        var scatterHighlight = function(d) {
            scatter
                .selectAll(".scatterDot")
                .attr("class", "scatterDot")
                .style("stroke", "none")
                .style("border-width", "0px")
            d3.select(this)
                .attr("class", "scatterDot scatterDotSelected")
                .style("stroke", "black")
                .style("border-width", "2px")
            tooltip
                .html("<span class='text-emphasis span-block'>" + d.headline_en + "</span><span class='span-block'>" + d.level_2 + "</span>")
                .style("background-color", colorScale(d.level_2) + '7f')
                .style("left", (parseFloat(d3.select(this).attr("cx")) + document.getElementById("articleInfoScatter").offsetLeft) + "px")
                .style("top", (parseFloat(d3.select(this).attr("cy")) + document.getElementById("articleInfoScatter").offsetTop) + "px")
            }

        svg.append("defs").append("SVG:clipPath")
            .attr("id", "clip")
            .append("SVG:rect")
            .attr("width", currentWidth-30-15 )
            .attr("height", currentWidth-30-15 )
            .attr("x", 30)
            .attr("y", 15);

        const legendLoc = ((currentWidth-30-15)-292.675)*(500-120)/(671.8-292.675)+120;
        
        svg.append('g')
            .selectAll("legendDots")
            .data(chapter2arr)
            .enter()
            .append("circle")
            .attr("cx", 43)
            .attr("cy", function(d,i){ return legendLoc + i*25})
            .attr("r", 10)
            .style("opacity", 0.6)
            .style("fill", function (d) { return colorScale(d) } )
        svg.append('g')
            .selectAll("legendLabels")
            .data(chapter2arr)
            .enter()
            .append("text")
            .attr("x", 55)
            .attr("y", function(d,i){ return legendLoc + 5 + i*25})
            .style("fill", function (d) { return colorScale(d) } )
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        var zoom = d3.zoom()
            .scaleExtent([1, 64])
            .extent([[0, 0], [currentWidth, currentWidth]])
            .on("zoom", updateChart);

        svg.append("rect")
            .attr("width", currentWidth)
            .attr("height", currentWidth)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(zoom);

        function updateChart() {

            var newX = d3.event.transform.rescaleX(x);
            var newY = d3.event.transform.rescaleY(y);
        
            xAxis.call(d3.axisBottom(newX))
            yAxis.call(d3.axisLeft(newY))
        
            scatter
                .selectAll("circle")
                .attr('cx', function(d) {return newX(d.document_embedding_tsne_2_x)})
                .attr('cy', function(d) {return newY(d.document_embedding_tsne_2_y)});
            
            tooltip
                .style("left", (parseFloat(document.getElementsByClassName('scatterDotSelected')[0].getAttribute('cx')) + document.getElementById("articleInfoScatter").offsetLeft) + "px")
                .style("top", (parseFloat(document.getElementsByClassName('scatterDotSelected')[0].getAttribute('cy')) + document.getElementById("articleInfoScatter").offsetTop) + "px")
        }

        var scatter = svg.append('g')
                        .attr("clip-path", "url(#clip)")

        scatter
            .selectAll("scatterDots")
            .data(data.filter(function(d) { return d.document_id !== article_info.article_id; }))
            .enter()
            .append("circle")
            .attr("data-article-id", function (d) { return d.document_id; } )
            .attr("cx", function (d) { return x(d.document_embedding_tsne_2_x); } )
            .attr("cy", function (d) { return y(d.document_embedding_tsne_2_y); } )
            .attr("r", 10)
            .style("opacity", 0.3)
            .style("fill", function (d) { return colorScale(d.level_2) } )
            .attr("class", "scatterDot")
            .style("stroke-width", "3px")
            .on("click", scatterHighlight )

        scatter
            .selectAll("scatterDots")
            .data(data.filter(function(d) { return d.document_id === article_info.article_id; }))
            .enter()
            .append("circle")
            .attr("data-article-id", function (d) { return d.document_id; } )
            .attr("cx", function (d) { return x(d.document_embedding_tsne_2_x); } )
            .attr("cy", function (d) { return y(d.document_embedding_tsne_2_y); } )
            .attr("r", 10)
            .style("opacity", 0.3)
            .style("fill", function (d) { return colorScale(d.level_2) } )
            .attr("class", "scatterDot scatterDotSelected")
            .style("stroke-width", "3px")
            .style("stroke", "black")
            .style("border-width", "2px")
            .on("click", scatterHighlight )
        tooltip
            .html("<span class='text-emphasis span-block'>" + article_info.headline + "</span><span class='span-block'>" + article_info.chapter_2 + "</span>")
            .style("background-color", colorScale(article_info.chapter_2) + '7f')
            .style("left", (parseFloat(document.getElementsByClassName('scatterDotSelected')[0].getAttribute('cx')) + document.getElementById("articleInfoScatter").offsetLeft) + "px")
            .style("top", (parseFloat(document.getElementsByClassName('scatterDotSelected')[0].getAttribute('cy')) + document.getElementById("articleInfoScatter").offsetTop) + "px")
    }

    render(){
        return (
            <div id="articleInfoScatter"></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        article_info: state.article.article_info,
    }
}

export default connect(mapStateToProps, null)(ArticleInfoScatter);