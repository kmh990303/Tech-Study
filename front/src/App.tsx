import React from "react";
import "./App.css";

import { useState } from "react";

interface formDataType {
  name: string;
  password: string;
}

interface ResponseData {
  name: string;
  password: string;
  message: string;
}

function App() {
  const [data, setData] = useState<formDataType>({
    name: "",
    password: "",
  });

  const [resData, SetResData] = useState<ResponseData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://54.180.126.177:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    const responseData = await response.json();

    SetResData(responseData);

    return responseData;
  };

  return (
    <>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-4 mx-auto">
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              value={data.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mx-auto">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={data.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit">submit</button>
        </form>
        {resData && (
          <p>
            {resData.name} - {resData.password} - {resData.message}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
