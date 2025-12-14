import { IColumn, ITask } from "@/types/Task";

const COLUMNS: IColumn[] = [
    {
        id: "TODO",
        title: "Todo"
    },
    {
        id: "IN_PROGRESS",
        title: "In Progress"
    },
    {
        id: "DONE",
        title: "Done"
    }
]

const INITIAL_TASKS: ITask[] = [
    {
        id: "1",
        title: "Kerjain UI Task Card",
        description: "Harus kelarin sebelum tanggal 28 untuk di submit",
        status: "DONE"
    },
    {
        id: "2",
        title: "Kerjain CRUD Tasks ",
        description: "Harus kelarin sebelum tanggal 28 untuk di submit",
        status: "IN_PROGRESS"
    },
    {
        id: "3",
        title: "Kerjain Configuration Page ",
        description: "Harus kelarin sebelum tanggal 28 untuk di submit",
        status: "TODO"
    },

]


export { COLUMNS, INITIAL_TASKS }