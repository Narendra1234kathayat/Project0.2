import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addvideos = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null); // To hold thumbnail preview URL
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null); // To hold video preview URL
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail || !videoFile) {
      toast.error('Please upload both thumbnail and video files.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('videoFile', videoFile);
    formData.append('isPublished', isPublished);

    try {
      const response = await axios.post('https://backend-2sfx.onrender.com/api/v1/videos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('Successfully uploaded');
        // Reset form
        setTitle('');
        setDescription('');
        setThumbnail(null);
        setThumbnailPreview(null);
        setVideoFile(null);
        setVideoPreview(null);
        setIsPublished(false);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload');
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file)); // Set preview URL
    } else {
      toast.error('Please upload a valid image file for the thumbnail.');
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file)); // Set preview URL
    } else {
      toast.error('Please upload a valid video file.');
    }
  };

  const handleIsPublishedChange = (e) => {
    setIsPublished(e.target.checked);
  };

  return (
    <div className='h-screen overflow-auto bg-black pt-36'>
      <div className='xl:container mx-auto p-4'>
        <h1 className='text-2xl mb-4 text-center text-gray-300'>Upload Video</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className='space-y-4 w-96 mx-auto'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              value={title}
              onChange={handleTitleChange}
              placeholder='Title'
              className='mt-1 p-2 text-white border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder='description'
              className='mt-1 p-2 text-white border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Thumbnail
            </label>
            <input
              type='file'
              onChange={handleThumbnailChange}
              className='mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm'
              required
              accept='image/*'
            />
            {thumbnailPreview && (
              <img src={thumbnailPreview} alt='Thumbnail Preview' className='mt-2 max-w-44 min-w-full h-auto' />
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Video File
            </label>
            <input
              type='file'
              onChange={handleVideoFileChange}
              className='mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm'
              required
              accept='video/*'
            />
            {videoPreview && (
              <video controls className='mt-2 w-full h-auto'>
                <source src={videoPreview} type={videoFile.type} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Is Published
            </label>
            <input
              type='checkbox'
              checked={isPublished}
              onChange={handleIsPublishedChange}
              className='mt-1'
            />
          </div>
          <button
            type='submit'
            className='mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600'
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addvideos;
