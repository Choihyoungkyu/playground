import React from 'react';
import { FaSnowflake, FaSun } from 'react-icons/fa6';
import {
  BsCloudMoonFill,
  BsCloudSunFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudsFill,
  BsMoonStarsFill,
} from 'react-icons/bs';
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

  // 하늘 상태(SKY)
  const getSkyState = (SKY: string): string => {
    if (SKY === '1') {
      return '맑음';
    } else if (SKY === '3') {
      return '구름 많음';
    } else {
      return '흐림';
    }
  };

  // 강수 형태(PTY)
  const getRainState = (PTY: string, SKY: string): string => {
    if (PTY === '0') {
      return getSkyState(SKY);
    } else if (PTY === '1') {
      return '비';
    } else if (PTY === '2') {
      return '비/눈';
    } else {
      return '눈';
    }
  };

  // 날씨 아이콘 변경 함수
  const getSkyIcon = (s: string, time: string) => {
    if (s === '맑음') {
      if (parseInt(time) < 7 || parseInt(time) > 19) {
        return <BsMoonStarsFill size="1.5rem" />;
      } else {
        return <FaSun />;
      }
    } else if (s === '구름 많음') {
      if (parseInt(time) < 7 || parseInt(time) > 19) {
        return <BsCloudMoonFill size="1.5rem" />;
      } else {
        return <BsCloudSunFill size="1.5rem" />;
      }
    } else if (s === '흐림') {
      return <BsFillCloudsFill size="1.5rem" />;
    } else if (s === '비') {
      return <BsFillCloudRainHeavyFill size="1.5rem" />;
    } else if (s === '비/눈' || s === '눈') {
      return <FaSnowflake size="1.5rem" />;
    }
  };

  return (
    <div className={style.wrap}>
      <div className={style.mainBoard}>
        <div className={style.region}>{props.location}</div>
        {weather.length > 0 ? (
          <>
            <div className={style.mainTemp}>{weather[0].category.T1H} ℃</div>
            <div className={style.sky}>
              {getRainState(weather[0].category.PTY, weather[0].category.SKY)}
            </div>
          </>
        ) : null}
      </div>
      {weather.length > 0 ? (
        <div className={style.weatherWarp}>
          {weather.map((data, index) => {
            return (
              <div key={index}>
                <div className={style.weatherList}>
                  <div className={style.time}>
                    {index === 0 ? '현재' : changeTime(data.fcstTime.substring(0, 2))}
                  </div>
                  {getSkyIcon(
                    getRainState(data.category.PTY, data.category.SKY),
                    data.fcstTime.substring(0, 2)
                  )}
                  <div className={style.temp}>{data.category.T1H} ℃</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
