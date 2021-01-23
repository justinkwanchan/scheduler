import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // const spots = Object.values(state.appointments).map(appointment => appointment.interview);
  // const xArr = [0, 0, 0, 0, 0];
  // for (let i = 0; i < spots.length; i++) {
  //   if (i >= 0 && i <= 4 && !spots[i]) xArr[0]++;
  //   if (i >= 5 && i <= 9 && !spots[i]) xArr[1]++;
  //   if (i >= 10 && i <= 14 && !spots[i]) xArr[2]++;
  //   if (i >= 15 && i <= 19 && !spots[i]) xArr[3]++;
  //   if (i >= 20 && i <= 24 && !spots[i]) xArr[4]++;
  // }
  
  const setDay = day => setState({ ...state, day });
  
  // Load information from database on pageload
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // On click of the Save button in form
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = state.days;
    const day = Math.floor((id - 1) / 5) + 1;
    console.log(day);
    
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState(prev => ({
        ...prev,
        appointments
      }));
    });
  };

  // On click of the Confirm button Delete confirmation
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState(prev => ({
        ...prev,
        appointments
      }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};