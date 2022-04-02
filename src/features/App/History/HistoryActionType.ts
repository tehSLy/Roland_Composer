export type HistoryActionPayloadMapping = {
  INSTRUMENT: string;
  MODE: string;
  VOLUME: number;
  AB: string;
  BPM: number;
};

export type HistoryActionType = keyof HistoryActionPayloadMapping;

export type HistoryAction = {
  [key in HistoryActionType]: {
    type: key;
    value: HistoryActionPayloadMapping[key];
  };
}[HistoryActionType];
