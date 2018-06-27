import * as React from "react";

interface ITaskProps {
    id: string,
    name: string,
    createdBy: string,
    createdOnDate: any,
    onClick: () => void;
};

class Task extends React.Component<ITaskProps, ITaskProps> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (<div className="internal-tasks"
            key={this.props.id}
            // tslint:disable-next-line jsx-no-lambda
            onClick={e => this.props.onClick()}>
            Item: {this.props.name} (Created by: {this.props.createdBy} on {this.props.createdOnDate})
        </div>);
    }
}

export default Task;