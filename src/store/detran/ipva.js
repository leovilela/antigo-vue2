export default class Ipva {
  constructor(ano) {
    this.ipva = true;
    this.active = false;
    this.filterOT = "ipva";
    this.selectParcela = false;
    this.ano = ano;
    this.parcelaUnica = {};
    this.parcela1 = {};
    this.parcela2 = {};
    this.parcela3 = {};
  }


  getSoma(p) {
    if (!Array.isArray(p)) {
      throw new Error("getSoma deve receber um array");
    }

    let resultado = 0;
    p.forEach((n) => {
      switch (n) {
        case 1:
          resultado += this.parcela1;
          break;
        case 2:
          resultado += this.parcela2;
          break;
        case 3:
          resultado += this.parcela3;
          break;
        default:
          resultado += this.parcelaUnica;
          break;
      }
    });

    return resultado;
  }

  // radio = vista | parcelado
  // boxes = [parcela1, parcela2, parcela3]
  explode(radio, boxes) {
    if (radio === "vista") {
      return [this.parcelaUnica];
    }
    const result = [];
    if (boxes.indexOf("parcela1") !== -1) {
      result.push(this.parcela1);
    }
    if (boxes.indexOf("parcela2") !== -1) {
      result.push(this.parcela2);
    }
    if (boxes.indexOf("parcela3") !== -1) {
      result.push(this.parcela3);
    }
    return result;
  }
}
