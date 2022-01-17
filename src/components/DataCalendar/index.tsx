import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Col, List, Modal, Row, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { Calendar } from '../UI/Calendar';
import LoadingComponent from '../UI/LoadingComponent';
import { useGetDataMeta } from '../../utils/hooks/useGetDataMeta';
import sortData from '../../utils/sortData';
import { TData } from '../../types/TData';
import { DATE_FORMAT_DATE, DATE_FORMAT_FULLDATE, DATE_FORMAT_TIME } from '../../constants/constants';
import classes from './DataCalendar.module.scss';

moment.locale('ru');

interface IDataCalendar {
}

const DataCalendar: React.FC<IDataCalendar> = () => {
  const [dates, setDates] = useState<TData[]>([]);
  const {
    data, isErrorData, isLoadingData,
    isLoadingMetadata, isErrorMetadata
  } = useGetDataMeta('discussion');

  useEffect(() => {
    if (data && data.length) {
      setDates(data.map((d) => ({
        ...d,
        date: new Date(`${d.date} ${d.time}`),
      })))
    }
  }, [data]);

  const getDayEventsInfo = (date: any) => {
    const dayEvents = dates
      .filter((event) => moment(event.date).format(DATE_FORMAT_DATE) === date.dateStr)
      .sort(sortData('time', 'asc'))
      .map((event) => ({
        title: moment(event.date).format(DATE_FORMAT_TIME),
        description: event.result,
      }))

    return (
      dayEvents.length ? (
        <List
          dataSource={dayEvents}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<BulbOutlined />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      ) : 'Нет назначенных совещаний'
    );
  };

  const handleDayClick = (day: any) => {
    Modal.info({
      title: 'Совещания за день',
      content: getDayEventsInfo(day)
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
