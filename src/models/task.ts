export default interface Task {
  id: number;
  title: string;
  state: 'complete' | 'incomplete';
}

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Task-1',
    state: 'complete',
  },
  {
    id: 2,
    title: 'Task-2',
    state: 'complete',
  },
  {
    id: 3,
    title: 'Task-3',
    state: 'incomplete',
  },
]