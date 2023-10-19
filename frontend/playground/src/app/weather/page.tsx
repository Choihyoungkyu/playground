'use client';

import React, { useState } from 'react';
import style from '@/styles/weather.module.css';
import Card from '@/components/Card/Card';
import InputBox from '@/components/InputBox/InputBox';
import { getWeatherList } from '@/core/weather/weatherAPI';

const weather = () => {
  // 기준 날짜 구하기
  const getDate = () => {
    const now = new Date();
    let date = '';
    date += now.getFullYear();
    if (now.getMonth() < 9) {
      date += '0' + (now.getMonth() + 1).toString();
    } else {
      date += (now.getMonth() + 1).toString();
    }
    date += now.getDate();
    return date;
  };

  // 기준 시간 구하기
  const getTime = () => {
    const now = new Date();
    let time = '';
    let tmpTime = now.getHours() - 1 >= 0 ? now.getHours() - 1 : now.getHours() + 23;
    if (tmpTime < 10) {
      time = '0' + tmpTime.toString() + time;
    } else {
      time = tmpTime.toString() + time;
    }
    if (now.getMinutes() < 30) {
      time += '00';
    } else {
      time += '30';
    }
    return time;
  };

  // 매개변수
  const params = {
    numOfRows: 6,
    pageNo: 1,
    dataType: 'JSON',
    base_date: getDate(),
    base_time: getTime(),
    nx: 90,
    ny: 77,
  };

  const [weatherData, setWeatherData] = useState<Object[]>(null);

  getWeatherList(params);

  return (
    <div className={style.wrap}>
      <InputBox />
      <Card />
    </div>
  );
};

export default weather;
