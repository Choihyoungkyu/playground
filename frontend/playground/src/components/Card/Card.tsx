import React from 'react';
import style from './Card.module.css';

interface PropsType {
  location: string;
  weatherData: WeatherType[] | null;
}

interface WeatherType {
  baseDate: string;
  baseTime: string;
  category: string | ValueType;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

interface DetailWeatherType extends Omit<WeatherType, 'fcstValue'> {
  category: ValueType;
}

interface ValueType {
  LGT?: string;
  PTY?: string;
  RN1?: string;
  SKY?: string;
  T1H?: string;
  REH?: string;
  UUU?: string;
  VVV?: string;
  VEC?: string;
  WSD?: string;
}

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

const Card = (props: PropsType) => {
  let weather: DetailWeatherType[] = [];
  if (props.weatherData !== null) {
    for (let i = 0; i < 6; i++) {
      const tmp: DetailWeatherType = {
        baseDate: props.weatherData[i].baseDate,
        baseTime: props.weatherData[i].baseTime,
        category: {
          [props.weatherData[i].category as string]: props.weatherData[i].fcstValue,
          [props.weatherData[i + 6].category as string]: props.weatherData[i + 6].fcstValue,
          [props.weatherData[i + 12].category as string]: props.weatherData[i + 12].fcstValue,
          [props.weatherData[i + 18].category as string]: props.weatherData[i + 18].fcstValue,
          [props.weatherData[i + 24].category as string]: props.weatherData[i + 24].fcstValue,
          [props.weatherData[i + 30].category as string]: props.weatherData[i + 30].fcstValue,
        },
        fcstDate: props.weatherData[i].fcstDate,
        fcstTime: props.weatherData[i].fcstTime,
        nx: props.weatherData[i].nx,
        ny: props.weatherData[i].ny,
      };
      weather.push(tmp);
    }
    console.log(weather);
  }

  const changeTime = (time: string) => {
    const hour = time.substring(0, 2);
    let change = '';
    if (parseInt(hour) === 0) {
      change += '오전 12';
    } else if (parseInt(hour) < 12) {
      change += '오전 ' + parseInt(hour).toString();
    } else if (parseInt(hour) === 12) {
      change += '오후 12';
    } else {
      change += '오후 ' + (parseInt(hour) - 12).toString();
    }
    change += '시';
    return change;
  };

  return (
    <div className={style.wrap}>
      <div className={style.region}>{props.location}</div>
      <div className={style.weatherWarp}>
        {weather.map((data, index) => {
          return (
            <div key={index}>
              <div className={style.weatherList}>
                <div id="time">{changeTime(data.fcstTime.substring(0, 2))}</div>
                <div className={style.temp}>{data.category.T1H} ℃</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
