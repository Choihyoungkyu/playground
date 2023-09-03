import React from 'react';
import style from '@/styles/weather.module.css';
import Card from '@/components/Card/Card';
import InputBox from '@/components/InputBox/InputBox';

const weather = async () => {
  const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY;
  const params = {
    numOfRows: 10,
    pageNo: 1,
    dataType: 'JSON',
    base_date: '20230825',
    base_time: '0800',
    nx: 102,
    ny: 84,
  };
  const query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  const url =
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&` +
    query;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.response.body.items);
  } catch (err) {
    console.error('Error fetching weather data:', err);
  }

  return (
    <div className={style.wrap}>
      <InputBox />
      <Card />
    </div>
  );
};

export default weather;
