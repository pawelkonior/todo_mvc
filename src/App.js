import {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import Tasks from "./components/Tasks/Tasks";
import {TaskCounter} from "./components/TaskCounter/TaskCounter";
import {Filters} from "./components/Filters/Filters";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted";
import {addTaskApi, getAllTasksApi} from "./helpers/api";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [doneAll, setDoneAll] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        getAllTasksApi(controller.signal).then(setTasks);

        return () => {
            controller.abort();
        }
    }, [])

    async function handleAddTask(value) {
        const task = await addTaskApi({name: value, status: false});
        setTasks([...tasks, task]);
    }

    async function deleteTaskApi(taskId) {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {method: 'DELETE'});
        return await response.json();
    }

    function handleChangeStatus(task) {
        task.status = !task.status;
        setTasks([...tasks])
    }

    async function handleDeleteTask(taskToRemove) {
        await deleteTaskApi(taskToRemove.id);
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    async function handleDeleteAllTasks() {
        const filteredTasks = [];

        for (const task of tasks) {
            if (task.status) {
                await deleteTaskApi(task.id);
            } else {
                filteredTasks.push(task);
            }
        }

        setTasks(filteredTasks);
    }

    function handleAllDone() {
        let done = tasks.every((task) => task.status === true)
        setTasks(tasks.map((task) => ({...task, status: !done})));
        setDoneAll(!done);
    }

    function handleContentEditable(event, taskToChange) {
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task;
        }));
    }

    return (
        <div>
            <Header/>
            <InputWrapper
                tasks={tasks}
                doneAll={doneAll}
                handleAllDone={handleAllDone}
                handleAddTask={handleAddTask}
            />

            {!!tasks.length && (
                <>
                    <Tasks
                        tasks={tasks}
                        filter={filter}
                        handleContentEditable={handleContentEditable}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                    />
                    <div>
                        <TaskCounter tasks={tasks} predicate={(task) => !task.status}/>
                        <Filters setFilter={setFilter}/>

                        {!!tasks.filter((task) => task.status).length && (
                            <ClearCompleted onClick={handleDeleteAllTasks}/>)}

                    </div>
                </>
            )}
        </div>
    );
}

export default App;
