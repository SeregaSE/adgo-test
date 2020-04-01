const getPaginationArray = (count, limit) => {
  const arrLength = Math.ceil(count / limit);
  const arr = [];
  for (let i = 0; i < arrLength; i++) {
    arr.push(i);
  }
  return arr;
}
  
export default getPaginationArray;