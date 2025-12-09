export interface OpenAQLocationResponse {
  meta: {
    name: string;
    website: string;
    page: number;
    limit: number;
    found: string | number;
  };
  results: OpenAQLocation[];
}

export interface OpenAQLocation {
  id: number;
  name: string;
  locality: string | null;
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
  sensors: {
    id: number;
    name: string;
    parameter: {
      id: number;
      name: string;
      units: string;
      displayName: string;
    };
  }[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  datetimeFirst: string | null;
  datetimeLast: string | null;
}
