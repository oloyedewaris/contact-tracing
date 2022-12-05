const getListData = (balanceState, sortFactor) => {
  let newIncome = 0;
  let newExpenses = 0;
  (balanceState.items || []).forEach(balance => {
    if (balance.type === 'income')
      newIncome += Number(balance.amount)
    if (balance.type === 'expenses')
      newExpenses += Number(balance.amount)
  })
  let newBalance = newIncome - newExpenses;
  let newList;

  if (sortFactor === 'time') {
    newList = [...balanceState.items].sort((a, b) => (b.timestamp - a.timestamp))
  } else if (sortFactor === 'amount') {
    newList = [...balanceState.items].sort((a, b) => (b.amount - a.amount))
  } else if (sortFactor === 'name') {
    newList = [...balanceState.items].sort((a, b) => (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0)
  } else {
    newList = [...balanceState.items]
  }

  return { newBalance, newIncome, newExpenses, newList }
}

export default getListData