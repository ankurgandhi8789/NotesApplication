import React from 'react'
import axios from 'axios';
import {useNavigate , Link} from 'react-router-dom'
import { useState } from 'react';

const api='http://localhost:5000/api';


const CreateNote = () => {
  const [title , setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      setError('');
      await axios.post(`${api}/notes`,{title,content});
      navigate('/');
    } catch (error) {
      setError('Failed to create note.');
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form className='w-full-md bg-white p-6 rounded border-2 border-black' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <h1 className='font-bold text-xl'>Create Note</h1>
          <Link
          to="/"
          className="inline-block mb-2
           bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
        </div>
        
        <input type="text" placeholder='Title' className='border p-2 w-full mb-4' value={title} onChange={(e)=>setTitle(e.target.value)} />

        <textarea placeholder='Content' className='border p-2 w-full mb-4' value = {content} onChange={(e)=>setContent(e.target.value)} />

        {error && <p className='text-red-600 mb-4'>{error}</p>}

        <button className='bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer'>Create</button>
        
      </form>
      
    </div>
  )
}

export default CreateNote
