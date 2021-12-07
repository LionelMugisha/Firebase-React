import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { storage, fs } from './Config/Config';

const AddMovie = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null); 
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [imageError, setImageError] = useState('');

    const types = ['image/jpg','image/jpeg','image/png','image/PNG'];

    const handleImage = (e) => {
        let fileSelected = e.target.files[0];
        if(fileSelected && types.includes(fileSelected.type)){
            setImage(fileSelected);
            setImageError('');
        } else {
            setImage(null);
            setImageError('Please select your image');
        }
    }

    const handleMovies = (e) => {
        e.preventDefault();
        // console.log(title,description,category);
        // console.log(image);
        const uploadImage = storage.ref(`product-images/${image.name}`).put(image);
        uploadImage.on('state changed', snapshot => {
            const uploadImageProgress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(uploadImageProgress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL()
                .then((url) => {
                    fs.collection('Movies').add({
                        title,
                        description,
                        category,
                        url
                    })
                    .then(() => {
                        setSuccessMsg('Movie Added Successfull!!');
                        setTitle('');
                        setDescription('');
                        setCategory('');
                        document.getElementById('file').value='';
                        setImageError('');
                        setUploadError('');
                        setTimeout(() => {
                            setSuccessMsg('');
                        },3000)
                    })
                    .catch((error) => {
                        setUploadError(error.message);
                    })
                })
        })
    }

    return (
        <>
            <div className="w-full lg:max-w-5xl mt-8 lg:ml-36 md:max-w-2xl md:ml-16">
                <form onSubmit={handleMovies} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-4xl font-bold mb-2">
                            Add Movie
                        </label>
                    </div>
                    <hr className="font-bold mb-4"></hr>
                    { successMsg && <>
                    <div className="shadow mb-4 appearance-none border bg-green-100 rounded w-full py-2 px-3 text-green-400 leading-tight focus:outline-none focus:shadow-outline">
                        {successMsg}
                    </div>
                    </> }
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Movie Title
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="title" 
                        type="text" 
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Movie Description
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="description" 
                        type="text" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Movie Category
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="category" 
                        type="text"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-semibold mb-2">
                            Upload Movie Image
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="file" 
                        type="file"
                        onChange={handleImage}
                        />
                    </div>
                    { imageError && <>
                    <div className="shadow mb-4 appearance-none border bg-red-100 rounded w-full py-2 px-3 text-red-400 leading-tight focus:outline-none focus:shadow-outline">
                        {imageError}
                    </div>
                    </> }
                    <div className="flex items-center justify-between mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit">
                            Register
                        </button>
                    </div>
                    <div className="flex items-center mb-4 justify-between">
                        <Link to="/">  
                            <p>Back To Home!!</p>
                        </Link>
                    </div>
                    { uploadError && <>
                    <div className="shadow appearance-none border bg-red-100 rounded w-full py-2 px-3 text-red-400 leading-tight focus:outline-none focus:shadow-outline">
                        {uploadError}
                    </div>
                    </> }
                </form>
            </div>
        </>
    )
}

export default AddMovie;
