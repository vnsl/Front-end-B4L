![](https://i.imgur.com/xG74tOh.png)

# 1ª Sprint - Front-end

A estilização das telas poderá ser feita do modo mais confortável para você, seja CSS puro, algum framework de CSS (bootstrap, tailwindcss, etc) ou alguma biblioteca de Design System (Material UI, etc). **Nossa recomendação é utilizar o Material UI**.

Você poderá fazer adaptações no layout, desde que siga a ideia do design (não fugir muito das cores, alinhamentos, espaços e etc). Use sua criatividade!

## A pizzaria é um exemplo, sinta-se livre para mudar!

## O input de imagens não será desenvolvido nesta sprint! 

Telas que precisam ser desenvolvidas:

## Áreas não protegidas

### Cadastro de usuário: `/cadastro`
- Funcionalidades:
  - O usuário poderá visualizar sua senha enquanto a escreve
  - O cadastro terá que ser feito em steps
  - O usuário terá que confirmar sua senha
  - Deverão ser informadas mensagens de erro em casos de:
    - Campos obrigatórios em branco
  - Após realizado o cadastro com sucesso o usuário deverá receber uma mensagem de confirmação e ser redirecionado para a página de Login
        
<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>Biblioteca react-hook-form</code></li>
    <li><code>Biblioteca react-router-dom</code></li>
    <li><code>fetch API</code></li>
    <li>componente <code>Stepper</code> do Material UI para realizar os steps</li>
    <li>componente <code>Snackbar</code> do Material UI para mensagens</li>
    <li>
        componentes <code>TextField</code>, <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code>, do Material UI para construção geral da página
    </li>
    </ul>
</details>



### Login: `/`
- Funcionalidades:
  - Deverão ser informadas mensagens de erro em casos de:
    - Campos obrigatórios em branco
  - Após realização de login com sucesso, deverá ser retornado ao navegador o token de autenticação de forma que possa ser utilizado em outras funcionalidades que exigem autenticação. O usuário deverá ser redirecionado para a tela de Listagem de produtos
        
<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>Biblioteca react-hook-form</code></li>
    <li><code>Biblioteca react-router-dom</code></li>
    <li><code>fetch API</code></li>
    <li>componente <code>Snackbar</code> do Material UI para mensagens</li>
    <li>
        componentes <code>TextField</code>, <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code>, do Material UI para construção geral da página
    </li>
    </ul>
</details>

## Áreas protegidas

### Produtos: `/produtos`

- Funcionalidades:
    - Carregamento dos produtos do restaurante
    - Ao clicar no link de logout, redirecionar para a página de Login
    - Ao clicar no botão de adicionar um produto, abrir um modal/dialog com o formulário de criação de novo produto
    - Ao clicar no botão de editar produto, abrir um modal/dialog com o formulário de criação de novo produto
    - Ao clicar no botão de excluir produto, excluir o produto
    - Deverão ser informadas mensagens de erro em casos de:
      - Campos obrigatórios em branco

#### O input de imagens não será desenvolvido nesta sprint! 

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>Biblioteca react-hook-form</code></li>
    <li><code>Biblioteca react-router-dom</code></li>
    <li><code>fetch API</code></li>
    <li>componente <code>Switch</code> do Material UI para os inputs "Ativar produto" e "Permitir observações"</li>
    <li>componente <code>Dialog</code> do Material UI para modals/dialogs</li>
    <li>componente <code>Snackbar</code> do Material UI para mensagens</li>
    <li>
        componentes <code>TextField</code>, <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code>, do Material UI para construção geral da página
    </li>
    </ul>
</details>

## Requisitos obrigatórios
- Sua aplicação deve ser desenvolvida com `React`;
- Trabalhar com `Hooks` (`useState`, `useEffect`, `useRef`...)
- Trabalhar com `componentização`;
- Utilizar `context API` (Context);
- Utilizar roteamento (`react-router-dom`);
- Integração ao back-end;
- Seguir a estrutura de layout do wireframe que está no arquivo `.fig` que se encontra na pasta raiz;

## Links Úteis
- Documentação do ReactJS: https://reactjs.org/
    - Context API: https://reactjs.org/docs/context.html
    - Hooks (useState, useEffect, useRef): https://reactjs.org/docs/hooks-intro.html
- Documentação react-router-dom: https://reactrouter.com/web/guides/quick-start
- Documentação react-hook-form: https://react-hook-form.com/
- Documentação Material UI: https://material-ui.com/
- Documentação Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


## Aulas Úteis
- [Posições e Z-Index](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/24/03/2021/aula/54261891-e798-469e-b594-9defc1bc3cfa/)
- [Revisão CSS](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/30/06/2021/aula/a718082d-f077-46b7-98ea-8fc17459a95b/)
- [DevMatch pt. 1](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/05/07/2021/aula/00ed6d15-e8af-4de9-aaeb-03bd6220cc9f/)
- [DevMatch pt. 2](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/07/07/2021/aula/e34e378a-fc45-48e9-afae-1b1f92a7e434/)
- [DevMatch pt. 3 Integrações](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/12/07/2021/aula/15249e28-a2b0-4661-b9e5-39afe07e73b9/43f55cc4-fae8-49d9-935d-7edd4cfc7e88)
- [Context](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/24/05/2021/aula/40d22af1-7ae3-48ee-84e0-dc4858a46729/c882bfa1-fa0b-4b1a-86d6-f1ea094e2377)
- [Gerenciando o estado de aplicações](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/26/05/2021/aula/812c9c5f-2657-4228-a3a9-e430036a421b/e0680e8a-8baf-4118-8b91-7f34930099a7)
- [Opções com o Fetch](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/26/05/2021/aula/812c9c5f-2657-4228-a3a9-e430036a421b/986936fb-e2d6-4f8c-803c-2f2aceb4200c)
- [Estilizando links ativos](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/0f47afe2-a658-4b69-b2d2-f010eae5fa9a)
- [Rotas protegidas](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/380ba9df-4876-4ac5-b975-8290ade35a0e)
- [Redirecionamento de rotas](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/ed0feaa8-dbb3-4404-a6f1-30a42fe6e701)
- [Parametros de rota](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/009aca52-7f2e-4674-9716-dff03899d91f)
- [Apresentando o react-hook-form](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/02/06/2021/aula/0c0ad3ca-7ca0-4d09-8852-7f8d421948c9/4cc61e3f-9eed-48ba-9b6b-0c61636a8bf1)
- [Validações com o react-hook-form](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/02/06/2021/aula/0c0ad3ca-7ca0-4d09-8852-7f8d421948c9/c5ac1755-4b9c-46f4-850f-8bd053174047)
- [useLocalStorage](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/07/06/2021/aula/7efd6594-b8d9-4c0c-a41e-5eb168e84dba/72bb0203-1b58-4e9d-9bed-1a0f854e7263)
- [Primeiros componentes do Material UI](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/07/06/2021/aula/7efd6594-b8d9-4c0c-a41e-5eb168e84dba/acda31cc-43cf-4dc8-be51-738b38aa0d66)
- [Resumão React](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/09/06/2021/aula/8b162b03-22e3-4c49-bf9f-d5388ae852c2/e12396ad-5ca2-4ad8-9303-c1c6b36e12e7)
- [Continuação Resumão](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/11/06/2021/aula/8f161266-3cc9-491e-8ac2-6a5611fc719d/3abac795-c391-48ca-8c22-ec34ce62b381)