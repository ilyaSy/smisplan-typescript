import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import moment from 'moment';

import { TData } from 'interfaces';
import { DATE_FORMAT_DATE, DATE_FORMAT_FULLDATE, DATE_FORMAT_TIME } from 'consts';
import { sortData } from 'utils';
import { useGetData } from 'hooks';
import { LoadingComponent } from 'components/UI/LoadingComponent';
import { ModalWithList } from 'components/UI/ModalWithList';
import { Calendar } from 'components/UI/Calendar';

import classes from './index.module.scss';

interface IDataCalendar {
  mode: string,
}

const Component: React.FC<IDataCalendar> = ({ mode }) => {
  const [dates, setDates] = useState<TData[]>([]);
  const { data, isError, isLoading } = useGetData(mode);

  useEffect(() => {
    if (data && data.length) {
      setDates(data.map((d) => ({
        ...d,
        date: new Date(`${d.date} ${d.time}`),
      })));
    }
  }, [data]);

  const getDayEventsInfo = (date: any) => dates
    .filter((event) => moment(event.date).format(DATE_FORMAT_DATE) === date.dateStr)
    .sort(sortData('time', 'ascend'))
    .map((event) => ({
      title: moment(event.date).format(DATE_FORMAT_TIME),
      description: event.result,
    }));

  const handleDayClick = (day: any) => {
    ModalWithList({
      title: 'Совещания за день',
      avatar: <BulbOutlined />,
      dataSource: getDayEventsInfo(day),
      noDataText: 'Нет назначенных совещаний',
    });
  };

  const getDetailedEventInfo = (event: any) => {
    const eventInfo = dates.find(
      (d) =>
        moment(event.event.start).toISOString() === moment(d.date).toISOString() &&
        d.title === event.event.title,
    );

    return (
      eventInfo ? (
        <>
          <Row className={classes['detailed-event-info-row']}>
            <Col className={classes['detailed-event-info-headcol']}>Тема</Col>
            <Col className={classes['detailed-event-info-col']}>{eventInfo.title}</Col>
          </Row>
          <Row className={classes['detailed-event-info-row']}>
            <Col className={classes['detailed-event-info-headcol']}>Ответственный</Col>
            <Col className={classes['detailed-event-info-col']}>{eventInfo.responsible}</Col>
          </Row>
          <Row className={classes['detailed-event-info-row']}>
            <Col className={classes['detailed-event-info-headcol']}>Участники</Col>
            <Col className={classes['detailed-event-info-col']}>{eventInfo.participants}</Col>
          </Row>
          <Row className={classes['detailed-event-info-row']}>
            <Col className={classes['detailed-event-info-headcol']}>Дата</Col>
            <Col className={classes['detailed-event-info-col']}>
              {moment(eventInfo.date).format(DATE_FORMAT_FULLDATE)}
            </Col>
          </Row>
          <Row className={classes['detailed-event-info-row']}>
            <Col className={classes['detailed-event-info-headcol']}>Время</Col>
            <Col className={classes['detailed-event-info-col']}>
              {moment(eventInfo.date).format(DATE_FORMAT_TIME)}
            </Col>
          </Row>
        </>
      ) : 'Нет назначенных совещаний'
    );
  };

  const handleEventClick = (event: any) => {
    Modal.info({
      title: 'Совещаниe',
      content: getDetailedEventInfo(event),
      width: '600px',
    });
  };

  return (
    <>
      {isLoading &&
        <div className={classes.center}>
          <LoadingComponent />
        </div>
      }

      {(isError && !dates) &&
        <div className={classes.center}>
          <Typography.Title level={3}>Ошибка получения данных</Typography.Title>
        </div>
      }

      {dates &&
        <Calendar
          dates={dates}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
        />}
    </>
  );
};

export { Component as Calendar };
