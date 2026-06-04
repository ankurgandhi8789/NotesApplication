import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const api = "http://localhost:5000/api";

const EditNote = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${api}/notes/${id}`);

        setTitle(res.data.note.title);
        setContent(res.data.note.content);
      } catch (error) {
        setError("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await axios.put(`${api}/notes/${id}`, {
        title,
        content,
      });

      navigate("/");
    } catch (error) {
      setError("Failed to update note.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
        <p className="font-bold text-xl">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded border-2 border-black w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6">
          Edit Note
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Enter title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="6"
          placeholder="Enter content"
          className="w-full border p-3 rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Update Note
          </button>

          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
