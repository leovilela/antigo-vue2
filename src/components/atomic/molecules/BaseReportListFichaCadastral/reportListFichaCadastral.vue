<template>
  <ul class="report-list-ficha-cadastral">
    <li
      v-for="(data, index) in list"
      :key="index"
      class="report-list-ficha-cadastral__item">

        <div v-if="!Array.isArray(data[1])">
          <Base-Report
            :title="tratamentKey(data[0])"
            :content="format(data[1])"
          />
        </div>

        <dl
          class="report-list-ficha-cadastral_array"
          v-else
        >
          <dt class="report-list-ficha-cadastral_array-title">{{ tratamentKey(data[0]) }}</dt>
          <dd
            v-for="(item, index2) in data[1]"
            :key="index2"
            class="report-list-ficha-cadastral_array-item"
          >
            <Base-Report
              v-for="(el, index3) in Object.entries(item)"
              :key="index3"
              :title="tratamentKey(el[0])"
              :content="format(el[1])"
            />
          </dd>
        </dl>
    </li>
  </ul>
</template>

<script>
// import dayjs from "dayjs";

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    model() {
      const model = {
        cpf: "CPF",
        fullName: "Nome Completo",
        rg: "RG",
        identificationDocumentType: "Tipo de documento",
        documentState: "Estado do documento",
        organEmitter: "Orgão Emissor",
        emissionDate: "Data de emissão",
        degreeEducationID: "ID educacional",
        nameMother: "Nome da mãe",
        maritalStatusID: "ID do estado civil",
        genderID: "ID do gênero",
        birthDate: "Data de nascimento",
        placeOfBirth: "Naturalidade",
        phone: "Telefone",
        phoneCel: "Celular",
        emai: "E-mail",
        documentNumberCPF: "CPF",
        homeType: "Tipo de casa",
        otherHome: "Outra Casa",
        houseTimeID: "Tempo da Casa",
        addressStreetName: "Endereço",
        addressPostalCode: "Código Postal",
        addressNumber: "Número",
        addressAdditionalData: "Complemento",
        addressNeighborhood: "Bairro",
        cityName: "Cidade",
        uf: "UF",
        participationOthersCompanies: "Participação",
        numberDocumentCNPJ: "CNPJ",
        capitalParticipation: "Capital de participação",
        admissionDate: "Data de admissão",
        profession: "Profissão",
        function: "Cargo",
        salary: "Salário",
        bankName: "Nome do banco",
        financialBankId: "Banco financeiro",
        agency: "Agência",
        agencyCV: "Agência CV",
        account: "Conta",
        accountCV: "Conta CV",
        accountSince: "Conta desde",
        movableSpecie: "Espécie móvel",
        markModel: "Modelo",
        year: "Ano",
        value: "Valor",
        location: "Localização",
        description: "Descrição",
        name: "Nome",
        warrantIni: "Mandado Inicial",
        warrantEnd: "Mandado Final",
        degreeRelationship: "Grau relacionamento",
        organ: "Orgão",
        function: "Cargo",
        cnpj: "CNPJ",
        simpleName: "Nome Simples",
        foundationDate: "Fundação",
        shareCapitalValue: "Valor de capital compartilhado",
        qtdeBranch: "Quantidade de filiais",
        branchActivity: "Ramo de atividade",
        numEmployees: "Número de funcionários",
        optSimplesNacional: "Simples nacional",
        movables: "Bens móveis",
        immovables: "Bens imóveis",
        admin: "Administrador",
        expirationDate: "Data de encerramento",
        position: "Cargo",
        partner: "Acionista",
        ParticipationOthersCompanies: "Participação Outras Empresas",
        companyName: "Nome da Empresa",
        lineBusiness: "Linha de negocio",
        capitalParticipation: "Capital de participação",
        revenuesYear01: "Receita ano 1",
        revenuesValue01: "Receita valor 1",
        revenuesYear02: "Receita ano 2",
        revenuesValue02: "Receita valor 2",
        companySize: "Tamanho da empresa",
        productionMotorVehicles: "Veículos a motor de produção",
        typeLight: "Tipo de veículos que trabalha: Leves",
        typeHeavy: "Tipo de veículos que trabalha: Pesados",
        typeUtility: "Tipo de veículos que trabalha: Utilitários",
        typeMoto: "Tipo de veículos que trabalha: Motos",
        sizeStockSmall: "Estoque pequeno: de 01 a 15",
        sizeStockMedium: "Estoque médio: de 16  a 45",
        sizeStockLarge: "Estoque grande: acima de 45",
        qtdePhase0Km: "Estoque de veículos 0KM",
        qtdePhaseUp2002: "Estoque de veículos acima de 2002",
        qtdePhaseDown2002: "Estoque de veículos abaixo de 2002",
        volumeSoldMonth: "Volume de vendas mês",
        volumeFinancedMonth: "Volume de veículos financiados mês",
        valueFinancedMonth: "Valor de financiamentos mês",
        isPep: "PEP",
        gender: "Sexo",
        peps: "PEPs",
        houseTime: "Tempo de serviço",
        cpf: "CPF",
        name: "Nome",
        value: "Valor",
        location: "Localização",
        markModel: "Modelo",
        movableSpecie: "Bens móveis",
        degreeEducation: "Licenciatura em Educação",
        maritalStatus: "Estado civil",
        birthdate: "Data de nascimento",
      }

      return model;
    },
  },
  methods: {
    tratamentKey(value) {
      Object.keys(this.model).map(el => {
        if(value === el) {
          value = this.model[el];
        }
      });

      return value ? value.toString() : '';
    },
    format(value) {
      // let info;
      // const regex = /\d{4}-\d{2}-\d{2}/;

      // if(regex.test(value)) {
      //   value = dayjs(value).format("DD/MM/YYYY");
      // }

      if(typeof value === "boolean") {
        value = value ? "SIM" : "NÃO";
      }

      // if(Array.isArray(value)) {
      //   value = value.map(item => {
      //     info = Object.entries(item);

      //     const key = info[0];
      //     const val = info[1];

      //     return ` ${key} ${val} `;
      //   });


      return value ? value.toString() : '';
    }
  },
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
