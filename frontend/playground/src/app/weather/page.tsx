'use client';

import React, { useState } from 'react';
import style from '@/styles/weather.module.css';
import Card from '@/components/Card/Card';
import InputBox from '@/components/InputBox/InputBox';

const weather = () => {
  const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY;

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
    if (now.getHours() < 10) {
      time += '0' + now.getHours().toString();
    } else {
      time += now.getHours().toString();
    }
    if (now.getMinutes() < 10) {
      time += '0' + now.getMinutes().toString();
    } else {
      time += now.getMinutes().toString();
    }
    return time;
  };

  // 매개변수
  const params = {
    numOfRows: 10,
    pageNo: 1,
    dataType: 'JSON',
    base_date: getDate(),
    base_time: getTime(),
    nx: 102,
    ny: 84,
  };

  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    const url =
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&` +
      query;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.response);
      console.log(await data.response.body.items);
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
  };

  fetchData();

  return (
    <div className={style.wrap}>
      <InputBox />
      <Card />
    </div>
  );
};

export default weather;
