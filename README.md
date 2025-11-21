# RD Station – Recomendador de Produtos

Implementação do desafio técnico de Frontend (Pessoa Desenvolvedora Júnior/Pleno) da RD Station, focado em um sistema de recomendação de produtos baseado em preferências do usuário.

## Visão geral

A aplicação permite que a pessoa usuária selecione preferências em um formulário e receba recomendações de produtos de marketing/vendas, suportando modos de recomendação "SingleProduct" e "MultipleProducts", com regra de desempate retornando o último produto válido.

## Tecnologias

- React.js (Create React App)
- Tailwind CSS
- json-server
- Jest + React Testing Library

## Como rodar o projeto

Pré‑requisitos:
- Node 18.3+ instalado
- Yarn instalado

Passos:

1. Instalar dependências
yarn install

2. Rodar script de instalação (configuração de json-server, etc.)
./install.sh

3. Iniciar frontend e backend juntos
yarn dev

ou, se preferir:
yarn start:frontend
yarn start:backend

A aplicação ficará disponível em http://localhost:3000.

## Scripts disponíveis

- `yarn start` – inicia o frontend em modo desenvolvimento
- `yarn start:backend` – inicia apenas o json-server
- `yarn dev` – inicia frontend e backend em paralelo
- `yarn test` – executa a suíte de testes em modo watch (tem que entrar na pasta frontend para rodar)
- `yarn build` – cria o build de produção (tem que entrar na pasta frontend para rodar)

## Testes

Os testes foram escritos com Jest e React Testing Library.

Principais partes cobertas:

- `services/recommendation.service.js`: testes unitários da lógica de recomendação (diferentes preferências, modos Single/Multiple, desempate pelo último produto válido).
- `components/Form/Form.js`: fluxo principal de preenchimento e envio do formulário.
- `components/RecommendationList/RecommendationList.js`: renderização da lista de recomendações.
- `hooks/useRecommendations.js`: estados de carregamento, sucesso e erro (serviço mockado).

Os arquivos principais do desafio são `App.js`, `components/Form/Form.js` e `services/recommendation.service.js`, onde está concentrada a lógica de recomendação e integração com a UI.

## Decisões técnicas

- Mantive a lógica de recomendação isolada em `recommendation.service.js` para facilitar testes unitários e futuras extensões de regras de negócio.
- O formulário utiliza hooks customizados para separar responsabilidades (estado do formulário, busca de produtos, busca de recomendações).
- A lista de recomendações foi implementada como componente reaproveitável, desacoplado da origem dos dados.

## Possíveis melhorias futuras

- Novas métricas e critérios de recomendação (ex.: peso por categoria, pontuação composta).
- Tela de loading/erro mais rica para estados da API.
- Mais cenários de testes cobrindo casos extremos e regras adicionais de negócio.
- Ajustes de acessibilidade (ARIA, navegação por teclado).

## Autor

Desenvolvido por Deivid Micael