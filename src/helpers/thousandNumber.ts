export default strToNum = numb => {
  //Find 1-3 digits followed by exactly 3 digits & a comma or end of string
  let regx = /(\d{1,3})(\d{3}(?:,|$))/;
  let currStr;
  let str = numb.toString();

  do {
    currStr = (currStr || str.split(`.`)[0])
      .replace(regx, `$1,$2`)
  } while (currStr.match(regx)) //Stop when there's no match & null's returned

  return (str.split(`.`)[1]) ?
    currStr.concat(`.`, str.split(`.`)[1]) :
    currStr;

};