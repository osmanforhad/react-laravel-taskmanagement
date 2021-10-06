import React from 'react';
import {Card, Button, Badge, Spinner} from 'react-bootstrap';
import { updateTask } from '../../../services/TaskService';

class TaskList extends React.Component {
  
  toggleCompleteStatus = async (item) => {
    if(item.status === 0) {
      item.status = 1;
    } else {
      item.status = 0;
    }
    const response = await updateTask(item.id, item);
    this.props.onEditTask();
  };

    render() { 
        return <div>
            {this.props.taskList.map((task, index) => (
      <Card key={index} className="mt-1 mb-1">
      <Card.Body>
            <div className="float-left">
            <p>
            {task.status === 1 && (
                <del className="text-success">
                 <strong>
                 {task.name} {""}
                   <Badge variant="primary">{task.tasks_count}</Badge> 
                 </strong>
              </del>
              )}

              {task.status === 0 && (
                <span>
                {task.name} {""}
                <Badge variant="primary">{task.tasks_count}</Badge> 
              </span>
              )}
          </p>
            </div>
            <div className="float-right">
              <button className={`btn btn-outline-${task.status === 1 ? 'info' : 'success'} btn-sm`} 
              onClick={() => this.toggleCompleteStatus(task)}>
                {task.status === 0 && <span>Mark as Completed</span>}
                {task.status === 1 && <span>Mark as Pending</span>}
                </button>
            </div>
            <div className="clearfix"></div>
          {this.props.isDetailsView && (
                <Card.Text>{task.description}</Card.Text>
              )}
          
      </Card.Body>
    </Card>
    ))}
        </div>;
    }
}
 
export default TaskList;