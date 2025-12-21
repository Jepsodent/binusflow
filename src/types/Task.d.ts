type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface ITask {
    id: string,
    status: TaskStatus,
    color: string,
    title: string,
    description: string
}


interface IColumn {
    id: TaskStatus;
    title: string;
}


export { ITask, TaskStatus, IColumn }