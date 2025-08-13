// src/components/TaskList.js
import React, { useState, useEffect, useCallback } from "react";
import { getTasks } from "../services/apiService"; // ✅ Correct import
import TaskFilters from "../components/TaskFilters";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "",
    page: 1,
    limit: 10
  });
  const [meta, setMeta] = useState({});

  // Convert filters to query string
  const buildQuery = useCallback((f) => {
    return Object.entries(f)
      .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
  }, []);

  // Fetch tasks with filters applied
  const fetchTasks = useCallback(async (f) => {
    setLoading(true);
    try {
      const query = buildQuery(f);
      const res = await getTasks(query); // ✅ Using service wrapper
      setTasks(res.items || res); // Support both { items: [] } or plain array
      setMeta(res.meta || { total: 0, page: f.page, limit: f.limit, pages: 1 });
    } catch (err) {
      console.error("Fetch tasks failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth";
      }
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  // Runs when filters change
  useEffect(() => {
    fetchTasks(filters);
  }, [fetchTasks, filters]);

  // Update filters from child component
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>

      <TaskFilters filters={filters} onChange={handleFilterChange} />

      {loading && <p>Loading...</p>}

      {!loading && tasks.length === 0 && <p>No tasks found.</p>}

      {!loading && tasks.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {meta.pages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({ length: meta.pages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    meta.page === i + 1 ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: i + 1 }))
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span className="page-link">{i + 1}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
