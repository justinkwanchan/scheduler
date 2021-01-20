export function getAppointmentsForDay(state, day) {
  const appointmentsArr = state.days.filter(x => x.name === day);
  if (appointmentsArr.length === 0) {
    return [];
  }
  const appointments = appointmentsArr[0].appointments;
  return Object.keys(state.appointments)
    .filter(key => appointments.includes(Number(key)))
    .reduce((arr, key) => {
      arr.push(state.appointments[key]);
      return arr;
    }, []);
};