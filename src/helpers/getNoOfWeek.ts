const getNoOfWeek = timestamp => {
  const now = new Date();
  const today: any = timestamp ? new Date(timestamp) : new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstOfYear: any = new Date(now.getFullYear(), 0, 1);
  const numOfWeek = Math.ceil((((today - firstOfYear) / 86400000) - 1) / 7)
  return numOfWeek
}

export default getNoOfWeek;