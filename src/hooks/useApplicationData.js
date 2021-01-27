import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  // Load information from database on page load
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  /**
   * Return a 'days' object to update the state with number of spots remaining
   * Create: spots - 1, Edit: spots, Delete: spots + 1
   */
  const dayBuffer = (id, remove = false) => {
    const daysBuffer = [...state.days];

    if (!state.appointments[id].interview || remove) {
      const day = Math.floor((id - 1) / 5);
      const spots = state.days[day].spots;
      const modifier = remove ? 1 : -1;
      daysBuffer[day] = { ...state.days[day], spots: spots + 1 * modifier };
    }

    return daysBuffer;
  };

  // On click of the Save button in form
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const daysBuffer = dayBuffer(id);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState(prev => ({
        ...prev,
        appointments,
        days: daysBuffer,
      }));
    });
  }

  // On click of the Confirm button in the Delete confirmation panel
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const daysBuffer = dayBuffer(id, true);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState(prev => ({
        ...prev,
        appointments,
        days: daysBuffer,
      }));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
