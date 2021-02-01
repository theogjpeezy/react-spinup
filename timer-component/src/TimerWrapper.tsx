import * as React from 'react';
import { Button } from './Button';
import { Timer } from './Timer';

interface ITimerWrapperProps {

}

interface ITimerWrapperState {
    time: number;
    intervalId?: NodeJS.Timeout
}

export class TimerWrapper extends React.Component<ITimerWrapperProps, ITimerWrapperState> {
    constructor(props: ITimerWrapperProps) {
        super(props);

        this.state = {
            time: -1
        };
    }

    public render() {
        return (<div>
            <div className="btn-group" role="group">
                {[5,10,15].map(interval => <Button time={interval} setTimer={(time) => this.handleTimerChange(time)} />)}
            </div>
            <Timer time={this.state.time} />
            { this.state.time === 0 ? <h1 style={{color: 'red'}}>HONK!</h1> : <h1></h1> }
        </div>);
    }

    public handleTimerChange(time: number) {
        if(this.state.intervalId) clearInterval(this.state.intervalId);

        this.setState({
            time,
            intervalId: setInterval(() => {
                if(this.state.time === 0) { 
                    clearInterval(this.state.intervalId!);

                    return;
                }
                this.setState({
                    time: this.state.time - 1
                })
            }, 1000)
        });
    }
}