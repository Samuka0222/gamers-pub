export function getRandomPhrase() {
  const phrases = [
    'Me recomende jogos semelhantes a Minecraft.',
    'Quero jogos de pancadaria, trocação de soco sincera!',
    'Quero os melhores jogos de Hideo Kojima.',
    'Me recomende os melhores jogos feitos por brasileiros.',
    'Quais são os melhores jogos indies dos ultimos anos?',
    'Fala para mim qual são os melhores jogos de Corrida?',
    'Me recomende jogos semelhantes a Ghost of Tsushima.',
    'Quero saber quais são os melhores jogos Souls-like que não são da From Software.',
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}
