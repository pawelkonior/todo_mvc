import Task from "./Task";
import './tasks.scss';


function Tasks({handleContentEditable, tasks, filter, handleDeleteTask, handleChangeStatus}) {
    return (
        <ul className='tasks'>
            {tasks
                .filter((task) => filter === 'all' ? true : task.status === filter)
                .map((task) => (
                    <Task
                        handleContentEditable={handleContentEditable}
                        key={task.id}
                        handleDeleteTask={handleDeleteTask}
                        handleChangeStatus={handleChangeStatus}
                        task={task}
                    />
                ))}
        </ul>
    );
}

export default Tasks;