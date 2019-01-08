import * as React from "react";
import * as d3 from "d3";
import { BaseType } from "d3";

interface Props {
  width: number;
  height: any;
  from: Date;
  to: Date;
  data: {
    key: string;
    color: string;
    values: { date: any; value: number }[];
  }[];
}

export default class SvgMultipleLines extends React.Component<Props, {}> {
  chartRef?: BaseType;
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    if (!this.chartRef) return;

    console.log(this.props);

    const { width, height } = this.props;

    const svg = d3.select(this.chartRef);

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(100, -20)");

    const x = d3
      .scaleTime()
      .domain([this.props.from, this.props.to]) // min max dates
      .range([0, width - 150]);

    const y = d3
      .scaleLinear()
      .domain([0, 250]) //max value
      .range([height, 50]);

    console.log({ x, y });

    const graph = chart
      .selectAll(".graph")
      .data(this.props.data)
      .enter()
      .append("g")
      .attr("class", "graph");

    // draw line
    graph
      .append("path")
      .attr("class", "line")
      .style(
        "stroke",
        (style): any => {
          return style.color;
        }
      )
      .attr("d", (parentData: any) => {
        console.log({ parentData }, parentData.values);
        return d3
          .line()
          .x((d: any) => x(d.date))
          .y((d: any) => y(d.value))(parentData.values);
      });

    // draw x axis
    chart
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${y(0) - 20})`)
      .call(d3.axisBottom(x));

    // draw y axis
    chart
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", `translate(0,0)`)
      .call(d3.axisLeft(y));

    // label
    const legendContainer = chart
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${width / 10},${height - (height / 10) * 9})`
      );

    legendContainer
      .selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("x", (d, i) => {
        return i * 200;
      })
      .attr("fill", d => d.color);

    legendContainer
      .selectAll("text")
      .data(this.props.data)
      .enter()
      .append("text")
      .attr("x", (d, i) => {
        return i * 200 + 25;
      })
      .attr("y", 12)
      .text(d => d.key);
  }

  render() {
    return (
      <div>
        {this.chartRef ? (
          undefined
        ) : (
          <svg
            className="line-chart line-chart--multiple"
            ref={r => (this.chartRef = r)}
          />
        )}
      </div>
    );
  }
}
