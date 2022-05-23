import {Dispatch} from "redux";
import axios from "axios";
import {LogsAction, LogsActionTypes, LogsState} from "../../types/logs";

export const fetchLogs = (page = 1, limit = 10) => {
    return async (dispatch: Dispatch<LogsAction>) => {
        try {
            dispatch({type: LogsActionTypes.FETCH_LOGS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {_page: page, _limit: limit}
            })
            setTimeout(() => {
                dispatch({type: LogsActionTypes.FETCH_LOGS_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: LogsActionTypes.FETCH_LOGS_ERROR,
                payload: 'Loading Error'
            })
        }
    }
}
export function setLogsPage(page: number): LogsAction {
    return {type: LogsActionTypes.SET_LOGS_PAGE, payload: page}
}

export function sortColumn(key: string): LogsAction {
    return {type: LogsActionTypes.SORT_LOGS_COL, payload: key}
}

export function setFilter(filter: LogsState['filter']): LogsAction {
    return {type: LogsActionTypes.FILTER_LOGS, payload: filter}
}