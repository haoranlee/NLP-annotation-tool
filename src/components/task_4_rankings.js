import React, {PureComponent} from 'react';
import * as d3 from "d3";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { resetArticle } from './../store/actions/articleActions';
import uclassify_iab_cat_name_mapping from './../config/uclassify_iab_cat_name_mapping';

class Task4Rankings extends PureComponent {
    componentDidMount() {

        const { article_category_rankings } = this.props;
        const userAssignedTaxonomy = this.props.userAssignedTaxonomy;
        
        var currentWidth = parseFloat(d3.select('.WorkingArea').style('width'));
        var fixedHeight = 360;
        var fixedWidth = 600;

        const svg = d3.select("#categoryRankingsGraph")
            .append("svg")
            .attr("width", fixedWidth)
            .attr("height", fixedHeight)
            .append("g")

        var x = d3.scaleLinear()
            .domain([0, d3.max(article_category_rankings, function(d) { return d.p; })])
            .range([ 0, currentWidth]);
        
        var y = d3.scaleBand()
            .range([ 0, fixedHeight ])
            .domain(article_category_rankings.map(function(d) { return uclassify_iab_cat_name_mapping[d.className]; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .selectAll("text")
                .attr("transform", "translate(10,-8)")
                .attr("class", "categoryLabels")
                .style("text-anchor", "start")
                .attr("font-family", "Segoe UI")
                .attr("font-size", "14")
        
        var colorScale = d3.scaleOrdinal()
            .domain(article_category_rankings.map(function(d) { return uclassify_iab_cat_name_mapping[d.className]; }))
            .range(article_category_rankings.map(function(d) {
                if (uclassify_iab_cat_name_mapping[d.className] === userAssignedTaxonomy) {
                    return '#7bed9f';
                } else {
                    return '#70a1ff';
                }}))

        var horizbar = svg.append('g')

        horizbar.selectAll("probBars")
            .data(article_category_rankings)
            .enter()
            .append("rect")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(uclassify_iab_cat_name_mapping[d.className]); })
            // .attr("width", function(d) { return x(d.p); })
            .attr("width", x(0) ) // to animate later when transitioning in
            .attr("height", y.bandwidth()/2 )
            .attr("fill", "#69b3a2")
            .attr("fill", function (d) { return colorScale(uclassify_iab_cat_name_mapping[d.className]) } )
            .attr("transform", "translate(0, 15)")

        var horizbarlabel = svg.append('g')

        horizbarlabel.selectAll("text")
            .data(article_category_rankings)
            .enter()
            .append("text")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(uclassify_iab_cat_name_mapping[d.className]); })
            .text(function(d) { return (d.p * 100).toFixed(2) + '%'; })
            .attr("transform", "translate(1, 28)")
            .attr("font-size", "14")

        svg.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("width", function(d) { return x(d.p); })
            .delay(function(d,i){return(i*100)})
    }

    render(){
        const { user, article_info } = this.props;
        const finishArticle = () => {
            document.getElementById('updating-indicator').style.display = 'flex';
            document.getElementById('categoryRankings').style.display = 'none';
            const log_finish_article = async (user, article_info) => {
                const postBody = {
                    article_id: article_info.article_id
                };
                const responseFinishArticle = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/user/finish_article/' + user.email, {
                    method: 'POST',
                    body: JSON.stringify(postBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                await responseFinishArticle;
                this.props.history.push('/article_complete');
                this.props.resetArticle();
            }
            log_finish_article(user, article_info);
        }

        return (
            <div id="categoryRankings" className="center-align">
                <h5>Here are Bertie's top ten guesses for what category this article should belong to. Did Bertie do well?</h5>
                <div id="categoryRankingsGraph"></div>
                <span className="span-block">You chose:</span>
                <span className="text-emphasis">{this.props.userAssignedTaxonomy}</span>
                <span className="span-block">Was it one of Bertie's top ten?</span>
                <div className="btn blue darken-2 btn-large" onClick={finishArticle}>Done with all 4 tasks!</div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetArticle: () => dispatch(resetArticle()),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        article_info: state.article.article_info,
        article_category_rankings: state.article.article_category_rankings,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task4Rankings));