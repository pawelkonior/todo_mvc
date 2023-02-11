import './inputWrapper.scss';

function InputTask({value, handleAddTask, handleInput}) {
    return (
        <input
            className='inputTask'
            type="text"
            onKeyUp={handleAddTask}
            onChange={handleInput}
            value={value}
            placeholder='What needs to be done?'
        />
    );
}

export default InputTask;