import './toggleStatuses.scss';

function ToggleStatuses({handleAllDone, doneAll}) {
    return (
        <i
            className={doneAll ? 'toggleStatuses done': 'toggleStatuses'}
            onClick={handleAllDone}
        ></i>
    );
}

export default ToggleStatuses;