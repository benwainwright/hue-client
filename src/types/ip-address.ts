export type IpAddress = `${string}.${string}.${string}.${string}`;

export const isIpAddress = (address: string): address is IpAddress => {
  const ipRegex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/u;

  return Boolean(address.match(ipRegex));
};
