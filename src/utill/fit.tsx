import * as React from "react";

import Measure from "react-measure";

export default class MeasureWrap extends React.Component<
  { target: (width: number, height: number) => any },
  { width: number; height: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    const { width, height } = this.state;
    return (
      <Measure
        bounds
        onResize={contentRect => {
          if (!contentRect.bounds) return;
          console.log("size hoc", contentRect.bounds);
          this.setState({ ...contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} style={{ width: "100%", height: "100%" }}>
            {this.props.target(width, height)}
          </div>
        )}
      </Measure>
    );
  }
}
