import React from 'react';
import classNames from 'classnames/bind';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const name = props.name;
  const spots = props.spots;

  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': spots === 0,
  });

  const formatSpots = () => {
    let returnStr = '';
    returnStr += spots || 'no';
    returnStr += spots === 1 ? ' spot remaining' : ' spots remaining';
    return returnStr;
  };

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  );
}
