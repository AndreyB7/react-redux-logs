export interface LogsState {
  logs: any[];
  serverSideLogsData: any[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
  sortedKey: string;
  filterValue: string;
}

export enum LogsActionTypes {
  FETCH_LOGS = "FETCH_LOGS",
  FETCH_LOGS_SUCCESS = "FETCH_LOGS_SUCCESS",
  FETCH_LOGS_ERROR = "FETCH_LOGS_ERROR",
  SET_LOGS_PAGE = "SET_LOGS_PAGE",
  SORT_LOGS_COL = "SORT_LOGS_COL",
  FILTER_LOGS = "FILTER_LOGS",
}
interface FetchLogsAction {
  type: LogsActionTypes.FETCH_LOGS;
}
interface FetchLogsSuccessAction {
  type: LogsActionTypes.FETCH_LOGS_SUCCESS;
  payload: any[];
}
interface FetchLogsErrorAction {
  type: LogsActionTypes.FETCH_LOGS_ERROR;
  payload: string;
}
interface SetLogsPage {
  type: LogsActionTypes.SET_LOGS_PAGE;
  payload: number;
}
interface SortLogsCol {
  type: LogsActionTypes.SORT_LOGS_COL;
  payload:string;
}

interface FilterLogs {
  type: LogsActionTypes.FILTER_LOGS;
  payload: string;
}



export type LogsAction = FetchLogsAction | FetchLogsSuccessAction | FetchLogsErrorAction | SetLogsPage | SortLogsCol | FilterLogs;
