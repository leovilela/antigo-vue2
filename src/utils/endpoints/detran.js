export default {
  listDebits: (objc) => {
    let estado = objc.payload.estado;
    let placa = objc.payload.placa;
    let cpfCnpj = objc.payload.cpfCnpj;
    let renavan = objc.payload.renavan;
    let url = "";


    if (estado) {
      estado = `estado=${estado}`;
    } else {
      estado = "estado=LI";
    }
    if (placa) {
      placa = `&placa=${placa.replace(/\s/g, "")}`;
    } else {
      placa = "&placa=A";
    }
    if (cpfCnpj) {
      cpfCnpj = `&cpfCnpj=${cpfCnpj}`;
    } else {
      cpfCnpj = "&cpfCnpj=000";
    }
    if (renavan) {
      renavan = `&renavam=${renavan}`;
    } else {
      renavan = "&renavam=000";
    }

    url = `${process.env.API_DETRAN}/api/Detran?${estado}${placa}${cpfCnpj}${renavan}`;

    return url;
  },

  newPayment: () => `${process.env.API_CORBAN}/api/Payment`,

  checkBlockTime: () => `${process.env.API_CORBAN}/api/Payment/checkBlockTime`,

  requiredFields: () => `${process.env.API_DETRAN}/api/Detran/requiredFields`,

};
