import React, { useState } from 'react';
import CreateAppBar from '../components/createAppBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (!title.trim() || !content.trim()) {
      toast.success('Please fill in both title and content.');
      return;
    }

    const blogData = { title, content };
    console.log('Submitting blog:', blogData);

    const res = await axios.post(
      `https://backend.ankeshkush9651.workers.dev/api/v1/blog`,
      blogData,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    toast.success(res.data.message);
    navigate('/blogs');
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
  }
};


  return (
    <div>
      <CreateAppBar/>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Share Your Thoughts....</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700  mb-2 font-extralight text-3xl font-serif">
             Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter  title......."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-serif"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-gray-700 font-serif mb-2 text-3xl">
           Content.
          </label>
          <textarea
            id="content"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 font-serif rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all font-medium "
        >
          Publish Blog
        </button>
      </form>
      </div>
      </div> 
  );
};

export default CreateBlogForm;
