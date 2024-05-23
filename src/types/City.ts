export type City = {
  name: string;
  region: string;
  desc: string;
};

export type SavedCity = {
  location: City;
  timestamp: Date;
};

export type CityLocation = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

// SaveCity action types
export enum SaveCityActionType {
  ADD,
  REMOVE
}

// Save city action
export type SaveCityAction = {
  type: SaveCityActionType;
  data: City;
};
