interface IButtonProps {
    setTimer: (time: number) => void;
    time: number;
}

export function Button(props: IButtonProps) {
    return <button type="button" className="btn-primary btn"
        onClick={() => props.setTimer(props.time)}>{props.time} seconds
    </button>;
}