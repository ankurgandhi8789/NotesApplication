import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const api = "http://localhost:5000/api";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${api}/notes`);
      setNotes(res.data.notes);
    } catch (error) {
      setError("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setError("");
      await axios.delete(`${api}/notes/${id}`);
      fetchNotes();
    } catch (error) {
      setError("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="font-bold text-xl font-stretch-50%">Notes App</h1>
          <Link
            to="/create"
            className=" bg-yellow-400 text-shadow-white px-4 py-2 rounded "
          >
            Create Note
          </Link>
        </div>

        {loading && (
          <p className="text-center font-bold text-xl">Loading notes...</p>
        )}

        {error && (
          <p className="text-center font-bold text-red-600">{error}</p>
        )}

        {!loading && !error && notes.length === 0 && (
          <p className="text-center font-bold text-xl">No notes found...</p>
        )}
        <div className="">
          {!loading && notes.map((note) => (
            <div key={note.id} className="bg-white p-4 rounded m-2 border-2">
              <Link to={`/note/${note.id}`}>
                <h2 className="font-bold text-xl text-center ">
                  {" "}
                  {note.title}
                </h2>
                <p>
                  {note.content.length > 60
                    ? note.content.slice(0, 60) + "..."
                    : note.content}
                </p>
              </Link>

              <div className="flex gap-2 mt-4">
                <Link
                  className="w-full m-2 text-white text-center rounded py-1 bg-green-600"
                  to={`/note/${note.id}`}
                >
                  Read
                </Link>
                <Link
                  className="w-full text-white text-center rounded m-2 py-1 bg-green-600"
                  to={`/edit/${note.id}`}
                >
                  Edit
                </Link>
              </div>
              <button
                className="w-full cursor-pointer  py-1   bg-red-500 rounded text-white"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
