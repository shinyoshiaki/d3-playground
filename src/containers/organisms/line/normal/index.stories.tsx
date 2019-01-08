import * as React from "react";
import { storiesOf } from "@storybook/react";
import * as d3 from "d3";
import Component from ".";

import ImportCss from "../../../../styles";
import MeasureHOC from "../../../../utill/fit";

ImportCss();
const parseTime = d3.timeParse("%Y");
const data = [
  {
    key: "apples",
    color: "red",
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
    color: "yellow",
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
        value: 150
      }
    ]
  }
];

storiesOf("line", module).add("normal1", () => (
  <div style={{ width: "100%", height: "100vh" }}>
    <MeasureHOC
      target={(a: number, b: number) => (
        <Component
          data={data}
          from={new Date(2013, 0, 1)}
          to={new Date(2017, 0, 1)}
          width={a}
          height={b}
        />
      )}
    />
  </div>
));
