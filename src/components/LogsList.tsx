import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const LogsList: React.FC = () => {
  const { page, error, loading, logs, limit, sortedKey, filterValue } = useTypedSelector((state) => state.logs);
  const { fetchLogs, setLogsPage, sortColumn, setFilter } = useActions();
  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchLogs(page, limit);
    const intervalTimer = setInterval(fetchLogs, 5000, page, limit);
    return () => {
      clearInterval(intervalTimer);
    };
  }, [page]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="logs-list">
        {loading && <div className="loader">Loading...</div>}
        <div className="logs-th logs-tr">
          {logs.length > 0 &&
            Object.keys(logs[0]).map((key, i) => (
              <div className={`th-${i}${sortedKey === key ? " sorted" : ""}`} onClick={() => sortColumn(key)} key={key}>
                {key}
                {key === "title" && (
                  <input
                    className="search"
                    value={filterValue || ""}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      setFilter(e.target.value || ""); // Set empty to remove the filter entirely
                    }}
                    placeholder={`Search`}
                  />
                )}
              </div>
            ))}
        </div>
        {logs.map((log) => (
          <div key={log.id} className="logs-tr">
            <div>{log.userId}</div>
            <div>{log.id}</div>
            <div>{log.title}</div>
            <div>{log.body}</div>
          </div>
        ))}
      </div>
      <div className={`pagination ${loading ? "loading" : ""}`}>
        {pages.map((p) => (
          <div className="pagination-button" key={p} onClick={() => setLogsPage(p)} style={{ border: p === page ? "2px solid green" : "1px solid gray", padding: 10 }}>
            {p}
          </div>
        ))}
      </div>
    </>
  );
};

export default LogsList;
