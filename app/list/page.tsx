"use client";

import { ApolloProvider, useMutation, useQuery, gql } from "@apollo/client";
import { client } from '@/lib/apolloClient';
import { GetTasksQuery, Task, GetTasksQueryVariables } from "@/graphql/generated/types";
import Link from "next/link";
import { TaskCard } from "@/components/task-card";
import AddTaskForm from "@/components/add-task-form";
import { useState } from "react";

const GET_TASKS = gql`
  query Query {
    tasks {
      id
      title
      subtasks {
        id
        name
        deadline
        completed
        description
        responsible {
          id
          username
          email
        }
      }
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
      subtasks {
        id
        name
        deadline
        completed
        description
        responsible {
          id
          username
        }
      }
    }
  }
`;

const UPDATE_SUBTASK_COMPLETED = gql`
  mutation UpdateSubtaskCompleted($id: ID!, $completed: Boolean!) {
    updateSubtaskCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const TaskTable: React.FC<{ tasks: Task[] }> = ({ tasks }) => {

  const [updateSubtaskCompleted] = useMutation(UPDATE_SUBTASK_COMPLETED);


  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Linkのクリックイベントを無効化
    const checkbox = e.target as HTMLInputElement;
    const subtaskId = checkbox.dataset.subtaskId;
    const completed = checkbox.checked;
    if (subtaskId) {
      updateSubtaskCompleted({ variables: { id: subtaskId, completed } });
    }
  };

  return (
    <>
      {tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={{
            ...task,
            subtasks: task.subtasks.map(subtask => ({
              ...subtask,
              responsible: {
                ...subtask.responsible
              }
            }))
          }}
          onCheckboxClick={handleCheckboxClick}
        />
      ))}
    </>
  );
};

const HomeComponent = () => {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery<GetTasksQuery, GetTasksQueryVariables>(GET_TASKS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTask, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(ADD_TASK);

  if (queryLoading) return <div>読み込み中</div>;
  if (queryError) return <div>エラー: {queryError.message}</div>;
  if (!queryData) return <div>データがありません</div>;

  const handleTaskAdded = async (title: string) => {
    try {
      const { data } = await addTask({ variables: { title } });
      setTasks([...tasks, data.addTask]);
    } catch (error) {
      console.error("タスクの追加中にエラーが発生しました:", error);
    }
  };

  return (
    <>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskTable tasks={[...queryData.tasks, ...tasks]} />
    </>
  );
};

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <HomeComponent />
    </ApolloProvider>
  );
}