import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Task, Subtask } from "@/graphql/generated/types";

const UPDATE_SUBTASK_COMPLETED = gql`
  mutation UpdateSubtaskCompleted($id: ID!, $completed: Boolean!) {
    updateSubtaskCompleted(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export const TaskDetailsCard: React.FC<{ task: Task }> = ({ task }) => {
  const [updateSubtaskCompleted] = useMutation(UPDATE_SUBTASK_COMPLETED);
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks as Subtask[]);

  const handleCheckboxChange = async (subtaskId: string, completed: boolean) => {
    await updateSubtaskCompleted({ variables: { id: subtaskId, completed } });
    setSubtasks((prevSubtasks) => {
      const updatedSubtasks = prevSubtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, completed } : subtask
      );
      const incompleteSubtasks = updatedSubtasks.filter((subtask) => !subtask.completed);
      const completeSubtasks = updatedSubtasks.filter((subtask) => subtask.completed);
      return [...incompleteSubtasks, ...completeSubtasks];
    });
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <table>
        <thead>
          <tr>
            <th>サブタスク名</th>
            <th>期限</th>
            <th>説明</th>
            <th>担当者</th>
          </tr>
        </thead>
        <tbody>
          {subtasks.map((subtask: Subtask, subIndex: number) => (
            <tr key={subIndex}>
              <td>
                <input 
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(subtask.id.toString(), e.target.checked);
                  }}
                />
              </td>
              <td>{subtask.name}</td>
              <td>{subtask.deadline}</td>
              {!subtask.completed && <td>{subtask.description}</td>}
              <td>{subtask.responsible.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};