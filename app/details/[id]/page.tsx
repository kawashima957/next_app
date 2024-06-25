"use client";

import { TaskCard } from '@/components/task-card';
import React from 'react';
import { useQuery, gql, ApolloProvider } from '@apollo/client';
import { Subtask } from '@/graphql/generated/types';
import { client } from '@/lib/apolloClient';
import { TaskDetailsCard } from '@/components/task-details-card';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      subtasks {
        id
        name
        deadline
        description
        completed
        responsible {
          id
          username
          email
        }
      }
    }
  }
`;

const SimpleComponent: React.FC<{ id: string }> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const task = data.tasks.find((task: { id: string }) => task.id === id);

  if (!task) return <p>Task not found</p>;

  return (
    <TaskDetailsCard 
        key={task.id} 
        task={{
            ...task,
            subtasks: task.subtasks.map((subtask: Subtask) => ({
                ...subtask,
                responsible: {
                    ...subtask.responsible
                }
            }))
        }} 
    />
  );
};

export default function Home(
  { params }: { params: { id: string } }
) {
  return (
    <ApolloProvider client={client}>
      <SimpleComponent id={params.id} />
    </ApolloProvider>
  );
}