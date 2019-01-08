import * as React from "react";
import * as d3 from "d3";

const OFFSETS = {
  left: 0,
  right: 50,
  top: 0,
  bottom: 0
};

interface Props {
  width: any;
  height: any;
}
interface States {
  data: number[];
  scaleX?: any;
  scaleY?: any;
}

export default class HorisontalBarChart1 extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [4, 8, 15, 16, 23, 42, 44, 22, 11, 2] };
  }

  componentDidMount() {
    this.setState({
      scaleX: this.createScaleX(),
      scaleY: this.createScaleY()
    });
  }

  componentDidUpdate(prevProps: any) {
    console.log({ prevProps });
    // You might want to add also data change check here to rebuild scales if your data is dynamic
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.setState({
        scaleX: this.createScaleX(),
        scaleY: this.createScaleY()
      });
    }
  }

  createScaleX() {
    return d3
      .scaleLinear()
      .domain([0, Math.max(...this.state.data)])
      .range([0, this.props.width - OFFSETS.left - OFFSETS.right]);
  }

  createScaleY() {
    return d3
      .scaleBand()
      .domain(this.state.data.map(d => d.toString()))
      .range([0, this.props.height - OFFSETS.top - OFFSETS.bottom])
      .padding(0.1);
  }

  render() {
    const { scaleX, scaleY } = this.state;
    if (!scaleX || !scaleY) {
      return <div>Loadng...</div>;
    } else
      return (
        <div>
          <div className="bar-chart">{this.renderBars()}</div>
        </div>
      );
  }

  renderBars() {
    const { scaleX, scaleY } = this.state;
    console.log({ scaleX, scaleY });
    if (scaleX && scaleY)
      return this.state.data.map((d, i) => (
        <div
          key={i}
          className="bar-chart__div"
          style={{ width: scaleX(d), height: scaleY.bandwidth() }}
        >
          {d}
        </div>
      ));
    else return <div />;
  }
}
