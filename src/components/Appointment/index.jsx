import React from 'react';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
const ERROR_INPUTS = 'ERROR_INPUTS';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);

    if (!interviewer || !name) {
      setTimeout(() => transition(ERROR_INPUTS, true), 1000);
    } else {
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }
  }

  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article data-testid='appointment' className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onConfirm={destroy}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={'Could not save appointment.'} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={'Could not delete appointment.'}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_INPUTS && (
        <Error
          message={'Name left blank or interviewer unselected.'}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
