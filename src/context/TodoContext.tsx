import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useTodoContract } from './../Hooks/useTodoContract'; 

type Task = {
  id: number;
  content: string;
  tag: string;
  completed: boolean;
};

type TodoContextType = {
  tasks: Task[];
  addTask: (text: string, tag: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  fetchTasks: () => Promise<void>;
};

export const TodoContext = createContext<TodoContextType>({
  tasks: [],
  addTask: async () => {},
  toggleTask: async () => {},
  fetchTasks: async () => {},
});

type Props = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  const todoContract = useTodoContract();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    if (!todoContract) return;
    try {
      const rawTasks = await todoContract.getTasks();
      const formattedTasks: Task[] = rawTasks.map((t: any) => ({
        id: t.id.toNumber(),
        content: t.content,
        tag: t.tag,
        completed: t.completed,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addTask = async (text: string, tag: string) => {
    if (!todoContract) return;
    try {
      await todoContract.addTask(text, tag);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  };

  const toggleTask = async (id: number) => {
    if (!todoContract) return;
    try {
      await todoContract.toggleTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to toggle task:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [todoContract]);

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTask, fetchTasks }}>
      {children}
    </TodoContext.Provider>
  );
};
