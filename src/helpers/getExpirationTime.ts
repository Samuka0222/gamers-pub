export function getExpirationTime(time: number) {
  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + time * 1000);
  return expirationTime;
}
