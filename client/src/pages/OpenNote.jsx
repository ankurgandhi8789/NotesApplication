import React from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const api = "http://localhost:5000/api";

const OpenNote = () => {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${api}/notes/${id}`);
        setNote(res.data.note);
      } catch (error) {
        setError("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote()

  }, [id]);

  if(loading){
    return <div className="flex justify-center items-center h-screen font-bold text-xl">
      Loading Notes...
    </div>
  }

  if(error){
    return <div className="flex justify-center items-center h-screen font-bold text-xl text-red-600">
      {error}
    </div>
  }

  if(!note){
    return <div className="flex justify-center items-center h-screen font-bold text-xl">
      Note not found.
    </div>
  }
  return <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white p-8 rounded border-2 border-black shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold">
          {note.title}
        </h1>

        <p className="mt-4 text-gray-700">
          {note.content}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Created At: {note.createdAt}
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
    
};

export default OpenNote;
