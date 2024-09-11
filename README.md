# Gamers' Pub: Recomendação e Review de Games

![Print da gamers pub](./public/gamers-pub-print.png)

Esse é meu primeiro projeto utilizando a API do Google Gemini para criar um chatbot para recomendação de jogos de acordo com as caracteristicas pedidas pelo usuário no prompt. Além disso também implementei um sistema de Review baseado na plataforma Backloggd e utilização da API da IGDB para obter as informações de todos os games.

Nessa primeira versão do projeto, o usuário pode fazer reviews e solicitar recomendações para o chatbot, nenhuma informação é salva, pois decidi não usar um banco de dados nesse primeiro momento. Porém já estou pensando em expandir esse projeto com a criação de uma API isolada utilizando o Nest.js e uma versão mobile com React Native.

Quem quiser testar o projeto, por favor deixe seu feedback, sugestões, reclamações, todas são bem-vindas! 😊

## Tecnologias e Ferramentas

### Base:
- Next.js
- Typescript
- pnpm

# API
- Axios
- Google Gemini
- Next.js
- IGDB
- API Gateway (Para criar um proxy para poder interagir com a API do IGDB com a URL do deploy)

### Linting:
- Eslint
- Prettier
- Lint-staged
- Commitlinting
- Husky
- EditorConfig

#  UI:
- Shadcn UI
- Tailwind CSS
- Sonner

# Gerenciamento de Estado:
- Zustand

# Outros:
- Date-Fns
- React Markdown

### Sinta-se livre para deixar seu feedback, sugestões e reportar bugs!

---

# English version.

# Gamers' Pub: Recommendations and Reviews for Games

This is my first project using Google's Gemini API to build a chatbot that suggests games based on what you're looking for! I've also added a review system using Backloggd and the IGDB API to get all the game info.

In this first version, you can review games and ask the chatbot for recommendations. I'm not saving any of your info yet, but I'm thinking of adding a database using Nest.js and making a mobile app with React Native.

Want to try it out? Please let me know what you think! Feedback, suggestions, complaints...I'm all ears! 😊

## Technologies and Tools

### Base:
- Next.js
- Typescript
- pnpm

# API
- Axios
- Google Gemini
- Next.js
- IGDB
- API Gateway (Create a Proxy to interact with deploy's URL)

### Linting:
- Eslint
- Prettier
- Lint-staged
- Commitlinting
- Husky
- EditorConfig

#  UI:
- Shadcn UI
- Tailwind CSS
- Sonner

# State Management:
- Zustand

# Others:
- Date-Fns
- React Markdown

### Feel free to leave your feedback and suggestions!
