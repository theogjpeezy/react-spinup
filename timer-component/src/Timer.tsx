interface ITimerProps {
    time: number;
}

export function Timer(props: ITimerProps) {
    return (<h2>Time Left: {props.time < 0 ? 'n/a' : props.time}</h2>)
}