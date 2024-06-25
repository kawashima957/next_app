import { useState } from 'react';

interface AddTaskFormProps {
  onTaskAdded: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleAddTask = () => {
    onTaskAdded(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div>
      <input 
        type="text" 
        value={newTaskTitle} 
        onChange={(e) => setNewTaskTitle(e.target.value)} 
        placeholder="新しいタスクのタイトル" 
      />
      <button onClick={handleAddTask}>タスクを追加</button>
    </div>
  );
};

export default AddTaskForm;