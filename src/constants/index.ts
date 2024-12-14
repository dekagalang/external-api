export interface ProvinceSchema {
  province_id: number;
  province: string;
}
export interface ProvinceRes {
  results: ProvinceSchema[];
}
export interface Province {
  rajaongkir: ProvinceRes;
}
export interface CitySchema {
  city_id: number;
  province_id: number;
  province: string;
  type: string;
  city_name: string;
  postal_code: number;
}
export interface CityRes {
  results: CitySchema[];
}
export interface City {
  rajaongkir: CityRes;
}