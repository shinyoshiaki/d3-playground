import React from "react";
// import Measure from "react-measure";
import HorisontalBarChart1 from "../organisms/bar/horisontal1";
import LayoutOrg from "../organisms/common/layout";
import MeasureWrap from "../../utill/fit";
import SvgMultipleLines from "../organisms/line/normal/index";
import { lineExample } from "../organisms/line/normal/index.stories";

export default class Bar extends React.Component<
  { history: any },
  { width: number; height: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    // const { width, height } = this.state;
    return (
      <LayoutOrg history={this.props.history}>
        <div style={{ width: "100%", height: "100vh" }}>
          some
          <div style={{ height: "50vh" }}>
            <MeasureWrap
              target={(a, b) => <HorisontalBarChart1 width={a} height={b} />}
            />
          </div>
          what
          <div style={{ height: "50vh" }}>
            <MeasureWrap
              target={(a, b) => (
                <SvgMultipleLines
                  data={lineExample}
                  from={new Date(2013, 0, 1)}
                  to={new Date(2017, 0, 1)}
                  width={a}
                  height={b}
                />
              )}
            />
          </div>
        </div>
      </LayoutOrg>
    );
  }
}
