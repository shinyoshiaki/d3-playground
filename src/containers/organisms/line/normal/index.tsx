import * as React from "react";
import * as d3 from "d3";
import { BaseType } from "d3";

export default class SvgMultipleLines extends React.Component<
  {},
  { data: any[] }
> {
  chartRef?: BaseType;
  constructor(props: any) {
    super(props);
    const parseTime = d3.timeParse("%Y");
    this.state = {
      data: [
        {
          key: "apples",
          values: [
            {
              date: parseTime("2013"),
              value: 121
            },
            {
              date: parseTime("2014"),
              value: 111
            },
            {
              date: parseTime("2015"),
              value: 91
            },
            {
              date: parseTime("2016"),
              value: 111
            },
            {
              date: parseTime("2017"),
              value: 150
            }
          ]
        },
        {
          key: "bananas",
          values: [
            {
              date: parseTime("2013"),
              value: 215
            },
            {
              date: parseTime("2014"),
              value: 190
            },
            {
              date: parseTime("2015"),
              value: 105
            },
            {
              date: parseTime("2016"),
              value: 220
            },
            {
              date: parseTime("2017"),
              value: 140
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    //TODO: add margins to display axis nicer
    if (!this.chartRef) return;
    const width = 700,
      height = 500;

    const chart = d3
      .select(this.chartRef)
      .attr("width", width + 100)
      .attr("height", height + 200) //200 for legend
      .append("g")
      .attr("transform", "translate(100, 0)");

    const x = d3
      .scaleTime()
      .domain([new Date(2013, 0, 1), new Date(2017, 0, 1)]) // min max dates
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, 250]) //max value
      .range([height, 0]);

    const colors = d3
      .scaleOrdinal<string, string>()
      .domain(["apples", "bananas"])
      .range(["red", "green"]);

    const graph = chart
      .selectAll(".graph")
      .data(this.state.data)
      .enter()
      .append("g")
      .attr("class", "graph");

    graph
      .append("path")
      .attr("class", "line")
      .style(
        "stroke",
        (d: any): any => {
          return colors(d.key);
        }
      )
      .attr("d", parentData => {
        return d3
          .line()
          .curve(d3.curveBasis) // make points round, not sharp
          .x((d: any) => x(d.date))
          .y((d: any) => y(d.value))(parentData.values);
      });

    chart
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${y(0) - 20})`)
      .call(d3.axisBottom(x));

    chart
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", `translate(0,0)`)
      .call(d3.axisLeft(y));

    const legendContainer = chart
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0,${y(0) + 20})`);

    console.log({ colors });
    legendContainer
      .selectAll("rect")
      .data(["apples", "bananas"])
      .enter()
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("x", (d, i) => {
        return i * 200;
      })
      .attr("fill", colors);

    legendContainer
      .selectAll("text")
      .data(["apples", "bananas"])
      .enter()
      .append("text")
      .attr("x", (d, i) => {
        return i * 200 + 25;
      })
      .attr("y", 12)
      .text(d => d);
  }

  render() {
    return (
      <svg
        className="line-chart line-chart--multiple"
        ref={r => (this.chartRef = r)}
      />
    );
  }
}
