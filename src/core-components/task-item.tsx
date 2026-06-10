import { useState } from 'react'
import { cx } from 'class-variance-authority'

import { TaskState, type Task } from '../models/task'
import useTask from '../hooks/use-task'

import ButtonIcon from '../components/button-icon'
import Card from '../components/card'
import InputCheckbox from '../components/input-checkbox'
import Text from '../components/text'

import CheckIcon from '../assets/icons/check.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import PencilIcon from '../assets/icons/pencil.svg?react'
import XIcon from '../assets/icons/x.svg?react'
import InputText from '../components/input-text'
import Skeleton from '../components/skeleton'

interface TaskItemProps {
  task: Task
  loading?: boolean
}

export default function TaskItem({ task, loading }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(task?.state === TaskState.Creating)
  const [taskTitle, setTaskTitle] = useState(task.title || '')
  const { updateTask, updateTaskStatus, deleteTask, isUpdatingTask, isDeletingTask } =
    useTask()

  function handleEditTask() {
    setIsEditing(true)
  }

  function handleCancelEdit() {
    if (task.state === TaskState.Creating) {
      deleteTask(task.id)
    }

    setIsEditing(false)
  }

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value || '')
  }

  async function handleSaveTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    await updateTask(task.id, { title: taskTitle })

    setIsEditing(false)
  }

  function handleChangeTaskStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked

    updateTaskStatus(task.id, checked)
  }

  async function handleDeleteTask() {
    await deleteTask(task.id)
  }

  return (
    <Card size='md'>
      {!isEditing ? (
        <div className='flex items-center gap-4'>
          <InputCheckbox
            checked={task?.concluded}
            onChange={handleChangeTaskStatus}
            loading={loading}
          />
          {!loading ? (
            <Text className={cx('flex-1', { 'line-through': task?.concluded })}>
              {task.title}
            </Text>
          ) : (
            <Skeleton className='flex-1 h-6' />
          )}
          <div className='flex gap-1'>
            <ButtonIcon
              icon={TrashIcon}
              variant='tertiary'
              onClick={handleDeleteTask}
              loading={loading}
              handling={isDeletingTask}
            />
            <ButtonIcon
              icon={PencilIcon}
              variant='tertiary'
              onClick={handleEditTask}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className='flex items-center gap-4'>
          <InputText
            className='flex-1'
            value={taskTitle}
            onChange={handleChangeTitle}
            required
            autoFocus
          />
          <div className='flex gap-1'>
            <ButtonIcon
              type='button'
              icon={XIcon}
              variant='secondary'
              onClick={handleCancelEdit}
            />
            <ButtonIcon
              type='submit'
              icon={CheckIcon}
              variant='primary'
              handling={isUpdatingTask}
            />
          </div>
        </form>
      )}
    </Card>
  )
}
