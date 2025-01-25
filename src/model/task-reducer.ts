import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "./todolists-reducer";

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export type AddTaskAT = ReturnType<typeof AddTaskAC>

export type ChangeTaskStAT= ReturnType<typeof changeTaskStatusAC>

export type changeTitleStatusAT = ReturnType<typeof changeTaskStatusAC>

export type ActionsType = RemoveTodolistActionType | RemoveTaskAT |
    AddTaskAT |
    ChangeTaskStAT |
    changeTitleStatusAT |
    AddTodolistActionType




const initialState: TasksStateType = {}





export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {


            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE_TASK_STATUS':
         return { ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
        }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}

        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        default:
            return state //  в redux должен вернуться стейт, копия стейта
    }
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}
export const removeTaskAC = (taskId: string, todolistId: string ) => {
    return ({
        type: 'REMOVE-TASK',
        payload: { taskId, todolistId,} as const
    })
}

export const AddTaskAC =(payload: {todolistId:string, title: string})=> {
    return {
        type: "ADD-TASK", payload
    } as const

}
export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return ({
        type: 'CHANGE_TASK_STATUS', payload,

    }) as const
}

export const  changeTitleStatusAC = (payload: {todolistId: string, taskId: string, title: string})  => {
    return{ type: 'CHANGE-TASK-TITLE', payload}
}
