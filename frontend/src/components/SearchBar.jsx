function SearchBar({
  search,
  setSearch
}) {
  return (
    <input
      type="text"
      placeholder="Search location"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        padding: "10px",
        width: "300px"
      }}
    />
  );
}

export default SearchBar;