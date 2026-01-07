import { test, expect } from '@playwright/test';

test('webapp deve estar online', async ({ page }) => {
    await page.goto('http://localhost:8080'); //acessar a página web
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L'); //verificar o título da página
    await page.waitForTimeout(3000); //esperar 3 segundos(influencia no comando de teste com --headed)não precisa com o comando --debug
})