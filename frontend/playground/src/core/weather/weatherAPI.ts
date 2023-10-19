import { GetWeatherList } from './weatherType';

export const getWeatherList = async (requestData: GetWeatherList): Promise<Object[]> => {
  const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY;
  const query = Object.keys(requestData)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(requestData[k]))
    .join('&');
  const url =
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&` +
    query;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const res = await data.response.body.items;
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    return;
  }
};
