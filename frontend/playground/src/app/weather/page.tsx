'use client';

import React, { useEffect, useState } from 'react';
import style from '@/styles/weather.module.css';
import Card from '@/components/Card/Card';
import { getAddressList, getWeatherList } from '@/core/weather/weatherAPI';
import useDebounce from '@/hooks/useDebounce';
import PageHeader from '@/components/PageHeader/PageHeader';

interface weatherType {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

const weather = () => {
  const [weatherData, setWeatherData] = useState<weatherType[]>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('위치');
  const [searchList, setSearchList] = useState<Object>({});
  const debounceKeyword = useDebounce(keyword);

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

  // 검색창 로직
  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 리스트
  const handleSearch = () => {
    const requestData = {
      keyword: debounceKeyword,
    };
    const data = getAddressList(requestData);
    if (data.result === 'Success') {
      setSearchList(data.data);
    } else {
      setSearchList({});
    }
  };

  /*
   * LGT : 낙뢰(kA)
   * PTY : 강수형태(코드값)
   * RN1 : 1시간 강수량(범주: 1mm)
   * SKY : 하늘상태(코드값)
   * T1H : 기온(℃)
   * REH : 습도(%)
   * UUU : 동서바람성분(m/s)
   * VVV : 남북바람성분(m/s)
   * VEC : 풍향(deg)
   * WSD : 풍속(m/s)
   */
  // 날씨 검색
  const handleGetAdr = async (e) => {
    // 매개변수
    const params = {
      numOfRows: 60,
      pageNo: 1,
      dataType: 'JSON',
      base_date: getDate(),
      base_time: getTime(),
      nx: searchList[e.target.innerText][0],
      ny: searchList[e.target.innerText][1],
    };
    // 날씨 요청 함수
    const data = await getWeatherList(params);
    if (data.result === 'success') {
      setWeatherData(data.data.item);
      setLocation(e.target.innerText);
      setKeyword('');
    } else {
      setWeatherData(null);
      setLocation('위치');
    }
    setSearchList({});
  };

  useEffect(() => {
    handleSearch();
  }, [debounceKeyword]);

  return (
    <>
      <PageHeader title="Weather" />
      <div className={style.wrap}>
        <input value={keyword} onChange={handleInput} placeholder="위치를 입력하세요." />
        {Object.keys(searchList).length > 0 ? (
          <ul className={style.searchList}>
            {Object.keys(searchList).map((adr, idx) => {
              return (
                <li className={style.adr} key={adr} tabIndex={idx} onClick={handleGetAdr}>
                  {adr}
                </li>
              );
            })}
          </ul>
        ) : null}
        <Card location={location} weatherData={weatherData} />
      </div>
    </>
  );
};

export default weather;
