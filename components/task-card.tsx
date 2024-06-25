import { gql, useMutation } from '@apollo/client';
import Link from "next/link";
import { Task, Subtask } from "@/graphql/generated/types";

// const UPDATE_SUBTASK_COMPLETED = gql`
//   mutation UpdateSubtaskCompleted($id: ID!, $completed: Boolean!) {
//     updateSubtaskCompleted(id: $id, completed: $completed) {
//       id
//       completed
//     }
//   }
// `;

export const TaskCard: React.FC<{ task: Task, onCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void }> = ({ task, onCheckboxClick }) => {
  // const [updateSubtaskCompleted] = useMutation(UPDATE_SUBTASK_COMPLETED);

  // const handleCheckboxChange = (subtaskId: string, completed: boolean) => {
  //   updateSubtaskCompleted({ variables: { id: subtaskId, completed } });
  // };

  // const handleCheckboxClick = (e: React.MouseEvent, subtaskId: string, completed: boolean) => {
  //   e.stopPropagation(); // Linkのクリックイベントを無効化
  //   handleCheckboxChange(subtaskId, completed);
  // };

  return (
    <Link href={`details/${task.id}`}>
      <div style={{ cursor: 'pointer' }}>
        <h3>{task.title}</h3>
        <table>
          <thead>
            <tr>
              <th>サブタスク名</th>
              <th>期限</th>
              <th>担当者</th>
            </tr>
          </thead>
          <tbody>
            {(task.subtasks as Subtask[]).map((subtask: Subtask, subIndex: number) => (
              <tr key={subIndex}>
                <td>
                    <input 
                        type="checkbox"
                        checked={subtask.completed}
                        data-subtask-id={subtask.id.toString()}
                        onClick={onCheckboxClick} // ここを修正
                    />
                </td>
                <td>{subtask.name}</td>
                <td>{subtask.deadline}</td>
                <td>{subtask.responsible.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Link>
  );
};