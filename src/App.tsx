import React, { useState, useEffect } from "react";
import SearchBar from "./components/Searchbar";
import UserList from "./components/UserList";

const App = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [filteredCelebs, setFilteredCelebs] = useState([]);

  useEffect(() => {
    fetch("/celebrities.json")
      .then((res) => res.json())
      .then((data) => {
        setCelebrities(data);
        setFilteredCelebs(data);
      });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = celebrities.filter((celeb) =>
      celeb.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCelebs(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <UserList celebrities={filteredCelebs} />
    </div>
  );
};

export default App;
