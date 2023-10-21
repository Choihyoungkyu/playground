import { GetWeatherList } from './weatherType';

// 주소 얻기
export const getAddressList = (requestData: { keyword: string }) => {
  const data = require(`../../../public/address/address_info.json`);
  const pattern = requestData.keyword;
  if (pattern.trim() === '') {
    return { result: 'Fail' };
  }
  let matches = {};
  for (const adr in data) {
    if (adr.match(pattern)) {
      matches[adr] = data[adr];
    }
  }
  return { result: 'Success', data: matches };
};

// 날씨 API 요청
export const getWeatherList = async (requestData: GetWeatherList) => {
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
    console.log(requestData);
    console.log(data);
    const res = await data.response.body.items;
    return { result: 'success', data: res };
  } catch (err) {
    console.error(err);
    return { result: 'fail' };
  }
};
