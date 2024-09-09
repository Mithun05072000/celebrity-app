import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const results = users.filter((user) => {
      const first = user.first?.toLowerCase() || "";
      const last = user.last?.toLowerCase() || "";
      return first.includes(lowercasedQuery) || last.includes(lowercasedQuery);
    });
    setFilteredUsers(results);
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>List View</h1>

      <div style={searchContainerStyle}>
        <i className="fas fa-search" style={searchIconStyle}></i>
        <input
          type="text"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);
            handleSearch(query);
          }}
          style={inputStyle}
        />
      </div>

      <div>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            celeb={user}
            isActive={false}
            onToggle={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

const searchContainerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const searchIconStyle = {
  position: "absolute",
  left: "10px",
  fontSize: "1.2rem",
  color: "#888",
};

const inputStyle = {
  width: "500px",
  padding: "10px 10px 10px 35px",
  fontSize: "1rem",
  borderRadius: "25px",
  border: "1px solid #ddd",
  outline: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

export default SearchBar;
