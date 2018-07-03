import * as React from "react";

interface ITaskProps {
    id: string,
    name: string,
    createdBy: string,
    createdOnDate: any,
    priority: string,
    onClick: () => void
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
            <div className="internal-tasks__info">
                <span>{this.props.name}</span>
                <div className='internal-tasks__created'>Created by <span>{this.props.createdBy}</span> on <span>{new Date(this.props.createdOnDate).toLocaleDateString()}</span></div>
            </div>    
            <div><span>Priority: </span><span>{this.props.priority}</span></div>
        </div>);
    }
}

export default Task;