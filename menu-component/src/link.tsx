import React from "react";

interface ILinkProps {
    label: string;
}

export class Link extends React.Component<ILinkProps> {
    public render() {
        const url = `/${this.props.label}`.toLowerCase();

        return (<a href={url}>
            {this.props.label}
        </a>);
    }
}