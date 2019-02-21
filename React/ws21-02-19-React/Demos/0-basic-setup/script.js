


class Hello extends React.Component {

    constructor () {
        super();
        this.state = {
            message: "my friend (from state)!"
        };
    }

    render() {
        return <h1>Hello {this.state.message}!</h1>;
    }
}