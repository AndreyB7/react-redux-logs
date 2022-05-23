import {LogsAction, LogsActionTypes, LogsState} from "../../types/logs";

const initialState: LogsState = {
    logs: [],
    serverSideLogsData: [],
    page: 1,
    error: null,
    limit: 7,
    loading: false,
    sortedKey: '',
    filterValue: '',
}

export const logsReducer = (state = initialState, action: LogsAction): LogsState => {
    switch (action.type) {
        case LogsActionTypes.FETCH_LOGS:
            return {...state, loading: true}
        case LogsActionTypes.FETCH_LOGS_SUCCESS:
            let serverSideLogsData = action.payload;
            let logs = action.payload;
            if (state.sortedKey) {
                logs = sortLogsByColumnKey(serverSideLogsData, state.sortedKey)
            }
            if (state.filterValue) {
                logs = filterLogsColumn(serverSideLogsData, state.filterValue);
            }
            return {...state, loading: false, logs: logs, serverSideLogsData: serverSideLogsData}
        case LogsActionTypes.FETCH_LOGS_ERROR:
            return {...state, loading: false, error: action.payload}
        case LogsActionTypes.SET_LOGS_PAGE:
            return {...state, page: action.payload}
        case LogsActionTypes.SORT_LOGS_COL:
            return {...state, sortedKey: action.payload, logs: sortLogsByColumnKey(state.serverSideLogsData, action.payload)}
        case LogsActionTypes.FILTER_LOGS:
            return {...state, filterValue: action.payload, logs: filterLogsColumn(state.serverSideLogsData, action.payload)}
        default:
            return state
    }
}

const sortLogsByColumnKey = (logs: any[], key: string) => {
    logs.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    return logs;
}

const filterLogsColumn = (logs: any[], filterValue: string) => {
    const filteredlogs = logs.filter(log => {
        return (log.title.search(filterValue) >= 0);
    });
    // nothing found message
    if (filteredlogs.length === 0) {
        filteredlogs[0] = {};
        Object.keys(logs[0]).forEach(key => {
            filteredlogs[0][key] = '';
            if (key === 'title') {
                filteredlogs[0][key] = 'nothing found';
            }
        })
    }
    return filteredlogs;
}