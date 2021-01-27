// Return an array of appointment for the specified day
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
}

// Return an array of interviewers for the specified day
export function getInterviewersForDay(state, day) {
  const interviewersArr = state.days.filter(x => x.name === day);

  if (interviewersArr.length === 0) {
    return [];
  }

  const interviewers = interviewersArr[0].interviewers;

  return Object.keys(state.interviewers)
    .filter(key => interviewers.includes(Number(key)))
    .reduce((arr, key) => {
      arr.push(state.interviewers[key]);
      return arr;
    }, []);
}

// Returns parsed interview object from the state
export function getInterview(state, interview) {
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
