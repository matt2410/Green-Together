import { Parameter } from "./AQLocation";

export interface MeasurementValue {
  value: number;
  flagInfo: FlagInfo;
  parameter: Parameter;
  period: Period;
  coordinates: Coordinates | null;
  summary: Summary;
  coverage: Coverage;
}

export interface FlagInfo {
  hasFlags: boolean;
}

export interface Period {
  label: string;
  interval: string;
  datetimeFrom: DateInfo;
  datetimeTo: DateInfo;
}

export interface DateInfo {
  utc: string;
  local: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Summary {
  min: number;
  q02: number;
  q25: number;
  median: number;
  q75: number;
  q98: number;
  max: number;
  avg: number;
  sd: number;
}

export interface Coverage {
  expectedCount: number;
  expectedInterval: string;
  observedCount: number;
  observedInterval: string;
  percentComplete: number;
  percentCoverage: number;
  datetimeFrom: DateInfo;
  datetimeTo: DateInfo;
}
