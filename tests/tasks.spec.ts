import { test, expect, APIRequestContext } from '@playwright/test';
import { faker, ne } from '@faker-js/faker';
import { TaskModel } from './Fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks/index';
import data from './Fixtures/tasks.json';

let tasksPage: TasksPage;

test.beforeEach(({ page }) => { //antes de cada teste vai instanciar a página
    tasksPage = new TasksPage(page);
})

test.describe('cadastro de tarefas', () => {

    test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
        
        //const taskName = 'Ler um livro de Playwright';                                                //criação de objeto/tarefa fixa sem api

        //const tasksPage = new TasksPage(page);  //não precisa mais pq está no beforeEach

        const task = data.success as TaskModel;         //massa de teste externalizada                                                 //importando dados do json como TaskModel

        //não estou a usar mais pq estou importando do json acima
        // const task: TaskModel = {                                                                        //criação de objeto/tarefa dinâmica usando faker(com faker) ou fixa usando ''
        //     name: 'Ler um livro de Playwright',                                                          
        //     is_done: false
        // };

        await deleteTaskByHelper(request, task.name);                                                    //limpa as tarefas antes de iniciar o teste(3333 é a porta da api), usando encapsulamento em função
                                                                            //cria a tarefa via api antes de iniciar o teste, usando encapsulamento em função
        //await page.goto('http://localhost:8080'); //acessar a página web - está no pom e foi chamado abaixo
        
        //localiza o campo nova tarefa através de elementos e preenche com o texto:
        //await page.fill('#newTask', 'Ler um livro de Playwright');                                     // 1 - localiza pelo id
        //await page.fill('input[placeholder="Add a new Task"]', 'Ler um livro de Playwright');          // 1 - localiza pelo placeholder
        //await page.fill('input[type=text]', 'Ler um livro de Playwright');                             // 1 - localiza pelo type
        //await page.fill('._listInputNewTask_1y0mp_21', 'Ler um livro de Playwright');                  // 1 - localiza pela classe gerada
        //await page.fill('input[class*=listInputNewTask]', 'Ler um livro de Playwright');               // 1 - localiza pela classe dinâmica gerada com expressão regular

        //Guardando o localizador em uma variável/constante para reutilizar depois. Abaixo tem o fill para preencher o campo(evolui o código acima comentado)
        //const inputTaskName = page.locator('input[class*=listInputNewTask]');usando no pom
        //await inputTaskName.fill(task.name); usando no pom                                                               //Se quiser com dados aleatórios use o faker(verificar opções na doc), se não use um texto fixo

        //Adiciona a tarefa clicando no botão Create e Enter do teclado:
        //await inputTaskName.press('Enter');                                                            //simula o enter(tecla) para adicionar a tarefa
        //await page.keyboard.press('Enter');                                                            //simula o enter(tecla) para adicionar a tarefa
        //await page.click('xpath=//button[contains(text(), "Create")]');(muito bom para ser usado tbm)  //clica no campo de input por xpath usando o contains(text())
        //await page.click('css=button >> text=Create');  usando no pom                                                  //clica no campo de input por css e texto parcial
        //await page.click('text=Create ');                                                              //clica no campo de input por texto exato(pode buscar outros elementos com o mesmo texto)
        //await page.click('button[type=submit]');                                                       //clica no campo de input por type

                                                                //instancia a classe TasksPage
        await tasksPage.goto();                                                                          //acessa a página web usando o método goto da classe TasksPage 
        await tasksPage.create(task);                                                                    //chama o método create da classe TasksPage passando a tarefa como parâmetro
        //Verifica se a tarefa foi adicionada na lista:  
        //const target = page.getByTestId('task-item');                                                  //localiza o elemento pelo testid
        //await expect(target).toHaveText(taskName);                                                     //verifica se o elemento localizado pelo testid tem o texto da tarefa
        //const target = page.locator('.task-item');                                                     //localiza o elemento pela classe
        //await expect(target).toHaveText(taskName);                                                     //verifica se o elemento localizado pela classe tem o texto da tarefa
        //const target = page.locator(`css=.task-item p >> text=${task.name}`);  usando no pom                          //localiza o elemento pelo componente e texto
        //await expect(target).toBeVisible();      usando no pom
        await tasksPage.shouldHaveText(task.name);

        await deleteTaskByHelper(request, task.name);//verifica se o elemento localizado pelo componente e texto está visível na tela
    }); 

    test('não deve permitir cadastrar uma tarefa duplicada', async ({ page, request }) => {

    //const tasksPage = new TasksPage(page);     //instancia a classe TasksPage//não precisa mais pq está no beforeEach

        const task = data.duplicate as TaskModel;         //massa de teste externalizada  
        // const task: TaskModel = {                                                                        // usa a interface TaskModel para representar o modelo de tarefa/dados
        //     name: 'Estudar Playwright',
        //     is_done: false
        // }
                                                            
        await deleteTaskByHelper(request, task.name);
        await postTask(request, task);  
                                        
        await tasksPage.goto();                                                                          //acessa a página web usando o método goto da classe TasksPage 
        await tasksPage.create(task);                                                                    //chama o método create da classe TasksPage passando a tarefa como parâmetro
        await tasksPage.alertHaveText('Task already exists!');
        //const target = page.locator('.swal2-html-container');      usando o pom                        //localiza o elemento pelo swal2-html-container que é a mensagem de alerta
        //await expect(target).toHaveText('Task already exists!');   usando o pom metodo chamado acima   //verifica se o elemento localizado tem o texto da mensagem de alerta
    });

    test('não deve permitir cadastrar uma tarefa sem nome', async ({ page }) => {

        //const tasksPage = new TasksPage(page);   //não precisa mais pq está no before each                                                        //instancia a classe TasksPage

        const task = data.required as TaskModel;                                                         //massa de teste externalizada

        await tasksPage.goto();   
        await tasksPage.create(task);    

        //const inputTaskName = page.locator('input[class*=listInputNewTask]'); não precisa mais pq virou atributo da classe. uso na linha abaixo
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage); //pega a mensagem/converte de/a validação do input do navegador 
        expect(validationMessage).toEqual('This is a required field');                                   //verifica se a mensagem de validação é igual a esperada
    });
});

test.describe('atualização de tarefas', () => {
    test('deve concluir uma tarefa', async ({ page, request }) => {
        
        //const tasksPage = new TasksPage(page);  //não precisa mais pq está no beforeEach
        
        const task = data.success as TaskModel;

        await deleteTaskByHelper(request, task.name);
        await postTask(request, task);

        await tasksPage.goto();
        await tasksPage.toogle(task.name);

        await tasksPage.shouldBeDone(task.name);                                                         //validar que a tarefa foi concluída com a linha riscada
    });
});

test.describe('exclusão de tarefas', () => {
    test('deve excluir uma tarefa', async ({ page, request }) => {
        
        //const tasksPage = new TasksPage(page);   //não precisa mais pq está no beforeEach
        
        const task = data.delete as TaskModel;

        await deleteTaskByHelper(request, task.name);
        await postTask(request, task);

        await tasksPage.goto();
        await tasksPage.remove(task.name);

        await tasksPage.shouldNotExist(task.name);                                                       //validar que a tarefa foi excluída
    });
});