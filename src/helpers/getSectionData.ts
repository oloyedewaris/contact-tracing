import getNoOfWeek from './getNoOfWeek';

const getSectionData = (balanceState, sortFactor) => {
  let newIncome = 0;
  let newExpenses = 0;
  (balanceState.items || []).forEach(balance => {
    if (balance.type === 'income')
      newIncome += Number(balance.amount)
    if (balance.type === 'expenses')
      newExpenses += Number(balance.amount)
  })
  let newBalance = newIncome - newExpenses;
  let totalBalance;

  if (sortFactor === 'time') {
    totalBalance = [...balanceState.items].sort((a, b) => (b.timestamp - a.timestamp))
  } else if (sortFactor === 'amount') {
    totalBalance = [...balanceState.items].sort((a, b) => (b.amount - a.amount))
  } else if (sortFactor === 'name') {
    totalBalance = [...balanceState.items].sort((a, b) => (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0)
  } else {
    totalBalance = [...balanceState.items]
  }

  const d = new Date()
  const deleteArr = (arr) => {
    arr.forEach(bal => {
      const index = totalBalance.indexOf(bal)
      totalBalance.splice(index, 1)
    });
  }

  const todayData = totalBalance.filter(bal => (
    (new Date(bal.timestamp).getDate() === d.getDate()) &&
    (new Date(bal.timestamp).getMonth() === d.getMonth()) &&
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(todayData)

  const yesterdayData = totalBalance.filter(bal => (
    (new Date(bal.timestamp).getDate() === d.getDate() - 1) &&
    (new Date(bal.timestamp).getMonth() === d.getMonth()) &&
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(yesterdayData)

  const thisWeekData = totalBalance.filter(bal => (
    (getNoOfWeek(bal.timestamp) === getNoOfWeek(d.getTime())) &&
    (new Date(bal.timestamp).getMonth() === d.getMonth()) &&
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(thisWeekData)

  const lastWeekData = totalBalance.filter(bal => (
    (getNoOfWeek(bal.timestamp) === getNoOfWeek(d.getTime()) - 1) &&
    (new Date(bal.timestamp).getMonth() === d.getMonth()) &&
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(lastWeekData)

  const thisMonthData = totalBalance.filter(bal => (
    (new Date(bal.timestamp).getMonth() === d.getMonth()) &&
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(thisMonthData)

  const lastMonthData = totalBalance.filter(bal => (
    (new Date(bal.timestamp).getMonth() === d.getMonth() - 1) &&
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(lastMonthData)

  const thisYearData = totalBalance.filter(bal => (
    (new Date(bal.timestamp).getFullYear() === d.getFullYear())
  ))
  deleteArr(thisYearData)

  const longAgoData = totalBalance

  const newSections = []
  if (todayData.length > 0) {
    newSections.push({ title: 'Today', data: todayData })
  }
  if (yesterdayData.length > 0) {
    newSections.push({ title: 'Yesterday', data: yesterdayData })
  }
  if (thisWeekData.length > 0) {
    newSections.push({ title: 'Earlier This Week', data: thisWeekData })
  }
  if (lastWeekData.length > 0) {
    newSections.push({ title: 'Last Week', data: lastWeekData })
  }
  if (thisMonthData.length > 0) {
    newSections.push({ title: 'Earlier This Month', data: thisMonthData })
  }
  if (lastMonthData.length > 0) {
    newSections.push({ title: 'Last Month', data: lastMonthData })
  }
  if (thisYearData.length > 0) {
    newSections.push({ title: 'Earlier This Year', data: thisYearData })
  }
  if (longAgoData.length > 0) {
    newSections.push({ title: 'Long Ago', data: longAgoData })
  }
  return { newBalance, newIncome, newExpenses, newSections }
}

export default getSectionData