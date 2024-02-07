import Form from "./Form";
import Table from "./Table";
import React, { useEffect, useState } from "react";
import axios from "axios";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  async function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    try {
      console.log(characters[index])
      const response = await axios.delete(`http://localhost:8000/users/${characters[index].id}`);
    } catch (err) {
      console.log(err);
    }
    setCharacters(updated);
  }
  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:8000/users");
      return response.data.users_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:8000/users", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
    });
  }
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
