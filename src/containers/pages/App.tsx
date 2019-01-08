import React from "react";
import Measure from "react-measure";

import HorisontalBarChart1 from "../organisms/bar/horisontal1";

export default class Bar extends React.Component<
  {},
  { width: number; height: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    const { width, height } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>      
        some
        <Measure
          bounds
          onResize={contentRect => {
            if (!contentRect.bounds) return;
            console.log("size", contentRect.bounds);
            this.setState({ ...contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef} style={{ width: "100%", height: "100%" }}>
              <HorisontalBarChart1 width={width} height={height} />
            </div>
          )}
        </Measure>
      </div>
    );
  }
}
