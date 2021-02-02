import * as React from 'react'; 
import * as ReactDOM from 'react-dom';
import './index.css';

type Nullable<T> = T | null;

interface ISquareParams {
    value: Nullable<string>;
    onClick: () => void;
    isWinner?: boolean
}

class Square extends React.Component<ISquareParams> {
    render() {
        const attrs = {
            style: {
                color: this.props.isWinner ? 'green' : undefined
            }
        };

        return (
            <button {...attrs} className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
            </button>
        );
    }
}
  
interface IBoardPropsParams {
    squares: Nullable<Player>[];
    onClick: (i: number) => void;
    winningSquares?: [number, number, number]
}

class Board extends React.Component<IBoardPropsParams> {
    renderSquare(i: number) {
        return <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
            isWinner={this.props.winningSquares?.includes(i)}    
        />;
    }

    render() {
        return (<div>
            {
                [0,1,2].map(row => (<div key={row} className="board-row"> {[0,1,2].map(col => this.renderSquare(row * 3 + col))} </div>))
            }
        </div>)
    }
}

interface IHistoryState {
    history: {squares: Nullable<Player>[], tile?: number}[];
    xIsNext: boolean;
    stepNumber: number;
    stepOrder: 'ASC' | 'DESC';
}
  
class Game extends React.Component<{}, IHistoryState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            stepOrder: 'ASC'
        };
    }
    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].squares.slice();
        if (calculateWinner(squares).result !== 'ongoing' || squares[i]) return; 
        const mark = this.getNextPlayer();
        squares[i] = mark;
        this.setState({
            xIsNext: mark !== 'X',
            history: history.concat([{
                squares,
                tile: i
            }]),
            stepNumber: history.length
        });
    }

    getNextPlayer(): Player {
        return this.state.xIsNext ? 'X' : 'O';
    }

    jumpTo(move: number): void {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0,
        });
    }

    getStatus({ result, winner}: IGameResult): string {
        switch(result) {
            case 'win': 
                return `Winner ${winner}`;
            case 'tie':
                return 'It\'s a tie';
            case 'ongoing':
            default:
                return `Next player: ${this.getNextPlayer()}`;
        }
    }

    setStepOrder(stepOrder: 'ASC' | 'DESC') {
        this.setState({ stepOrder });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            const row = Math.floor(step.tile! / 3 ) + 1;
            const col = step.tile! % 3 + 1;
            const style: { style: React.CSSProperties | undefined } = move === this.state.stepNumber ? {style: { fontWeight: 'bold'}} : {style: undefined};

            return (
                <li key={move}>
                    <button {...style} onClick={() => this.jumpTo(move)}>{desc}</button>
                    { move ? (<label>Row {row} Col {col}</label>) : '' }
                </li>
            )
        });
        
        const status = this.getStatus(result);

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        onClick={(i) => this.handleClick(i)}
                        squares={current.squares}
                        winningSquares={result.winningSquares}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <div className="btn-group">
                            <button onClick={() => this.setStepOrder('ASC')}>Asc</button>
                            <button onClick={() => this.setStepOrder('DESC')}>Desc</button>
                        </div>
                        <ol>{this.state.stepOrder === 'ASC' ? moves : moves.reverse()}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

type Player = 'X' | 'O';

interface IGameResult {
    result?: 'win' | 'tie' | 'ongoing',
    winner?: Player;
    winningSquares?: [number, number, number];
}

function calculateWinner(squares: Nullable<Player>[]): IGameResult {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
            result: 'win',
            winner: squares[a]!,
            winningSquares: [a,b,c]
        };
      }
    }

    if (squares.every(k => k)) return {
        result: 'tie'
    };

    return {
        result: 'ongoing'
    };
}