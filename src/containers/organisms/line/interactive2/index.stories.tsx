import * as React from "react";
import { storiesOf } from "@storybook/react";
import * as d3 from "d3";
import Component from ".";

import ImportCss from "../../../../styles";
import MeasureWrap from "../../../../utill/fit";

ImportCss();
const parseTime = d3.timeParse("%Y");
export const lineExample = [
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
  },  {
    key: "tea",
    color: "green",
    values: [
      {
        date: parseTime("2013"),
        value: 135
      },
      {
        date: parseTime("2014"),
        value: 19
      },
      {
        date: parseTime("2015"),
        value: 35
      },
      {
        date: parseTime("2016"),
        value: 22
      },
      {
        date: parseTime("2017"),
        value: 150
      }
    ]
  }
];

storiesOf("line", module).add("interactive2", () => (
  <div style={{ width: "100%", height: "100vh" }}>
    <MeasureWrap
      target={(a: number, b: number) => (
        <Component
          data={lineExample}
          from={new Date(2013, 0, 1)}
          to={new Date(2017, 0, 1)}
          width={a}
          height={b}
        />
      )}
    />
  </div>
));
