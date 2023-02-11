export function TaskCounter({tasks, predicate}) {
    return <span>{tasks.filter(predicate).length} items left</span>;
}