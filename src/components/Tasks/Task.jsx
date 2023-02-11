import './task.scss';

function Task({handleContentEditable, task, handleDeleteTask, handleChangeStatus}) {
    const {id, status, name} = task;


    return (
        <li key={id} className={status ? 'task done' : 'task'}>
            <i
                className='taskStatus'
                onClick={() => {
                    handleChangeStatus(task)
                }}
            >
            </i>
            <span
                className='taskName'
                onBlur={(event) => handleContentEditable(event, task)}
                contentEditable
            >
                {name}
            </span>
            <button className='taskDeleteBtn' onClick={() => handleDeleteTask(task)}>x</button>
        </li>
    );
}

export default Task;