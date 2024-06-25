"use client";

import { useQuery, gql } from "@apollo/client";


type Subtask = {
    name: string;
    deadline: string;
    completed: boolean;
    responsible: {
        username: string;
    };
};

type Task = {
    title: string;
    subtasks: Subtask[];
};

const GET_TASKS = gql`query Query {
    tasks {
      id
      title
      subtasks {
        id
        name
        deadline
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

export const TaskTable: React.FC = () => {

    
    const { data, loading, error } = useQuery(GET_TASKS);
    console.log(data)

    if (loading) return <div>読み込み中</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div>
        {data.tasks.map((task: Task, index: number) => (
            <div key={index}>
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
                        {task.subtasks.map((subtask, subIndex) => (
                            <tr key={subIndex}>
                                <td>{subtask.completed}</td>
                                <td>{subtask.name}</td>
                                <td>{subtask.deadline}</td>
                                <td>{subtask.responsible.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ))}
        </div>
    );
};

// export default TaskTable;

// export default User;