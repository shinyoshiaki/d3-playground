import * as React from "react";
import { storiesOf } from "@storybook/react";

import Component from ".";

import ImportCss from "../../../../styles";

ImportCss();

storiesOf("line", module).add("normal", () => <Component />);
