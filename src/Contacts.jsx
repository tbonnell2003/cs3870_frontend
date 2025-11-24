import { useState, useEffect } from "react";


const API_URL = "https://cs3870-backend-b6cu.onrender.com";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [singleContact, setSingleContact] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");

  // Fetch ALL contacts on page load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_URL}/contacts`);
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
        setError("Error loading contacts");
      }
    };

    fetchContacts();
  }, []);

  // Fetch ONE contact by name
  const handleSearch = async (e) => {
    e.preventDefault();
    setSingleContact(null);
    setError("");

    const encodedName = encodeURIComponent(searchName.trim());

    try {
      const response = await fetch(`${API_URL}/contacts/${encodedName}`);

      if (response.status === 404) {
        throw new Error("Contact not found");
      }
      if (!response.ok) {
        throw new Error("Failed to fetch contact");
      }

      const data = await response.json();
      setSingleContact(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Contacts List</h2>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="my-4 d-flex gap-2">
        <input
          className="form-control"
          type="text"
          placeholder="Search contact by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          View Contact
        </button>
      </form>

      {/* Display a Single Contact */}
      {singleContact && (
        <div className="card mb-4">
          <div className="card-body">
            <h4>{singleContact.contact_name}</h4>
            <p>Phone: {singleContact.phone_number}</p>
            <p>Message: {singleContact.message}</p>

            {singleContact.image_url && (
              <img
                src={singleContact.image_url}
                alt={singleContact.contact_name}
                style={{ width: "150px", objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Full List of Contacts */}
      <ul className="list-group">
        {contacts.map((contact) => (
          <li
            key={contact._id}
            className="list-group-item d-flex align-items-center"
          >
            {contact.image_url && (
              <img
                src={contact.image_url}
                alt={contact.contact_name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
            )}

            <div>
              <strong>{contact.contact_name}</strong> -{" "}
              {contact.phone_number}
              <p>{contact.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
