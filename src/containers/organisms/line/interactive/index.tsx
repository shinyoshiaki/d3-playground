import * as React from "react";
import * as d3 from "d3";
import { select, axisBottom, axisLeft } from "d3";
import { twoPointPos } from "../../../../utill/calc";

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

interface tip {
  x: number;
  y: number;
  value: any;
  active: boolean;
}

export default class SvgMultipleLines extends React.Component<
  Props,
  { tips: tip[] }
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tips: this.props.data.map(() => {
        return { x: 0, y: 0, value: 0, active: false };
      })
    };
  }

  mousemove() {
    const { width, data } = this.props;
    const x = d3
      .scaleTime()
      .domain([this.props.from, this.props.to]) // min max dates
      .range([0, width - 150]);

    const bisecData = d3.bisector(function(d: any) {
      return d.date;
    }).left;
    const overlay = d3.select(".overlay").node();
    const mouse = d3.mouse(overlay as any);
    console.log({ mouse });
    console.log("mouse", d3.mouse(overlay as any)[1]);
    const x0 = x.invert(d3.mouse(overlay as any)[0]);

    const next: tip[] = data.map(item => {
      const index = bisecData(item.values, x0, 1) - 1;
      const value = item.values[index].value;

      console.log("test", x(item.values[index].date));

      const a = { x: x(item.values[index].date), y: item.values[index].value };
      const b = {
        x: x(item.values[index + 1].date),
        y: item.values[index + 1].value
      };
      const y = twoPointPos(a, b, x(x0));

      console.log(x(x0), { y });

      return { x: x(x0), y, value, active: true };
    });

    this.setState({ tips: next });
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

          {data.map((item, i) => {
            const tip = this.state.tips[i];
            return (
              tip.active && (
                <g
                  className="focus"
                  transform={`translate(${tip.x as any},${y(tip.y as any)})`}
                >
                  <text>{tip.value}</text>
                </g>
              )
            );
          })}

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
