// Profile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useApiClient, { createApiClient } from '../hooks/useApiClient';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const apiClient = useApiClient(createApiClient());
  const [profile, setProfile] = useState({});

  useEffect(() => {
    apiClient.get(`/api/profile/${user.id}`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user, apiClient]);


  const isCurrentUser = user && user.id === profile.id;

  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-header">
        <img src={profile.avatar} alt={profile.username} className="profile-avatar"/>
        <div>
          <h2>{profile.username}</h2>
          <p>{profile.realname}</p>
          <p>{profile.bio}</p>
          {isCurrentUser ? (
            <>
              <button onClick={() => {/* add edit profile logic here */}}>Edit Profile</button>
              <Link to="/settings">Settings</Link>
            </>
          ) : (
            <>
              <button onClick={() => {/* add follow user logic here */}}>Follow</button>
              <button onClick={() => {/* add send message logic here */}}>Message</button>
            </>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <p>Followers: {profile.followersCount}</p> 
        <p>Likes: {profile.likesCount}</p> 
        <p>Downloads: {profile.downloadsCount}</p> 
      </div>
    </div>
  );
};

export default Profile;
