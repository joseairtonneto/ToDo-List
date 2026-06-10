import useTasks from '../hooks/use-tasks'

import Badge from '../components/badge'
import Text from '../components/text'

export default function TasksSummary() {
  const { isLoadingTasks, createdTasksCount, concludedTasksCount } = useTasks()

  return (
    <>
      <div className='flex items-center gap-2'>
        <Text variant='body-sm-bold' className='text-gray-300!'>
          Tarefas criadas
        </Text>
        <Badge variant='secondary' loading={isLoadingTasks}>
          {createdTasksCount}
        </Badge>
      </div>
      <div className='flex items-center gap-2'>
        <Text variant='body-sm-bold' className='text-gray-300!'>
          Tarefas concluídas
        </Text>
        <Badge variant='primary' loading={isLoadingTasks}>
          {concludedTasksCount} de {createdTasksCount}
        </Badge>
      </div>
    </>
  )
}
