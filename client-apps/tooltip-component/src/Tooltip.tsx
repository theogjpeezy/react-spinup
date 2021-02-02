import React from "react";
import ReactDOM from "react-dom";

interface ITooltipProps {
    text: string;
    tooltipRenderAction: 'click' | 'hover';
    direction: 'up' | 'down';
}

interface ITooltipState {
    opacity: boolean;
    top?: number;
    left?: number
}

export class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    constructor(props: ITooltipProps) {
        super(props);

        this.state = {
            opacity: false
        };
    }

    public toggle() {
        const tooltipNode: any = ReactDOM.findDOMNode(this);
        this.setState({
            opacity: !this.state.opacity,
            top: tooltipNode.offsetTop,
            left: tooltipNode.offsetLeft,
        })
    }

    public render() {
        const { top, left } = this.props.direction === 'down' ?
            { top: 20, left: -30 } :
            { top: -30, left: -30 };

        const style: React.CSSProperties = {
            zIndex: this.state.opacity ? 1000 : -1000,
            opacity: +this.state.opacity,
            top: (this.state.top ?? 0) + top,
            left: (this.state.left ?? 0 ) + left
        }

        let eventHandlers: {
            onClick?: () => void;
            onMouseEnter?: () => void;
            onMouseOut?: () => void;
        } = {};
        switch(this.props.tooltipRenderAction) {
            case 'click': 
                eventHandlers.onClick = () => this.toggle();
                break;
            case 'hover':
                eventHandlers.onMouseEnter = () => this.toggle();
                eventHandlers.onMouseOut = () => this.toggle();
                break;
            default:
                throw new Error('Invalid toggle option');
        }

        return (<div style={{display: 'inline'}}>
            <span style={{color: 'blue'}}
                {...eventHandlers}>
                {this.props.children}
            </span>
            <div className={`tooltip ${this.props.direction === 'down' ? 'bottom' : 'top'}`} style={style} role="tooltip">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-inner">{this.props.text}</div>
            </div>
        </div>);
    }
}