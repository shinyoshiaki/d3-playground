import * as React from "react";
import { storiesOf } from "@storybook/react";

import Component from "./index";

import ImportCss from "../../../../styles";

ImportCss();

storiesOf("bar", module).add("horisontal1", () => (
  <Component width={600} height={600} />
));
