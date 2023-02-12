export async function getAllTasksApi(signal) {
    const response = await fetch('http://localhost:3001/tasks', {signal});
    return await response.json();
}

export async function addTaskApi(task) {
    const response = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
    )
    return await response.json();
}