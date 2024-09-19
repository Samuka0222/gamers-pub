export function dateFormat(unixTime: number) {
  const date = new Date(unixTime * 1000);

  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function dateFormatWithoutYear(unixTime: number) {
  const date = new Date(unixTime * 1000);

  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const formattedDate = `${day} de ${months[month - 1]}`;

  return formattedDate;
}
