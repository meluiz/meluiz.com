export const formatSerial = (serial: number) => {
  return `No. ${String(serial).padStart(3, '0')}`;
};

export const formatCount = (count: number) => {
  return String(count).padStart(2, '0');
};
