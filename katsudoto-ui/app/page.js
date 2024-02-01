'use client'
import { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import axios from 'axios';
import CreateForm from './methode/create';
// import { useRouter } from 'next/router';
// import EditForm from './update';
const Home = () => {
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [data, setData] = useState([]);
  let [color, setColor] = useState("#aabbcc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti URL sesuai dengan endpoint API lokal Anda
        const response = await fetch('http://localhost:8000/');
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // const data = { id};

    try {
      const response = await axios.post("http://localhost:8000/", {nim,nama}, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"

          // Accept: "application/json", // Use "Accept: application/json"
        },
      });

      if (response.status === 200) {
        const result = response.data;
      } else {
        // Handle error responses (e.g., display an error message)
        console.error("Error fetching sentiment:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error:", error);
    }
    
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    // const data = { id};

    try {
      const response = await axios.put(`http://localhost:8000/${id}`, {id,nim,nama}, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"

          // Accept: "application/json", // Use "Accept: application/json"
        },
      });

      if (response.status === 200) {
        const result = response.data;
      } else {
        // Handle error responses (e.g., display an error message)
        console.error("Error fetching sentiment:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error:", error);
    }
  };
  const onDelete = async (e) => {
    e.preventDefault();
    // const data = { id};

    try {
      const response = await axios.delete(`http://localhost:8000/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"

          // Accept: "application/json", // Use "Accept: application/json"
        },
      });

      if (response.status === 200) {
        const result = response.data;
      } else {
        // Handle error responses (e.g., display an error message)
        console.error("Error fetching sentiment:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HexColorPicker color={color} onChange={setColor} />
      <div>

        <h1 style={color = { color }} >Data from Localhost:8000</h1>
        <p>{JSON.stringify(data)}</p>
      </div>
      {/* post */}

      <form onSubmit={onSubmit}>
        {/* Render form fields */}
        <label>
          nim:
          <input type="text" name="nim" value={nim} onChange={(e)=>setNim(e.target.value)} />
        </label>
        <label>
          nama:
          <input type="text" name="nama" value={nama} onChange={(e)=>setNama(e.target.value)} />
        </label>
        {/* Add more fields as needed */}
        <br />
        <button type="submit">Create</button>
      </form>

    {/* put */}

      <form onSubmit={onUpdate}>
        {/* Render form fields */}
        <label>
          id:
          <input type="text" name="id" value={id} onChange={(e)=>setId(Number(e.target.value))} />
        </label>
        <label>
          nim:
          <input type="text" name="nim" value={nim} onChange={(e)=>setNim(e.target.value)} />
        </label>
        <label>
          nama:
          <input type="text" name="nama" value={nama} onChange={(e)=>setNama(e.target.value)} />
        </label>
        {/* Add more fields as needed */}
        <br />
        <button type="submit">Update</button>
      </form>

      <form onSubmit={onDelete}>
        {/* Render form fields */}
        <label>
          id:
          <input type="text" name="id" value={id} onChange={(e)=>setId(e.target.value)} />
        </label>
        {/* Add more fields as needed */}
        <br />
        <button type="submit">Delete</button>
      </form>
    </>

  );
};

export default Home;
