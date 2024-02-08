<template>
  <div id="modalErros">

    <div class="alert alert-danger formatTxt" role="alert">
      <p class="glyphicon glyphicon-exclamation-sign"></p>
      <h3>Erro(s) nos bloco(s) ==> campo(s): </h3>
      <div>
        <table id="erros" width="100%">

          <tbody>
            <tr v-for="(pos, index) in transactionObj.response.data" :key="index">
              <td>
              {{pos}}
                <table border="1" width="100%" cellpadding="2" cellspacing="2">
                  <tr>
                    <td valign="top" align="left">
                      <ul v-for="(pos2, index) in pos.errorList" :key="index">
                        <!--li>{{text[pos.blockTypeDescription].title}} ==> {{text[pos.blockTypeDescription].labels[pos2.name.charAt(0).toLowerCase() + pos2.name.slice(1)]}}</li-->
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable func-names */


export default {
  data() {
    return {
      modalTimeOut: null,
      btRecarregue: false,
      text: {
        err400: "Erro nos dados enviados",
        err401: "Erro na autenticação.<br>Recarregue sua página",
        err403: "Não autorizado",
        err415: "Arquivo não suportado",
        err500: "Erro no processamento",
        recarregar_pagina: "Recarregar página",

        BankingReferences: {
          title: "Dados bancários",
          labels: {
            bank: "Banco",
            agency: "Agência",
            digit: "Dígito",
            account: "Conta corrente",
            account_since: "Conta desde",
          },
          placeholders: {
            account_since: "Conta desde",
          },
        },
        pep: {
          title: "Declaração Obrigatória Pessoa Exposta Politicamente",
          description: "PEP (Pessoa Exposta Politicamente) são pessoas que desempenham ou tenham desempenhado nos últimos cinco anos, no Brasil ou o exterior, cargos, empregos e/ou funções públicas relevantes, assim como seus representantes, familiares, e outras pessoas de seu relacionamento próximo. Conforme definido pela Circular nº 3.339 de 22/12/2016 do Banco Central do Brasil, as instituições financeiras, devem observar procedimentos a respeito das movimentações financeira das chamadas PEP. Possui representantes, sócios, administradores, familiares ou outras pessoas de seu relacionamento que desempenham ou desempenharam nos últimos 05 anos, no Brasil ou em países, territórios e dependências estrangeiras, cargos, empregos ou funções públicas relevantes?",
          labels: {
            yes: "Sim (Relacione abaixo)",
            no: "Não",
            cpf: "CPF",
            name: "Nome",
            startMandate: "Início mandato",
            expirationDate: "Fim mandato",
            kinship: "Grau relacionamento",
            organ: "Órgão",
            position: "Cargo",
          },
        },

        RegistrationData: {
          title: "Dados Cadastrais",
          labels: {
            cnpj: "CNPJ",
            fullName: "Razão Social",
            simpleName: "Nome Fantasia",
            addressStreetName: "Endereço",
            addressNumber: "Nº",
            addressAdditionalData: "Complemento:",
            addressNeighborhood: "Bairro",
            cityName: "Cidade",
            uf: "UF",
            addressPostalCode: "CEP",
            referencePoint: "Ponto de Referência:",
            phone: "Telefone",
            postalBox: "Caixa Postal:",
            foundationDate: "Data Fundação",
            numCommercialBoard: "Registro Junta Comercial:",
            shareCapitalValue: "Capital Social Atual (R$):",
            successorSocialName: "Sucessora de (razão social):",
            dateIncial: "Em (data):",
            qtdeBranch: "Filiais:",
            mainProducts: "Principais Produtos:",
            branchActivity: "Ramo de Atividade",
            numEmployees: "Nº Funcionários",
            optSimplesNacional: "Simples Nacional",
            brazilSimples_optIn: "Optante",
            brazilSimples_optOut: "Não optante",
            socialObject: "Objeto Social:",
          },
        },
        CorporatePartnerShareHolder: {
          title: "CorporatePartnerShareHolder (Sócios, Administradores ou Procuradores)",
          labels: {
            CorporatePartnerShareHolder: "CorporatePartnerShareHolder/Sócios",
            administradores: "Administradores",
            procuradores: "Procuradores",
            nome: "Nome",
            cpf: "CPF",
            admissionDate: "Data de Admissão",
            capitalParticipation: "Participação (%)",
            expirationDate: "Vcto. Mandato:",
            position: "Cargo:",
            expirationDateProcuration: "Vcto. Procuração:",
          },
        },
        participacoes: {
          title: "Participação em Outras Empresas",
          labels: {
            companyName: "Razão Social:",
            lineBusiness: "Ramo de Atividade:",
            cnpj: "CNPJ:",
            capitalParticipation: "Participação (%):",
          },
        },
        dadosPatrimoniais: {
          title: "Dados Patrimoniais",
          labels: {
            realEstate: "Bens Imóveis",
            description: "Descrição:",
            location: "Localização:",
            value: "Valor (R$):",
            movables: "Bens Móveis",
            type: "Espécie:",
            markModel: "Marca/Modelo:",
            year: "Ano:",
          },
        },
        referenciasComerciais: {
          title: "Referências Comerciais",
          labels: {
            companyName: "Razão Social:",
            phone: "Telefone:",
          },
        },
        principaisParceiros: {
          title: "Principais Parceiros",
          labels: {
            companyName: "Nome da Empresa:",
            product: "Produto em que Opera:",
            productionMonthly: "Produção Mensal (R$):",
          },
        },
        Revenue: {
          title: "Faturamento",
          labels: {
            lastTwoYears: "Últimos 02 anos",
            year: "Ano:",
            value: "Valor (R$):",
            companySizeID: "Com base no faturamento, classifique o porte da empresa",
          },
        },
        principaisProdutos: {
          title: "Principais Produtos",
          labels: {
            product: "Produto:",
            productionMonthly: "Produção Mensal (R$):",
            averageValue: "Valor Médio Operação (R$):",
            quantity: "Quantidade:",
            details: "Observações:",
          },
        },
        financiamentoVeiculos: {
          title: "Somente para <strong>Produto Financiamento de Veículos (Exclusivo para o Segmento de Veículos)</strong>",
          labels: {
            vehicleTypes: "Tipos de Veículos que Trabalha:",
            vehicleStock: "Quantidade Veículos Estoque:",
            vehicleAgeQuantity: "Quantidade Veículos por Faixa:",
            other: "Outros Dados:",
            light: "Leves",
            heavy: "Pesados",
            bikes: "Motos",
            utility: "Utilitários",
            qtySmall: "Pequena de 01 a 15",
            qtyMedium: "Média de 16 a 45",
            qtyLarge: "Grande acima de 45",
            ageNew: "0 KM",
            ageAbove2002: "Acima de 2002",
            ageBelow2002: "Abaixo de 2002",
            otherMonthlySold: "Volume veículos vendidos Mês:",
            otherMonthlyFinanced: "Volume veículos financiados Mês:",
            otherMonthlyFinancedValue: "Valor de financiamentos Mês:",
          },
        },

        paymentError: {
          scheduleDate: "A data de pagamento não é um dia útil.",
          paymentData: "Erro nos dados enviados.",
        },
      },

    };
  },
  props: {
    transactionObj: {
      required: true,
    },
  },
  mounted() {
    this.protocolo = window.location.protocol;
    // this.transactionObj.data.forEach((value, index) => {
    //     value.posicao = index;
    //     self.listaCoeficientes.push(value);
    //   });
    // if (this.transactionObj.Code === 0) {
    //   myVar = setTimeout(this.redirectPage, 5000);
    // }
  },
  methods: {
    // emitir toggle Modal
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    redirectPage() {
      this.closeModal();
      this.$router.push("/login", () => {});
    },
    reloadPage() {
      this.$router.go({ path: "$nuxt.$route.path", force: true });
    },
    msgErr(err) {
      let msg;
      switch (err) {
        case (400):
          msg = this.text.err400;
          break;
        case (401):
          msg = this.text.err401;
          this.btRecarregue = true;
          break;
        case (403):
          msg = this.text.err403;
          this.$warehouse.remove("refresh_token");
          this.$warehouse.remove("access_token");
          this.$warehouse.remove("Authorization");
          this.$warehouse.remove("expiresToken");
          setTimeout(this.redirectPage, 2000);
          break;
        case (415):
          msg = this.text.err415;
          break;
        case (500):
          msg = this.text.err500;
          break;
        default:
          msg = "Error";
      }

      return msg;
    },
    paymentError(err) {
      const self = this;

      if (err) {
        if (err.indexOf("scheduleDate") > -1) {
          return self.text.paymentError.scheduleDate;
        }
        return self.text.paymentError.paymentData;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalErros {
  height: 100%;
  text-align: center;

  h3{
    padding:0;
     margin: 0;
  }

  ul{
    padding:0;
     margin: 0;
    list-style-type: none;
  }

  li{
    padding:0;
    margin: 0;

  }

  .formatTxt{
    font-size: @ftSizeLarge;
  }

  #loadImage{
    text-align: center;
  }

  #buttons {
    button {
      width: 100%;

      &#concluir {
        color: @color7;
      }
    }
  }
}
</style>
