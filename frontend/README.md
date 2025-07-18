# Documentação do Projeto: Equilibrium

## 1. Visão Geral do Projeto

Aplicação web feita com tecnologias atuais, o qual é projetada para a gestão e análise de avaliações funcionais de pacientes. O sistema é voltado para a área da saúde, com foco na prevenção de quedas e no acompanhamento de pacientes idosos por profissionais de saúde e pesquisadores.

A plataforma oferece funcionalidades:

* **Cadastro de Usuários:** Permite o registro de diferentes perfis, atualmente inclui pacientes, profissionais de saúde e pesquisadores, cada um com suas permissões e funcionalidades específicas.
* **Realização de Avaliações:** Suporta a execução de testes como o TUG e o 5TSTS, capturando dados de sensores mobile para uma análise.
* **Análise de Dados:** Oferece visualizações gráficas e relatórios detalhados sobre o desempenho de cada paciente.
* **Gestão de Unidades de Saúde:** Permite o cadastro e gerenciamento de unidades de saúde onde as avaliações são realizadas.

A aplicação foi desenvolvida com Next.js para o frontend, Tailwind CSS para a estilização, e NextAuth.js para a autenticação.

## 2. Arquitetura

O projeto segue uma arquitetura baseada em componentes, utilizando o framework Next.js. A estrutura esta de forma modular e organizada.

* **Frontend:** A interface do usuário é construída com **React** e **Next.js**, com renderização no lado do servidor (SSR) e geração de sites estáticos (SSG) para um melhor desempenho e SEO.
* **Estilização:** A estilização é feita com **Tailwind CSS**, que permite a criação de interfaces customizadas de forma rápida e eficiente.
* **Gerenciamento de Estado:** O estado global da aplicação, como o tema (claro/escuro) e o estado da barra lateral, é gerenciado através da **Context API** do React.
* **Autenticação:** A autenticação e o gerenciamento de sessões são implementados com **NextAuth.js**, que oferece uma solução flexível e segura para o login de usuários.
* **Comunicação com a API:** A comunicação com o backend é realizada através da **Fetch API**.
* **Visualização de Dados:** Gráficos e visualizações de dados são renderizados com as bibliotecas **ECharts for React** e **ApexCharts**, que oferecem gráficos reativos.
* **Formulários:** A criação e validação de formulários são gerenciadas com a biblioteca **React Hook Form** e **Yup**.
## 3. Estrutura de Diretórios

O projeto está organizado da seguinte forma:

```
src/
|-- app/
|   |-- (admin)/
|   |   |-- evaluations/
|   |   |   |-- data/[id]/
|   |   |   |   `-- page.jsx
|   |   |   |-- page.jsx
|   |   |-- healthUnit/
|   |   |   `-- page.jsx
|   |   |-- home/
|   |   |   |-- HomeDashboardPage.jsx
|   |   |   `-- page.jsx
|   |   |-- layout.jsx
|   |   |-- population-analysis/
|   |   |   `-- page.jsx
|   |   `-- users/
|   |       |-- profile/[id]/
|   |       |   |-- ProfileClientPage.jsx
|   |       |   `-- page.jsx
|   |       |-- register/
|   |       |   `-- page.jsx
|   |       `-- page.jsx
|   |-- (full-width-pages)/
|   |   |-- (auth)/
|   |   |   |-- layout.jsx
|   |   |   `-- signin/
|   |   |       `-- page.jsx
|   |   `-- layout.jsx
|   |-- api/
|   |   `-- auth/[...nextauth]/
|   |       |-- auth.js
|   |       `-- route.js
|   |-- error.jsx
|   |-- globals.css
|   |-- layout.jsx
|   |-- not-found.jsx
|   |-- providers.jsx
|   `-- unauthorized/
|       `-- page.jsx
|-- components/
|   |-- common/
|   |-- datatable/
|   |-- form/
|   |-- header/
|   |-- modal/
|   |-- pages/
|   |-- ui/
|-- constants/
|-- context/
|-- hooks/
|-- layout/
|-- lib/
|-- middleware.js
|-- models/
`-- services/
```

## 4. Documentação dos Componentes

### 4.1. Componentes de UI (`src/components/ui/`)

Componentes reutilizáveis que formam a base da interface do usuário.

* **`Badge.jsx`**: Renderiza um "badge" customizável para exibir informações como status ou categorias.
* **`Button.jsx`**: Um botão customizável com suporte a diferentes tamanhos, variantes e ícones.
* **`dropdown/Dropdown.jsx` e `DropdownItem.jsx`**: Componentes para criar menus suspensos (dropdowns) interativos.
* **`modal/index.jsx`**: Um componente de modal genérico, que pode ser usado para exibir diálogos e outras informações em sobreposição.
* **`select/Select.jsx`**: Componentes para criar caixas de seleção (selects) estilizadas.
* **`table.jsx`**: Componentes básicos para a criação de tabelas (`Table`, `TableHeader`, `TableBody`, etc.).

### 4.2. Componentes de Formulário (`src/components/form/`)

Componentes para a criação de formulários interativos e validados.

* **`AddressForm.jsx`**: Um formulário para a inserção de dados de endereço, com integração com a API ViaCEP para preenchimento automático.
* **`input/Checkbox.jsx`**: Um componente de caixa de seleção (checkbox) estilizado.
* **`input/DatePicker.jsx`**: Um seletor de datas com calendário interativo, utilizando a biblioteca `flatpickr`.
* **`input/FileInput.jsx`**: Um campo para upload de arquivos.
* **`input/InputField.jsx`**: Um campo de entrada de texto genérico, com suporte a diferentes estados (desabilitado, sucesso, erro).
* **`input/Radio.jsx` e `RadioSm.jsx`**: Componentes de botão de rádio (radio button) em diferentes tamanhos.
* **`input/TextArea.jsx`**: Uma área de texto para a inserção de textos mais longos.
* **`Label.jsx`**: Um componente de rótulo (label) para campos de formulário.

### 4.3. Componentes de Páginas (`src/components/pages/`)

Componentes que representam o conteúdo principal de cada página da aplicação.

* **`auth/SignInForm.jsx`**: O formulário de login, com campos para CPF e senha, e lógica de autenticação.
* **`evaluations/`**: Componentes relacionados à página de avaliações, incluindo a tabela de avaliações (`EvaluationsTable.jsx`) e a página de visualização de dados dos sensores (`sensor-data/`).
* **`home/` e `homePacient/`**: Componentes para as dashboards de diferentes perfis de usuário, com gráficos e cartões de informação.
* **`users/`**: Componentes para o gerenciamento de usuários, como o formulário de cadastro/edição (`UserForm.jsx`), a tabela de usuários (`UsersTable.jsx`) e os cartões de perfil (`user-profile/`).
* **`population-analysis/`**: Componentes para a página de análise populacional, com gráficos comparativos.

## 5. Serviços de API (`src/services/`)

Módulos responsáveis pela comunicação com a API do backend.

* **`api.js`**: Exporta a URL base da API, configurada através de variáveis de ambiente.
* **`apiEvaluations.js`**: Funções para interagir com o endpoint de avaliações, incluindo a busca de avaliações, detalhes e dados de sensores.
* **`apiPerson.js`**: Funções para o CRUD de pessoas (usuários), incluindo a criação, busca, atualização e exclusão de perfis.
* **`apiHealthUnit.js`**: Funções para o CRUD de unidades de saúde.

## 6. Modelos (`src/models/`)

Classes que representam as entidades de dados da aplicação, facilitando a manipulação e a consistência dos dados.

* **`Pessoa.js`**: Modelo para os dados comuns a todos os usuários (CPF, nome, senha, etc.).
* **`Paciente.js`**: Modelo para os dados específicos de pacientes.
* **`Pesquisador.js`**: Modelo para os dados específicos de pesquisadores.
* **`Endereco.js`**: Modelo para os dados de endereço.

## 7. Hooks Customizados (`src/hooks/`)

Hooks reutilizáveis que encapsulam lógicas comuns na aplicação.

* **`useModal.js`**: Um hook para controlar o estado de um modal (aberto/fechado).
* **`useGoBack.js`**: Um hook que fornece uma função para navegar para a página anterior no histórico do navegador.

## 8. Contextos (`src/context/`)

Provedores de contexto para o gerenciamento de estado global.

* **`SidebarContext.jsx`**: Gerencia o estado da barra lateral (expandida/recolhida, aberta/fechada em dispositivos móveis).
* **`ThemeContext.jsx`**: Gerencia o tema da aplicação (claro/escuro).

## 9. Roteamento e Middleware

### 9.1. Roteamento

A aplicação utiliza o sistema de roteamento baseado em arquivos do Next.js. As principais rotas são:

* `/`: Redireciona para `/home` (se autenticado) ou `/signin` (se não autenticado).
* `/signin`: Página de login.
* `/home`: Dashboard principal, que varia de acordo com o perfil do usuário.
* `/users`: Listagem de usuários.
* `/users/register`: Cadastro de novos usuários.
* `/users/profile/[id]`: Perfil de um usuário específico.
* `/evaluations`: Listagem de avaliações.
* `/evaluations/data/[id]`: Visualização dos dados de sensores de uma avaliação.
* `/healthUnit`: Gerenciamento de unidades de saúde.
* `/population-analysis`: Análise populacional.
* `/unauthorized`: Página exibida quando o usuário não tem permissão para acessar uma rota.

### 9.2. Middleware (`src/middleware.js`)

O middleware é responsável por proteger as rotas da aplicação, garantindo que apenas usuários autenticados e com as permissões corretas possam acessá-las. Ele verifica o token de autenticação e o perfil do usuário a cada requisição.

## 10. Autenticação (`src/app/api/auth/`)

A autenticação é gerenciada pelo **NextAuth.js**.

* **`auth.js`**: Define as opções de autenticação, incluindo o provedor de credenciais, a estratégia de sessão (JWT), e as páginas de login.
* **`route.js`**: Exporta os handlers `GET` e `POST` para as rotas de autenticação do NextAuth.js.

## 11. Configuração e Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Grupo-de-Projeto-TecnoAging/TecnoAging_web.git
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
    ```
    NEXT_PUBLIC_API_BASE_URL=<URL_DA_SUA_API>
    NEXTAUTH_SECRET=<UMA_CHAVE_SECRETA_FORTE>
    NODE_ENV=modo
    DEV_SKIP_AUTH=false | true
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5.  Abra `http://localhost:3000` no seu navegador para ver a aplicação.

## 11. Acesso ao sistema

* Conta de Paciente: CPF: 00011122237 | Senha: 123456
* Conta de Profissional: CPF: 12312312311 | Senha: 123456
* Conta de Pesquisador: CPF 00011122233 | Senha: 1234
