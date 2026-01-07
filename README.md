# Playwright Mark - Testes End-to-End

Projeto de testes end-to-end automatizados utilizando Playwright com arquitetura Page Object Model (POM) para validação de funcionalidades web.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura de Testes](#arquitetura-de-testes)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando API/Web](#executando-apiweb)
- [Executando os Testes](#executando-os-testes)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Page Object Model](#page-object-model)
- [Fixtures e Helpers](#fixtures-e-helpers)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **Playwright Mark** é um projeto de testes end-to-end que demonstra boas práticas de automação de testes web utilizando Playwright, incluindo:

- Arquitetura Page Object Model (POM) para organização e manutenibilidade
- Testes organizados por funcionalidade
- Uso de fixtures para dados de teste
- Helpers para operações comuns (requisições API)
- Geração de dados dinâmicos com Faker.js
- Relatórios HTML detalhados
- Screenshots e vídeos em caso de falha

## 🏗️ Arquitetura de Testes

O projeto segue o padrão **Page Object Model (POM)**, uma arquitetura de testes que separa a lógica de interação com a página da lógica de teste:

### Componentes da Arquitetura

```
┌─────────────────────────────────────────┐
│         Test Specs (*.spec.ts)         │  ← Lógica de teste
│  - Organização por funcionalidade      │
│  - Cenários de teste                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Page Objects (support/pages/)      │  ← Encapsula interações
│  - Métodos para interagir com elementos │
│  - Localizadores de elementos           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Helpers (support/helpers.ts)       │  ← Operações auxiliares
│  - Requisições API                      │
│  - Funções utilitárias                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Fixtures (Fixtures/)                │  ← Dados de teste
│  - Modelos TypeScript                   │
│  - Dados JSON                            │
└──────────────────────────────────────────┘
```

### Fluxo de Execução

1. **Setup**: Antes de cada teste, prepara o ambiente (limpeza de dados, criação de fixtures)
2. **Ação**: Executa interações através dos Page Objects
3. **Validação**: Verifica resultados esperados usando assertions do Playwright
4. **Teardown**: Limpeza após os testes (remoção de dados de teste)

## 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **Playwright** | 1.57.0 | Framework de testes E2E multiplataforma |
| **@faker-js/faker** | 9.3.0 | Geração de dados fake para testes |
| **TypeScript** | - | Tipagem estática para maior segurança |
| **@types/node** | 25.0.3 | Tipos TypeScript para Node.js |
| **Dotenv** | 17.2.3 | Gerenciamento de variáveis de ambiente |

### Características do Playwright

- **Multi-navegador**: Suporta Chromium, Firefox e WebKit
- **Auto-wait**: Aguarda automaticamente elementos ficarem prontos
- **Isolamento**: Cada teste roda em um contexto isolado
- **Network Interception**: Capacidade de interceptar e mockar requisições
- **Screenshots e Vídeos**: Captura automática em caso de falha
- **Trace Viewer**: Visualização detalhada de execuções de teste

## 📁 Estrutura do Projeto

```
playwright-mark/
├── tests/
│   ├── Fixtures/                      # Dados e modelos de teste
│   │   ├── task.model.ts             # Interface TypeScript para Task
│   │   └── tasks.json                 # Dados de teste em JSON
│   ├── support/
│   │   ├── helpers.ts                 # Funções auxiliares (API calls)
│   │   └── pages/
│   │       └── tasks/
│   │           └── index.ts           # Page Object para página de tarefas
│   ├── home.spec.ts                   # Testes da página inicial
│   └── tasks.spec.ts                  # Testes de funcionalidades de tarefas
├── playwright.config.ts               # Configuração do Playwright
├── playwright-report/                 # Relatórios HTML gerados
├── test-results/                      # Screenshots e vídeos de falhas
├── package.json                       # Dependências do projeto
└── README.md
```

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **Git**

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd playwright-mark
```

2. Instale as dependências:

```bash
npm install
```

3. Instale os navegadores do Playwright:

```bash
npx playwright install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
BASE_URL=http://localhost:8080
```

Esta variável define a URL base da aplicação que será testada.

### Configuração do Playwright

O arquivo `playwright.config.ts` contém todas as configurações dos testes:

- **Diretório de testes**: `./tests`
- **Modo headless**: Desabilitado por padrão (`headless: false`)
- **Retry**: 2 tentativas em CI, 0 em desenvolvimento
- **Workers**: 1 worker em CI, paralelo em desenvolvimento
- **Reporter**: HTML
- **Screenshots**: Apenas em caso de falha
- **Vídeo**: Mantido apenas em caso de falha
- **Timeout**: 100 segundos para expectativas
- **Trace**: Habilitado apenas na primeira tentativa após falha

## ▶️ Executando API/Web

Para executar os testes, é necessário ter a API e o Frontend rodando. Siga os passos abaixo:

### Executar a API

Em um terminal, navegue até o diretório da API e execute:

```bash
cd apps/api
npm install
npm run dev
```

A API estará disponível em `http://localhost:3333`

### Executar o Frontend

Em outro terminal, navegue até o diretório do Frontend e execute:

```bash
cd apps/web
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:8080`

> **Nota**: Certifique-se de que ambos os serviços estão rodando antes de executar os testes do Playwright.

## ▶️ Executando os Testes

### Executar todos os testes

```bash
npx playwright test
```

### Executar testes em modo interativo (UI Mode)

Interface visual para executar e debugar testes:

```bash
npx playwright test --ui
```

### Executar testes em modo headed (com navegador visível)

```bash
npx playwright test --headed
```

### Executar testes de um arquivo específico

```bash
npx playwright test tests/tasks.spec.ts
```

### Executar testes com um padrão específico

```bash
npx playwright test -g "deve poder cadastrar"
```

### Executar testes em um navegador específico

```bash
npx playwright test --project=chromium
```

### Executar testes em modo debug

```bash
npx playwright test --debug
```

### Visualizar relatório de testes

Após executar os testes, visualize o relatório HTML:

```bash
npx playwright show-report
```

### Visualizar trace de uma execução

```bash
npx playwright show-trace trace.zip
```

## 📂 Estrutura de Diretórios Detalhada

### Testes (`tests/`)

#### Fixtures (`Fixtures/`)

- **`task.model.ts`**: Interface TypeScript que define o modelo de dados de uma tarefa
  ```typescript
  export interface TaskModel {
    name: string;
    is_done: boolean;
  }
  ```

- **`tasks.json`**: Arquivo JSON com diferentes cenários de dados de teste
  - `success`: Dados para teste de sucesso
  - `duplicate`: Dados para teste de duplicação
  - `required`: Dados para teste de validação
  - `delete`: Dados para teste de exclusão

#### Support (`support/`)

- **`helpers.ts`**: Funções auxiliares para operações comuns nos testes
  - `postTask()`: Cria uma tarefa via API
  - `deleteTaskByHelper()`: Remove uma tarefa via API helper endpoint

- **`pages/tasks/index.ts`**: Page Object para a página de tarefas
  - Encapsula todas as interações com elementos da página
  - Métodos para criar, atualizar, remover e validar tarefas

#### Specs (`*.spec.ts`)

- **`tasks.spec.ts`**: Testes de funcionalidades de tarefas
  - Cadastro de tarefas
  - Validações (duplicação, campos obrigatórios)
  - Atualização de tarefas
  - Exclusão de tarefas

- **`home.spec.ts`**: Testes da página inicial

## 🎭 Page Object Model

### Conceito

O **Page Object Model (POM)** é um padrão de design que encapsula informações sobre elementos da página e ações que podem ser realizadas neles, separando a lógica de teste da lógica de interação.

### Exemplo de Page Object

```typescript
export class TasksPage {
    readonly page: Page;
    readonly inputTaskName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputTaskName = page.locator('input[class*=listInputNewTask]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async create(task: { name: string; is_done: boolean }) {
        await this.inputTaskName.fill(task.name);
        await expect(this.inputTaskName).toHaveValue(task.name);
        await this.page.click('css=button >> text=Create');
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(target).toBeVisible();
    }
}
```

### Vantagens do POM

- **Reutilização**: Métodos podem ser reutilizados em múltiplos testes
- **Manutenibilidade**: Mudanças na página são feitas em um único lugar
- **Legibilidade**: Testes ficam mais limpos e fáceis de entender
- **Organização**: Separação clara entre lógica de teste e interação

## 🔧 Fixtures e Helpers

### Fixtures

Fixtures são dados de teste pré-configurados que podem ser reutilizados:

```typescript
// Uso de fixture JSON
const task = data.success as TaskModel;

// Uso de fixture TypeScript
const task: TaskModel = {
    name: 'Estudar Playwright',
    is_done: false
};
```

### Helpers

Funções auxiliares para operações comuns:

```typescript
// Criar tarefa via API
await postTask(request, task);

// Remover tarefa via API
await deleteTaskByHelper(request, task.name);
```

## 📝 Padrões e Convenções

### Organização de Testes

- **Agrupamento**: Testes relacionados são agrupados com `test.describe()`
- **Nomenclatura**: Nomes descritivos em português explicando o comportamento esperado
- **Setup/Teardown**: Uso de `beforeEach` para preparar o ambiente antes de cada teste

### Localizadores

O projeto utiliza diferentes estratégias de localização:

- **CSS Selectors**: `page.locator('css=.task-item')`
- **XPath**: `page.locator('xpath=//p[text()="..."]')`
- **Text**: `page.getByText('...')`
- **Test ID**: `page.getByTestId('task-item')`

### Validações

- **Visibilidade**: `expect(element).toBeVisible()`
- **Texto**: `expect(element).toHaveText('...')`
- **CSS**: `expect(element).toHaveCSS('property', 'value')`
- **Validação HTML5**: `element.evaluate(e => e.validationMessage)`

## 🎨 Recursos do Playwright Utilizados

### Auto-wait

O Playwright aguarda automaticamente elementos ficarem prontos:

```typescript
// Não precisa esperar explicitamente
await page.click('button'); // Aguarda automaticamente o botão estar clicável
```

### Screenshots e Vídeos

Configurado para capturar apenas em caso de falha:

```typescript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

### Trace Viewer

Permite visualizar a execução completa de um teste:

```typescript
trace: 'on-first-retry',
```

### Network Interception

Capacidade de interceptar requisições (usado nos helpers):

```typescript
await request.post('http://localhost:3333/tasks', { data: task });
```

## 📊 Relatórios

### Relatório HTML

Após executar os testes, um relatório HTML detalhado é gerado em `playwright-report/`:

- Lista de todos os testes executados
- Status de cada teste (passou/falhou)
- Tempo de execução
- Screenshots de falhas
- Vídeos de falhas
- Traces para debug

### Visualizar Relatório

```bash
npx playwright show-report
```

## 🐛 Debugging

### Modo Debug

Execute testes passo a passo:

```bash
npx playwright test --debug
```

### Modo UI

Interface visual para executar e debugar:

```bash
npx playwright test --ui
```

### Trace Viewer

Visualize a execução completa de um teste:

```bash
npx playwright show-trace trace.zip
```

### Console Logs

Adicione logs nos testes:

```typescript
console.log('Executando teste...');
await page.screenshot({ path: 'debug.png' });
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor API/WEB

**Fernando Papito**

## 👤 Autor Testes

**Alex Sander**

---

Desenvolvido com ❤️ para demonstrar boas práticas de automação de testes com Playwright.
