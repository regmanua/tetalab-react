import './App.css';
import Form from './Form';
import Feedback from './Feedback';
import { useEffect, useState } from 'react';

function App() {

  const API_URL = 'https://vn0ibo4ov0.execute-api.eu-central-1.amazonaws.com';
  const [feedbackList, setFeedBackList] = useState([]);
  const postsList = feedbackList.map(post => {
    return (
      <div>
        <Feedback key={post.id} post={post} handleDelete={() => deletePost(post.id)}/>
      </div>
    )
  })


  async function getAllPosts () {
    await fetch(`${API_URL}/posts`, {mode: 'cors'})
      .then((response) => response.json())
      .then(data => {
        setFeedBackList(data.Items);
        console.log(`feedbackList`, feedbackList);
      })
      .catch((err) => {
         console.log(err.message);
      });
  };  

  async function addPosts (formData) {
    await fetch(`${API_URL}/posts`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
         user: formData.user,
         feedback: formData.feedback,
         rate: formData.rate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllPosts();
        console.log(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
    //console.log('formData = ', formData);
  };

  async function deletePost(id) {
    await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAllPosts();
      })
      .catch((err) => {
         console.log(err.message);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className='container p-4'>
      <header>
        <div className='text-2xl font-medium py-4'>Feedback React Application</div>
      </header>
      {postsList}
      <Form handleAddPost={(formData) => addPosts(formData)}/>
    </div>

  );
}

export default App;
