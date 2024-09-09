import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"; // Assuming UserCard is in the same folder

interface User {
  id: number;
  first: string;
  last: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  country: string;
  description: string;
}

const UserList: React.FC = () => {
  const [items, setItems] = useState<User[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("celebrity.json");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleToggle = (id: number) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      {items.map((celeb) => (
        <UserCard
          key={celeb.id}
          celeb={celeb}
          isActive={activeId === celeb.id}
          onToggle={() => handleToggle(celeb.id)}
          onDelete={handleDelete} // Passing the onDelete prop here
        />
      ))}
    </div>
  );
};

export default UserList;
