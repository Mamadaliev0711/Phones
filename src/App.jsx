import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [phones, setPhones] = useState([]);

  // useRef lar to'g'irlangan
  const nameRef = useRef("");
  const priceRef = useRef(0);
  const descRef = useRef("");
  const statusRef = useRef("");

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPhones(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function validate() {
    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      const phone = {
        name: nameRef.current.value,
        description: descRef.current.value,
        price: priceRef.current.value,
        status: statusRef.current.value,
        category_id: 2,
      };

      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(phone),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setPhones((prevPhones) => [...prevPhones, data]);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // Inputlarni tozalash
          nameRef.current.value = "";
          priceRef.current.value = "";
          descRef.current.value = "";
          statusRef.current.value = "";
        });
    }
  }

  // Malumotni o'chirish
  const handleDelete = (id) => {
    fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // O'chirilgan malumotni ro'yxatdan olib tashlash
          setPhones((prevPhones) =>
            prevPhones.filter((phone) => phone.id !== id)
          );
        } else {
          throw new Error("Failed to delete phone");
        }
      })
      .catch((err) => {
        console.error("Error deleting phone:", err);
      });
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Phones</h1>
      <form className="d-flex w-50 gap-3 flex-column mx-auto">
        <input
          ref={nameRef}
          type="text"
          className="form-control"
          placeholder="Enter name..."
        />
        <input
          ref={priceRef}
          type="number"
          className="form-control"
          placeholder="Enter price..."
        />
        <textarea
          ref={descRef}
          className="form-control"
          rows="3"
          placeholder="Enter description..."
        ></textarea>
        <select ref={statusRef} className="form-control" id="">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={handleClick} className="btn btn-success">
          SAVE
        </button>
      </form>
      <div className="card-wrapper mt-3 d-flex gap-3 flex-wrap justify-content-center">
        {phones.map((phone, index) => (
          <Card
            key={index}
            phone={phone}
            onDelete={() => handleDelete(phone.id)} // onDelete prop ni qo'shish
          />
        ))}
      </div>
    </div>
  );
}

export default App;
