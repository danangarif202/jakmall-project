import { Component } from "react";

class Title extends Component {
    render() {
        return (
            <div className="relative mb-10 title-color">
                <div className="text-4xl font-bold z-50 relative">{this.props.name}</div>
                <div className="w-72 h-2 absolute bottom-0"></div>
            </div>
        );
    }
}

export default Title;