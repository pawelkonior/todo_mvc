import {useState} from "react";
import Header from "./components/Header/Header";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import Tasks from "./components/Tasks/Tasks";
import * as PropTypes from "prop-types";
import {TaskCounter} from "./components/TaskCounter/TaskCounter";
import {Filters} from "./components/Filters/Filters";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted";

function* genId() {
    let id = 0;

    while (true) {
        yield id;
        id++;
    }
}

const nextId = genId();

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [doneAll, setDoneAll] = useState(false);


    function handleInput(event) {
        setValue(event.target.value);
    }

    function handleAddTask(event) {
        if (event.key === 'Enter') {
            setTasks([...tasks, {
                id: nextId.next().value,
                name: value,
                status: false
            }]);
            setValue('');
        }
    }

    function handleChangeStatus(task) {
        task.status = !task.status;
        setTasks([...tasks])
    }

    function handleDeleteTask(taskToRemove) {
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    function handleDeleteAllTasks() {
        setTasks(tasks.filter((task) => !task.status))
    }

    function handleAllDone() {
        let done = tasks.every((task) => task.status === true)
        setTasks(tasks.map((task) => ({...task, status: !done})));
        setDoneAll(!done);
    }

    function handleContentEditable(event, taskToChange){
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task;
        }))
    }

    return (
        <div>
            <Header/>
            <InputWrapper
                tasks={tasks}
                doneAll={doneAll}
                handleAllDone={handleAllDone}
                value={value}
                handleAddTask={handleAddTask}
                handleInput={handleInput}
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
