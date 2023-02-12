import './inputWrapper.scss';
import {useState} from "react";

function InputTask({handleAddTask}) {
    const [value, setValue] = useState('');

    function handleInput(event) {
        setValue(event.target.value);
    }

    function addTask(event) {
        if (event.key === 'Enter' && value.trim() !== '') {
            handleAddTask(value);
            setValue('');
        }
    }

    return (
        <input
            className='inputTask'
            type="text"
            onKeyUp={addTask}
            onChange={handleInput}
            value={value}
            placeholder='What needs to be done?'
        />
    );
}

export default InputTask;