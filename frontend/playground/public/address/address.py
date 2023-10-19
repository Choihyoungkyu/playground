import pandas as pd
import math
import json
import os

'''
csv 확장자의 파일을 불러올 경우 파일 경로 입력 시 directory 구문은 OS마다 다름
    1) Window OS: 원화 기호(₩, i.e., 역슬래시(\)
    2) Mac OS: 슬래시(/)
'''

class Get_json:
    # 튜플로 묶는 함수 정의
    def tuple_row(self, row):
        return tuple(row)

    # 데이터 가져오는 함수 정의
    def get_data(self):
        # dataset1 이라는 변수에 해당 파일을 저장
        dataset = pd.read_csv('public/address/address_list.csv', index_col=0)   # 옵션: 인덱스 칼럼 제외

        # 각 행을 튜플로 묶어내기
        data_tuple_set = dataset[['1단계', '2단계', '3단계', '격자 X', '격자 Y']].apply(self.tuple_row, axis=1)

        return data_tuple_set

    # 주소별 위치값 저장 함수 정의
    def get_address(self):
        address_dic = {}
        data_tuple_set = self.get_data()
        for data_tuple in data_tuple_set:
            adr1, adr2, adr3, x, y = data_tuple

            address = adr1

            try:
                if math.isnan(adr2):
                    pass
            except:
                    address += ' ' + adr2
            try:
                if math.isnan(adr3):
                    pass
            except:
                address += ' ' + adr3

            address_dic[address] = (x, y)
        return address_dic

    # json 파일로 추출 함수 정의
    def get_json_file(self):
        address_dic = self.get_address()

        # 현재 파이썬 파일의 디렉토리 경로 가져오기
        current_directory = os.path.dirname(os.path.abspath(__file__))

        # JSON 파일 경로 조합
        json_file_path = os.path.join(current_directory, "address_info.json")

        # JSON 파일로 추출(encoding="utf-8" : 한글이 깨지는 현상 방지)
        with open(json_file_path, "w", encoding="utf-8") as json_file:
            json.dump(address_dic, json_file, ensure_ascii=False)

get_json_instance = Get_json()
get_json_instance.get_json_file()