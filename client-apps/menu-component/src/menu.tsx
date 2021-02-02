import React from "react";
import { Link } from "./link";

interface IMenuProps {
    menuItems: string[]
}

export class Menu extends React.Component<IMenuProps> {
    public render() {
        return (<div>{this.props.menuItems.map((menuItem, idx) => (<div key={idx}><Link label={menuItem} /></div>))}</div>);
    }
}