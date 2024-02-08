export default [
  {
    label: 'Valor parcela',
    field: 'installmentValue',
    transactionTypesEnabled: [2, 4]
  },
  {
    label: 'Valor liberado',
    field: 'releasedValue',
    transactionTypesEnabled: [1, 8],
  },
  {
    label: 'Valor transação',
    field: 'transactionValue',
    transactionTypesEnabled: [1, 8]
  },
  {
    label: 'Total',
    field: 'totalTransaction',
    transactionTypesEnabled: [4]
  },
  {
    label: 'Total liberado',
    field: 'totalReleasedTransaction',
    transactionTypesEnabled: [2]
  }
]

