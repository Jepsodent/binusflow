type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface ITask {
    id: string,
    status: TaskStatus,
    title: string,
    description: string
}




export { ITask, TaskStatus }