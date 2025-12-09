export interface Parameter {
  id: number;
  name: string;
  units: string;
  displayName: string;
}

export interface Sensor {
  id: number;
  name: string;
  parameter: Parameter;
  coordinates: {
    latitude: number;
    longitude: number;
  }
}

export interface AQLocation {
  id: number;
  name: string;
  locality: string;
  timezone: string;
  country: {
    id: number;
    code: string;
    name: string;
  };
  owner: {
    id: number;
    name: string;
  };
  provider: {
    id: number;
    name: string;
  };
  isMobile: boolean;
  isMonitor: boolean;
  instruments: {
    id: number;
    name: string;
  }[];
  sensors: Sensor[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  licenses: string | null;
  bounds: number[];
  distance: number | null;
  datetimeFirst: {
    utc: string;
    local: string;
  };
  datetimeLast: {
    utc: string;
    local: string;
  };
}
