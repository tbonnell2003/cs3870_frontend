import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./navigation/Layout.jsx";
import Contacts from "./Contacts.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { BASE_URL } from "./config.js";

// Simple Home Page
const Home = () => <p>Welcome.</p>;

// -----------------------------------------------
// ADD CONTACT (now sends JWT token if present)
// -----------------------------------------------
const AddContact = () => {
  const [contact_name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");

    // Read token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMsg("You must login first to add a contact.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contact_name,
          phone_number,
          message,
          image_url,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setResponseMsg(data.message || "Contact added!");
        setName("");
        setPhone("");
        setMessage("");
        setImageUrl("");
      } else if (response.status === 401 || response.status === 403) {
        setResponseMsg(
          data.detail ||
            "Not authorized. Please login again to get a new token."
        );
      } else {
        setResponseMsg(data.message || "Failed to add contact");
      }
    } catch (error) {
      setResponseMsg("Error: " + error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={contact_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Phone Number</label>
          <input
            className="form-control"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Message</label>
          <input
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Add Contact
        </button>
      </form>

      {responseMsg && <p className="mt-3">{responseMsg}</p>}
    </>
  );
};

// -----------------------------------------------
// DELETE CONTACT
// -----------------------------------------------
const DeleteContact = () => {
  const [name, setName] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/contacts/${encodeURIComponent(name)}`,
        { method: "DELETE" }
      );

      if (response.status === 204) {
        alert("Contact deleted");
      } else if (response.status === 404) {
        alert("Contact not found");
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete contact");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleDelete} className="d-flex flex-column gap-3">
      <div>
        <label className="form-label">Contact name to delete</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-danger" type="submit">
        Delete
      </button>
    </form>
  );
};

// -----------------------------------------------
// UPDATE CONTACT
// -----------------------------------------------
const UpdateContact = () => {
  const [oldName, setOldName] = useState("");
  const [contact_name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [image_url, setImageUrl] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/contacts/${encodeURIComponent(oldName)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact_name,
            phone_number,
            message,
            image_url,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update contact");
      }

      alert("Contact updated!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="d-flex flex-column gap-3">
      <div>
        <label className="form-label">Existing contact name</label>
        <input
          className="form-control"
          value={oldName}
          onChange={(e) => setOldName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="form-label">New Name</label>
        <input
          className="form-control"
          value={contact_name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="form-label">New Phone</label>
        <input
          className="form-control"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="form-label">New Message</label>
        <input
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="form-label">New Image URL</label>
        <input
          className="form-control"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-warning" type="submit">
        Update
      </button>
    </form>
  );
};

// -----------------------------------------------
// ROUTES
// -----------------------------------------------
function App() {
  return (
    <BrowserRouter basename="/cs3870_frontend">
      <Routes>
        <Route
          path="/"
          element={
            <Layout title="Phone Contacts App">
              <Home />
            </Layout>
          }
        />

        <Route
          path="/contacts"
          element={
            <Layout title="Contacts List">
              <Contacts />
            </Layout>
          }
        />

        <Route
          path="/add"
          element={
            <Layout title="Add Contact">
              <AddContact />
            </Layout>
          }
        />

        <Route
          path="/delete"
          element={
            <Layout title="Delete Contact">
              <DeleteContact />
            </Layout>
          }
        />

        <Route
          path="/update"
          element={
            <Layout title="Update Contact">
              <UpdateContact />
            </Layout>
          }
        />

        <Route
          path="/signup"
          element={
            <Layout title="Signup">
              <Signup />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout title="Login">
              <Login />
            </Layout>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
