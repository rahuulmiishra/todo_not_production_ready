import "./style.css";

function Filter({ onFilter }) {
  function handleFilterClick(filter) {
    return () => {
      onFilter(filter);
    };
  }

  return (
    <div className="filter-app">
      <button onClick={handleFilterClick("completed")}>Show Completed</button>
      <button onClick={handleFilterClick("pending")}>Show Pending</button>
    </div>
  );
}

export default Filter;
