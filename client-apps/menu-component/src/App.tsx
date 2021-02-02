import React from 'react';
import './App.css';
import { Menu } from './menu';

interface IAppState {
    menuItems: string[]
}

export class App extends React.Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            menuItems: []
        };
    }
    public async componentDidMount() {
        const menuItems: string[] = await (await fetch('/menu-items')).json();

        this.setState({menuItems});
    }

    public render() {
        return (
            <div className="App">
                <Menu menuItems={this.state.menuItems} />
            </div>
        );
    }
}


