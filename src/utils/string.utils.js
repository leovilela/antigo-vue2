import deburr from "lodash/deburr";
// eslint-disable-next-line import/prefer-default-export
export const especialCharMask = (palavra) => {
  let palavraSemAcento = "";
  const caracterComAcento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ ";
  const caracterSemAcento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC_";

  for (let i = 0; i < palavra.length; i++) {
    const char = palavra.substr(i, 1);
    const indexAcento = caracterComAcento.indexOf(char);
    if (indexAcento != -1) {
      palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
    } else {
      palavraSemAcento += char;
    }
  }
  return palavraSemAcento;
};

export const convertString = string => deburr(string);


export const upperFirstLetter = (string) =>  {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}
