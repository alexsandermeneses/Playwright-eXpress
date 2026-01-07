import { expect, Locator, Page } from '@playwright/test';

export class TasksPage {

    readonly page: Page;
    readonly inputTaskName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputTaskName = page.locator('input[class*=listInputNewTask]');
    }

    async goto() {
        await this.page.goto('/');  //é possivel usar /login, /saloes                                          //usa a baseURL do playwright.config.ts e o / é da rota principal
    }

    async create(task: { name: string; is_done: boolean }) {
        //const inputTaskName = this.page.locator('input[class*=listInputNewTask]');                           //se transformou em atributo da classe não precisa mais dessa linha
        await this.inputTaskName.fill(task.name);                                                              //Se quiser com dados aleatórios use o faker(verificar opções na doc), se não use um texto fixo
        await expect(this.inputTaskName).toHaveValue(task.name);
        await this.page.click('css=button >> text=Create'); 
    }

    async toogle(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`);
  
        //await expect(target).toBeVisible({ timeout: 50000 });
        
        await target.click();
    }

     async remove(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`);
        //await expect(target).toBeVisible({ timeout: 150000 });
        await target.click();
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`);                            //localiza o elemento pelo componente e texto
        await expect(target).toBeVisible();
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container');                                             //localiza o elemento pelo swal2-html-container que é a mensagem de alerta
        await expect(target).toHaveText(text);//text, nesse caso é como se fosse uma variavel para testar quando passar o texto como parâmetro         //verifica se o elemento localizado tem o texto da mensagem de alerta
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName);
        await expect(target).toHaveCSS('text-decoration-line', 'line-through');
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`);                            //localiza o elemento pelo componente e texto
        await expect(target).not.toBeVisible();
    }

    
}