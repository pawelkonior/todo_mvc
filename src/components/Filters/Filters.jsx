export function Filters({setFilter}) {
    return <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter(false)}>Active</button>
        <button onClick={() => setFilter(true)}>Completed</button>
    </div>;
}