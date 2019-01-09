import * as React from "react";
import * as d3 from "d3";
import { select, axisBottom, axisLeft } from "d3";

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

export default class SvgMultipleLines extends React.Component<
  Props,
  { tipX: Date; tipY: number; value: any; active: boolean }
> {
  constructor(props: Props) {
    super(props);
    this.state = { tipX: this.props.from, tipY: 0, value: 0, active: false };
  }

  mousemove() {
    const { width, height, data } = this.props;
    const x = d3
      .scaleTime()
      .domain([this.props.from, this.props.to]) // min max dates
      .range([0, width - 150]);

    const y = d3
      .scaleLinear()
      .domain([0, 250]) //max value
      .range([height, 50]);

    const bisecData = d3.bisector(function(d: any) {
      return d.date;
    }).left;
    const overlay = d3.select(".overlay").node();
    const mouse = d3.mouse(overlay as any);
    console.log({ mouse });
    console.log("mouse", d3.mouse(overlay as any)[1]);
    const x0 = x.invert(d3.mouse(overlay as any)[0]);
    const y0 = y.invert(d3.mouse(overlay as any)[1]);
    const index = bisecData(data[0].values, x0, 1) - 1;
    const value = data[0].values[index].value;
    if (Math.abs(y0 - value) < 20) this.setState({ active: true });
    else this.setState({ active: false });
    console.log({ x0, y0, index }, data[0].values[index].value);
    this.setState({
      tipX: x0,
      tipY: data[0].values[index].value,
      value: data[0].values[index].value
    });
  }

  componentDidMount() {
    d3.select(".overlay")
      .on("mousemove", () => {
        console.log("mousemove");
        this.mousemove();
      })
      .on("mouseout", () => {});
  }

  render() {
    const { width, height, data } = this.props;
    const x = d3
      .scaleTime()
      .domain([this.props.from, this.props.to]) // min max dates
      .range([0, width - 150]);

    const y = d3
      .scaleLinear()
      .domain([0, 250]) //max value
      .range([height, 50]);
    return (
      <svg
        className="line-chart line-chart--multiple"
        width={width}
        height={height}
      >
        <g transform={`translate(100,-20)`}>
          <rect
            className="overlay"
            width={width}
            height={height}
            onMouseOver={() => {
              console.log("overlay");
            }}
          />
          <g
            className="axis axis--x"
            transform={`translate(0,${y(0) - 20})`}
            ref={node => select(node).call(axisBottom(x))}
          />
          <g
            className="axis axis--y"
            transform={`translate(0,0)`}
            ref={node => select(node).call(axisLeft(y))}
          />

          <g
            className="legend"
            transform={`translate(${width / 10},${height - (height / 10) * 9})`}
          >
            {data.map((item, i) => (
              <g className="rect" key={item.key}>
                <rect width={15} height={15} x={i * 200} fill={item.color} />
              </g>
            ))}
            {data.map((item, i) => (
              <g className="text" key={item.key}>
                <text x={i * 200 + 25} y={12}>
                  {item.key}
                </text>
              </g>
            ))}
          </g>

          {this.state.active && (
            <g
              className="focus"
              transform={`translate(${x(this.state.tipX as any)},${y(this.state
                .tipY as any)})`}
            >
              <text>{this.state.value}</text>
            </g>
          )}

          {data.map(item => (
            <g className="graph" key={item.key}>
              <path
                className="line"
                style={{ stroke: item.color }}
                d={
                  d3
                    .line()
                    .x((d: any) => x(d.date))
                    .y((d: any) => y(d.value))(item.values as any) as any
                }
              />
            </g>
          ))}
          {data.map(item => (
            <g className="voronoi" key={item.key}>
              <path
                style={{ display: "none" }}
                d={
                  d3
                    .line()
                    .x((d: any) => x(d.date))
                    .y((d: any) => y(d.value))(item.values as any) as any
                }
              />
            </g>
          ))}
        </g>
      </svg>
    );
  }
}
