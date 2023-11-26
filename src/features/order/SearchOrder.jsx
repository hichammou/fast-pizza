import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order by id"
        className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 outline-none sm:w-64 sm:focus:w-72 transition-all"
      />
    </form>
  );
};

export default SearchOrder;
