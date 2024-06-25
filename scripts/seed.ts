const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // User テーブルにダミーデータを挿入
    const users = await prisma.user.createMany({
      data: [
        { username: 'tanaka', email: 'tanaka@example.com' },
        { username: 'sato', email: 'sato@example.com' },
        { username: 'suzuki', email: 'suzuki@example.com' },
        { username: 'yamada', email: 'yamada@example.com' }
      ],
      skipDuplicates: true
    });

    // Task テーブルにダミーデータを挿入
    const tasks = await prisma.task.createMany({
      data: [
        { title: 'プロジェクト計画', userId: 1 },
        { title: '開発フェーズ', userId: 2 }
      ],
      skipDuplicates: true
    });

    // Subtask テーブルにダミーデータを挿入
    const subtasks = await prisma.subtask.createMany({
      data: [
        { name: '要件定義', description: '要件を定義する', completed: false, taskId: 1, responsibleId: 1, deadline: new Date('2023-10-10T00:00:00.000Z') },
        { name: 'プロジェクトスケジュール作成', description: 'スケジュールを作成する', completed: false, taskId: 1, responsibleId: 2, deadline: new Date('2023-10-15T00:00:00.000Z') },
        { name: 'フロントエンド開発', description: 'フロントエンドを開発する', completed: false, taskId: 2, responsibleId: 3, deadline: new Date('2023-11-01T00:00:00.000Z') },
        { name: 'バックエンド開発', description: 'バックエンドを開発する', completed: false, taskId: 2, responsibleId: 4, deadline: new Date('2023-11-15T00:00:00.000Z') }
      ],
      skipDuplicates: true
    });

    // Assignment テーブルにダミーデータを挿入
    const assignments = await prisma.assignment.createMany({
      data: [
        { userId: 1, responsibleId: 2, createdAt: new Date('2023-10-01T00:00:00.000Z') },
        { userId: 2, responsibleId: 3, createdAt: new Date('2023-10-02T00:00:00.000Z') },
        { userId: 3, responsibleId: 1, createdAt: new Date('2023-10-03T00:00:00.000Z') },
        { userId: 4, responsibleId: 4, createdAt: new Date('2023-10-04T00:00:00.000Z') }
      ],
      skipDuplicates: true
    });

    console.log({ users, tasks, subtasks, assignments });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();