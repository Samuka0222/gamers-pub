export function dateFormat(unixTime: number) {
  const date = new Date(unixTime * 1000);

  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
