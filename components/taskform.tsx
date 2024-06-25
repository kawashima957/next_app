// import { useState } from 'react';
'use client';

import { useForm, useFieldArray } from 'react-hook-form';

function TaskForm() {
    type Subtask = {
      title: string;
      deadline: string;
      responsible: string;
      description: string;
    };

    type FieldValues = {
        taskTitle: string;
        subtasks: Subtask[];
      };
  
    // const { register, handleSubmit, control, reset } = useForm<FieldValues>({mode: "onChange"});

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "subtasks"
    // });

    const { register, handleSubmit, control, reset } = useForm<FieldValues>({
        mode: "onChange",
        defaultValues: {
            taskTitle: '',
            subtasks: [
                { title: 'サブタスク1', deadline: '2023-10-01', responsible: '田中', description: '詳細説明1' },
                { title: 'サブタスク2', deadline: '2023-10-02', responsible: '佐藤', description: '詳細説明2' }
            ]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "subtasks"
    });

  const onSubmit = async (data: FieldValues) => {
    // サーバーにタスクを送信する処理
    // await fetch('/api/tasks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    console.log(data)

    reset(); // フォームのリセット
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("taskTitle", { required: true })}
        placeholder="タスクのタイトル"
      />
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`subtasks.${index}.title`)}
            placeholder="サブタスクのタイトル"
          />
          <input
            {...register(`subtasks.${index}.deadline`)}
            type="date"
            placeholder="期限"
          />
          <input
            {...register(`subtasks.${index}.responsible`)}
            placeholder="担当者"
          />
          <textarea
            {...register(`subtasks.${index}.description`)}
            placeholder="説明"
          />
          <button type="button" onClick={() => remove(index)}>削除</button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ title: '', deadline: '', responsible: '自分', description: '' })}
      >
        サブタスクを追加
      </button>
      <button type="submit">タスクを作成</button>
    </form>
  );
}

export default TaskForm;