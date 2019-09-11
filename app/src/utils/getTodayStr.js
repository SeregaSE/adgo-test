export const getTodayStr = () => {
  const now = new Date();
  const currentMonth =
    String(now.getMonth() + 1).length === 1
      ? `${0 + String(now.getMonth() + 1)}`
      : `${String(now.getMonth() + 1)}`;
  return `${now.getFullYear()}-${currentMonth}-${now.getDate()}`;
};
