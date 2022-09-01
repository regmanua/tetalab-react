import './App.css';
import Form from './Form';
import Feedback from './Feedback';
import { useEffect, useState } from 'react';

const API_URL = 'https://vn0ibo4ov0.execute-api.eu-central-1.amazonaws.com';

function App() {
  const [feedbackList, setFeedBackList] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  console.log(`filter = `, filter);

  async function getAllPosts () {
    await fetch(`${API_URL}/posts`, {mode: 'cors'})
      .then((response) => response.json())
      .then(data => {
        setFeedBackList(data.Items);
        setFilteredList(data.Items);
        console.log(`feedbackList`, feedbackList);
        console.log(`fetchedList`, filteredList);
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
         name: formData.name,
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

  const onChangeHandler = event => {
    setFilter(event.target.value);
    const newList = filteredList.filter(post => post.feedback.includes(filter));
    setFeedBackList(newList);
  };

  useEffect(() => {
    getAllPosts()
      .then(console.log("fetchedList", filteredList));
  }, []);

  const postsList = feedbackList.map(post => {
    return (
      <div>
        <Feedback key={post.id} post={post} handleDelete={() => deletePost(post.id)}/>
      </div>
    )
  });

  return (
    <div className='container p-4'>
      <header className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <div className='text-2xl font-medium pt-5'>Feedback React Application</div>
          <span>Posts found: {feedbackList.length}</span>
        </div>
        <div>
          <span className='pr-3'>Filter feedbacks by keyword:</span>
          <input type="text" id="filter" onChange={onChangeHandler} value={filter}/>
        </div>
      </header>
      {postsList}
      <Form handleAddPost={(formData) => addPosts(formData)}/>
    </div>

  );
}

export default App;
