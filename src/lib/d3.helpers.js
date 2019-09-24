import * as d3 from "d3"
import ReactDOM from "react-dom";
import {find} from "lodash"
export var FORCE = (function(nsp){

    var
        width = 500,
        height = 500,
    initForce = (nodes, links) => {
        nsp.force = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-100))
            .force("link", d3.forceLink(links).id(data=>data.name).distance(170))
            .force("center", d3.forceCenter().x(nsp.width /2).y(nsp.height / 2))
            .force("collide", d3.forceCollide([30]).iterations([5]));
    },

        enterNode = (selection) => {
            selection.select('circle')
                .attr("r", 20)
                .style("fill", '#832a3e' )
              .style("cursor", "pointer")
                .style("stroke", "bisque");

            selection.select('text')
                .style("fill", "honeydew")
                .style("font-weight", "900")
                .style("text-transform", "uppercase")
                .style("text-anchor", "middle")
                .style("alignment-baseline", "middle")
                .style("font-size", "20px")
                .style("font-family", "Arial")
              .style("cursor", "pointer")
        },

        updateNode = (selection) => {
            selection
                .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
                .attr("cx", function(d) { return d.x = Math.max(30, Math.min(width - 30, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(30, Math.min(height - 30, d.y)); })

        },

        enterLink = (selection) => {
            selection
                .attr("stroke-width", 3)
                .attr("stroke","bisque")
                .attr("stroke", "black")
                .attr("stroke-width", 4)
                .attr("fill", "none")
                .attr("marker-end","url(#markerArrow)")

        },
        updateLink = (selection) => {
            selection
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y)
              .attr("stroke", "black")
                .attr("stroke-width", 4)
                .attr("fill", "none")
                .attr("marker-end","url(#markerArrow)")
        },
      getDatum = (nodes, name)=>{
       return find(nodes, d=>{
           return +d3.select(d).data()[0].name === +name
        })
      },
      reset = selection =>{
          selection.selectAll('.node').select("circle").each(d=>{
              console.log("the stuff ", d.classed("samaki", true))
           // return d3.select(d).style("fill", '#832a3e' )
          })
      },
        updateGraph = (selection, graph, search) => {
            const group = selection.selectAll('.node')
              group.classed("reset",false);
              group.on("click", function(d){
                      d3.select(this).select("circle").classed("selected-node", true)
                      const allNodes = group.select("circle").nodes()

                let count = 0;

                      if(search === "BFS"){
                        console.log("the search method in bfs is  ", search)
                        graph.bfs(d.name, v=>{
                          const foundDatum = getDatum(allNodes, v)
                          console.log("next node should be ", v, d3.select(foundDatum).data()[0])
                          d3.select(foundDatum)
                            .transition().duration(3000).delay((dat,i)=>{
                            count ++
                            console.log("the count ", count)
                            return  count*500
                          })
                          // .style("fill","red")
                            .style("fill","#189b7a")


                        })
                      }else if(search === "DFS"){
                        console.log("the search method in DFS is  ", search)
                        graph.dfs(d.name, v=>{
                          const foundDatum = getDatum(allNodes, v)
                          console.log("next node should be in DFS ", v)
                          d3.select(foundDatum)
                            .transition().duration(3000).delay((dat,i)=>{
                            count ++
                            console.log("the count ", count)
                            return  count*500
                          })
                          // .style("fill","red")
                            .style("fill","#189b7a")


                        })
                      }

                  setTimeout(()=>{
                    const glupu =  group.select("circle").nodes().map(node=>{

                      d3.select(node) .style("fill", '#832a3e' )
                      // console.log(getDatum(allNodes, d3.select(node).data()[0].name))
                    })
                    // console.log('the group', glupu)
                  }, 1030 * (allNodes.length+5))
                          // d3.select(this).classed("selected-node", false)



              })
                .call(updateNode);
            selection.selectAll('.link')
                .call(updateLink);
        },

        dragStarted = (d) => {
            if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y
        },

        dragging = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y
        },

        dragEnded = (d) => {
            if (!d3.event.active) nsp.force.alphaTarget(0);
            d.fx = null;
            d.fy = null
        },

        drag = () => d3.selectAll('g.node')
            .call(
              d3.drag()
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded)
            ),

        tick = (that, graphImplementation, search) => {
            that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
            nsp.force.on('tick', () => {
                that.d3Graph.call((e)=>updateGraph(e, graphImplementation,search ))
            });

        };

    nsp.width = width;
    nsp.height = height;
    nsp.enterNode = enterNode;
    nsp.updateNode = updateNode;
    nsp.enterLink = enterLink;
    nsp.updateLink = updateLink;
    nsp.updateGraph = updateGraph;
    nsp.initForce = initForce;
    nsp.dragStarted = dragStarted;
    nsp.dragging = dragging;
    nsp.dragEnded = dragEnded;
    nsp.drag = drag;
    nsp.tick = tick;
    nsp.reset = reset;


    return nsp

})(FORCE || {})
