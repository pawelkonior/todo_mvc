import './inputWrapper.scss';

import InputTask from "./InputTask";
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses";

function InputWrapper({tasks, doneAll, value, handleInput, handleAddTask, handleAllDone}) {
    return (
        <div className='inputWrapper'>
            {!!tasks.length && (
                <ToggleStatuses doneAll={doneAll} handleAllDone={handleAllDone}/>
                )}
            <InputTask
                value={value}
                handleInput={handleInput}
                handleAddTask={handleAddTask}
            />
        </div>
    );
}

export default InputWrapper;