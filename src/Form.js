import { useState } from "react";
import Modal from 'react-modal';

export default function Form(props) {

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');

  const defaultFormValue = {
    userName: '',
    feedback: '',
    rateNumber: 0,
  }

  const [formData, setFormData] = useState(defaultFormValue);

  function handleChange(event) {
    const {name, value} = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function submitForm(event) {
    event.preventDefault();
    props.handleAddPost(formData);
    closeModal();
    setFormData(defaultFormValue);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  //let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button type="button" 
        className="border text-white bg-blue-600 py-2 px-4 hover:bg-blue-900" 
        onClick={openModal}>Add Feedback</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-lg font-medium">Enter new feedback</div>
        <hr className="my-4"/>
        <form onSubmit={submitForm} className="w-400">
          <div className='flex flex-col w-full'>
            <textarea
              name="feedback"
              placeholder='Enter your feedback'
              onChange={handleChange}
              value={formData.feedback} />
            <input 
              type="text" 
              name="userName" 
              id=""
              placeholder='Enter your name'
              onChange={handleChange}
              value={formData.userName}
              className="w-6/12 mt-4" />
            <div className="mt-4">
              <label htmlFor='rateNumber'>Rate the post please from 1 to 5</label><br/>
              <select 
                name="rateNumber" 
                id="rateNumber"
                value={formData.rateNumber}
                onChange={handleChange}
                className="w-6/12"
              >
                <option value="0">--- Choose ---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <hr className="my-4"/>
          <div className="flex justify-between">
            <button className="border text-white bg-blue-800 py-2 px-4" >Leave feedback</button>
            <button type="button" className="border text-white bg-red-800 py-2 px-4" onClick={closeModal}>Close</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}