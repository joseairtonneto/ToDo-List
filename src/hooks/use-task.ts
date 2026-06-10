import { useState } from 'react'
import useLocalStorage from 'use-local-storage'

import { TASKS_STORAGE_KEY, TaskState, type Task } from '../models/task'
import { delay } from '../helpers/utils'

export default function useTask() {
  const [, setTasks] = useLocalStorage<Task[]>(TASKS_STORAGE_KEY, [])
  const [isUpdatingTask, setIsUpdatingTask] = useState(false)
  const [isDeletingTask, setIsDeletingTask] = useState(false)

  function prepareTask() {
    setTasks(prevTasks => [
      ...(prevTasks ?? []),
      { id: crypto.randomUUID(), title: '', state: TaskState.Creating },
    ])
  }

  async function updateTask(id: string, payload: { title: Task['title'] }) {
    setIsUpdatingTask(true)

    await delay(1000)

    setTasks(prevTasks => {
      const tasksUpdated = prevTasks?.map(prevTask =>
        prevTask.id === id ? { ...prevTask, state: TaskState.Created, ...payload } : prevTask,
      )

      return tasksUpdated ?? []
    })

    setIsUpdatingTask(false)
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasks(prevTasks => {
      const tasksUpdated = prevTasks?.map(prevTask =>
        prevTask.id === id ? { ...prevTask, concluded } : prevTask,
      )

      return tasksUpdated ?? []
    })
  }

  async function deleteTask(id: string) {
    setIsDeletingTask(true)

    await delay(1000)

    setTasks(prevTasks => prevTasks?.filter(task => task.id !== id))

    setIsDeletingTask(false)
  }

  return {
    isUpdatingTask,
    isDeletingTask,
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  }
}
