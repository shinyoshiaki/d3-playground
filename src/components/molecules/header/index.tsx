import * as React from "react";
import { Menu } from "semantic-ui-react";

interface HeaderProps {
  style?: React.CSSProperties;
  items: { [key: string]: string }[];
  onClick: (name: string) => void;
}

export default class HeaderMol extends React.Component<HeaderProps, {}> {
  render() {
    let active = location.pathname.split("/").slice(-1)[0];
    if (active === "") active = "/";
    console.log({ active });
    const { onClick, style, items } = this.props;
    return (
      <div style={{ ...style }}>
        <Menu inverted style={{ overflow: "auto" }}>
          {items.map(item => {
            const name = Object.keys(item)[0];
            console.log(item[name] === active ? "red" : "green");
            return (
              <Menu.Item
                key={name}
                name={name}
                active={item[name] === active}
                color={item[name] === active ? "green" : "green"}
                onClick={() => {
                  onClick(item[name]);
                }}
              />
            );
          })}
        </Menu>
      </div>
    );
  }
}
