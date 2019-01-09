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

export default class SvgMultipleLines extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
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
        </g>
      </svg>
    );
  }
}
