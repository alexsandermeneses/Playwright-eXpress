import { APIRequestContext, expect } from '@playwright/test';
import { TaskModel } from '../../tests/Fixtures/task.model';

require('dotenv').config();

const BASE_API = process.env.BASE_API;

export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    const response = await request.delete(`${BASE_API}/helper/tasks/${taskName}`);
    expect(response.status()).toBe(204);                                                           // garante que a requisição foi bem-sucedida
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
    const response = await request.post(`${BASE_API}/tasks/`, { data: task });
    expect(response.status()).toBe(201);                                                           // garante que a requisição foi bem-sucedida
}