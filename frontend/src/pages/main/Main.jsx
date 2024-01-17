import React, { useState ,useEffect } from 'react';
import Post from './post/Post';
import './Main.css';
import { FaUser, FaEnvelope, FaHome, FaUsers, FaBell, FaPlus, FaArrowLeft} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getData } from "../../functions/getData";
import { LOGIN_URL } from "../../urls";
import { refreshAccess } from "../../functions/refreshAccess";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'
import { apiCall } from '../../functions/apiCall';
import Modal from 'react-modal';


function Main() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('posts');
  const [postResults, setPostResults] = useState([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleDeletePost  =  async (postId) =>
  {
    {checkIfLoggedIn}
    await apiCall(`http://localhost:8000/posts/${postId}/delete`, "DELETE");
    setPostResults(prevPostResults => prevPostResults.filter(post => post.id !== postId));
  }

  useEffect(() => {
    if (selectedCategory === 'posts') {
      getData("http://localhost:8000/posts/explore")
        .then((data) => {
          renderPosts(data.results);
          setPostResults(data.results); 
        })
        .catch((error) => {
          console.error("Error getting data:", error);
        });
    }
  }, [selectedCategory]);

  const renderPosts = (postResults) => {
    return (
      <>
        {postResults.map(post => (
          <div key={post.id}>
            <Post data={post} onDelete={handleDeletePost}/>
        
          </div>
        ))}
      </>
    );
  };

  const checkIfLoggedIn = async () => {
    let loggedIn = await refreshAccess()
    if (!loggedIn) {
        navigate(LOGIN_URL)
    }
}

useEffect(() => {
    checkIfLoggedIn()
  }, []);

  return (
    <>
      <div className={'upBar'}>
        <input type="text" placeholder="Wyszukaj..." />
        <div className="icon-container" onClick={() => navigate('/profile')}>
          <FaUser size={48} />
        </div>
      </div>
      <div className={'leftBar'}>
        <div onClick={() => handleCategoryClick('messages')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaEnvelope size={32} /> Messages
          </p>
        </div>
        <div onClick={() => handleCategoryClick('posts')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaHome size={32} /> Posts
          </p>
        </div>
        <div onClick={() => handleCategoryClick('friends')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaUsers size={32} /> Friends
          </p>
        </div>
        <div onClick={() => handleCategoryClick('notifications')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaBell size={32} /> Notifications
          </p>
        </div>
      </div>
      
    <div className="content">
      <PerfectScrollbar>
        {selectedCategory === 'messages' && <p>Wiadomości</p>}
        {selectedCategory === 'notifications' && <p>Powiadomienia</p>}
        {selectedCategory === 'posts' && (renderPosts([]) ? renderPosts(postResults) : <p>No posts available.</p>)}
        {selectedCategory === 'friends' && <p>Znajomi</p>}
      </PerfectScrollbar>
    </div>
    <FaPlus onClick={() => setShowCreatePostModal(prevState => !prevState)} />
    {showCreatePostModal && 
    <Modal 
    isOpen={showCreatePostModal}
    onRequestClose={() => setShowCreatePostModal(false)}
    style={{
      content: {
        width: '500px',
        margin: 'auto',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        overflow: 'hidden',
      },
    }}>
       <div className="modal-header">
       <div onClick={() => setShowCreatePostModal(false)}>
         <FaArrowLeft />
       </div>
       <h3>Create Post</h3>
       <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
     </div>
     <input type="file" accept="image/*" title="Choose file" />
 
      </Modal>}
      
    </>
  );
}

export default Main;
