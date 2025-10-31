# 🐶 Patinhas & Cia - Sistema de Gerenciamento de Pet Shop

> Desafio do Módulo 1 - HTML, CSS e JavaScript

Este projeto é uma interface de gerenciamento para um Pet Shop, desenvolvida como parte do **Desafio do Módulo 1**, focando na integração de HTML, CSS e JavaScript puros, com ênfase na persistência de dados no `localStorage`.

## ✅ Requisitos do Desafio

O projeto atende aos seguintes pontos solicitados:

1.  **Navbar:** Para navegação entre as páginas da aplicação (`index.html`, `clients.html`, `store.html`).
2.  **Layout Responsivo:** Desenvolvido com CSS para garantir boa visualização em diferentes tamanhos de tela (`style.css`).
3.  **Arquivos Separados:** Estrutura clara com arquivos dedicados para HTML, CSS e JavaScript.
4.  **Salvamento de Dados:** Utilização do `localStorage` para persistir dados de clientes e itens do carrinho (`script.js`).

## ✨ Funcionalidades por Página

### 1. 🏠 Início e Cadastro (`index.html`)

| Categoria | Campos de Dados |
| :--- | :--- |
| **Informações Gerais** | Nome, descrição, logomarca do Pet Shop. |
| **Tutor** | Nome, Telefone, Endereço, Data do Atendimento. |
| **Animal** | Nome, Idade, Porte. |

* O formulário salva os dados diretamente no `localStorage` após o envio, redirecionando o usuário para a página de clientes.

### 2. 📝 Listagem de Clientes (`clients.html`)

* **Formato de Cards:** Clientes cadastrados são listados em cards simples.
* **Informações Iniciais:** Apenas **Nome do Animal** e **Data do Atendimento** são visíveis nos cards.
* **Modal de Detalhes:** Ao clicar em um card, um modal exibe todas as informações de cadastro (Tutor e Animal).

### 3. 🛍️ E-commerce de Produtos (`store.html`)

* **Vitrine:** Listagem de produtos (nome, imagem, valor) em formato de cards.
* **Controle de Carrinho:** Ao clicar em **"Adicionar ao Carrinho"**:
    * O produto é salvo no `localStorage`.
    * O projeto inclui um **contador flutuante** que exibe o total de itens adicionados ao carrinho.

## 🚀 Como Executar o Projeto

1.  **Clone o Repositório.**
2.  **Abra o Arquivo `index.html`** diretamente no seu navegador.
3.  **Teste a persistência:** Cadastre um cliente e recarregue a página; o cliente deve aparecer na lista da página "Clientes".
