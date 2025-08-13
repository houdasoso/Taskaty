import React, { useState } from 'react';

// TaskFilters lifts state up via onChange partial updates.
// initial props: { search, status, priority, sort, order, page, limit }
export default function TaskFilters({ filters = {}, onChange }) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');
  const [priority, setPriority] = useState(filters.priority || 'all');
  const [sort, setSort] = useState(filters.sort || 'createdAt');
  const [order, setOrder] = useState(filters.order || 'desc');
  const [limit, setLimit] = useState(filters.limit || 10);

  const apply = () => {
    onChange({ search, status, priority, sort, order, limit });
  };

  return (
    <div className="card card-body mb-3">
      <div className="row g-2 align-items-center">
        <div className="col-md-4">
          <input className="form-control" placeholder="Search title..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="col-auto">
          <select className="form-select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-auto">
          <select className="form-select" value={priority} onChange={e=>setPriority(e.target.value)}>
            <option value="all">All priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col-auto">
          <select className="form-select" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="createdAt">Created</option>
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="col-auto">
          <select className="form-select" value={order} onChange={e=>setOrder(e.target.value)}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
        <div className="col-auto">
          <select className="form-select" value={limit} onChange={e=>setLimit(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
