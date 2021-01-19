import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem'
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  const parsedInterviewerItems = props.interviewers.map(interviewer => {
    return <InterviewerListItem
      key={interviewer.interviewer}
      {...interviewer}
      setInterviewer={props.setInterviewer}
      selected={props.interviewer === interviewer.id}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerItems}
      </ul>
    </section>
  );
};