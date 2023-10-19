import { GetWeatherList } from './weatherType';

export const getAddressList = (requestData: { keyword: string }) => {
  const data = require(`../../../public/address/address_info.json`);
  const pattern = requestData.keyword;
  if (pattern.trim() === '') {
    return { result: 'Fail' };
  }
  let matches = [];
  for (const adr in data) {
    if (adr.match(pattern)) {
      matches.push(adr);
    }
  }
  return { result: 'Success', data: matches };
};

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
