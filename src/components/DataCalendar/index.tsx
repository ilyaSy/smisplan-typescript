import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Col, Modal, Row, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { Calendar } from '../UI/Calendar';
import LoadingComponent from '../UI/LoadingComponent';
import { useGetDataMeta } from '../../utils/hooks/useGetDataMeta';
import sortData from '../../utils/sortData';
import { TData } from '../../types/TData';
import { DATE_FORMAT_DATE, DATE_FORMAT_FULLDATE, DATE_FORMAT_TIME } from '../../constants/constants';
import classes from './DataCalendar.module.scss';
import ModalWithList from '../UI/ModalWithList';

moment.locale('ru');

interface IDataCalendar {
  mode: string,
}

const DataCalendar: React.FC<IDataCalendar> = ({ mode }) => {
  const [dates, setDates] = useState<TData[]>([]);
  const {
    data, isErrorData, isLoadingData,
    isLoadingMetadata, isErrorMetadata
  } = useGetDataMeta(mode);

  useEffect(() => {
    if (data && data.length) {
      setDates(data.map((d) => ({
        ...d,
        date: new Date(`${d.date} ${d.time}`),
      })))
    }
  }, [data]);

  const getDayEventsInfo = (date: any) => {
    return dates
      .filter((event) => moment(event.date).format(DATE_FORMAT_DATE) === date.dateStr)
      .sort(sortData('time', 'ascend'))
      .map((event) => ({
        title: moment(event.date).format(DATE_FORMAT_TIME),
        description: event.result,
      }))
    }

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
        d.title === event.event.title
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
    )
  };

  const handleEventClick = (event: any) => {
    Modal.info({
      title: 'Совещаниe',
      content: getDetailedEventInfo(event),
      width: '600px'
    });
  };

  return (
    isLoadingData || isLoadingMetadata ? (
      <div className={classes.center}>
        <LoadingComponent />
      </div>
    ) : (
      (isErrorData || isErrorMetadata) && !dates ? (
        <div className={classes.center}>
          <Typography.Title level={3}>Ошибка получения данных</Typography.Title>
        </div>
      ) : (
        dates &&
          <Calendar
            dates={dates}
            handleEventClick={handleEventClick}
            handleDayClick={handleDayClick}
          />
      )
    )
  )
}

export default DataCalendar;
