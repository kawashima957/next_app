import React from 'react';
import { useRouter } from 'next/router';

interface TaskCardProps {
  id: string;
  title: string;
  subtasks: {
    id: string;
    name: string;
    deadline: string;
    responsible: {
      id: string;
      username: string;
    };
  }[];
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, subtasks }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tasks/${id}`);
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg cursor-pointer mb-4"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <table className="w-full mt-2">
        <thead>
          <tr>
            <th className="text-left">サブタスク名</th>
            <th className="text-left">期限</th>
            <th className="text-left">担当者</th>
          </tr>
        </thead>
        <tbody>
          {subtasks.map((subtask) => (
            <tr key={subtask.id}>
              <td>{subtask.name}</td>
              <td>{subtask.deadline}</td>
              <td>{subtask.responsible.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// export default TaskCard;