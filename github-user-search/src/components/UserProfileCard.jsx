import React from "react";

const UserProfileCard = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className='user-profile-card'>
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className='avatar'
      />
      <h2>
        <a
          href={user.html_url}
          target='_blank'
          rel='noopener noreferrer'>
          {user.name || user.login}
        </a>
      </h2>
      <p>{user.bio}</p>
      <ul>
        <li>
          <strong>Followers:</strong> {user.followers}
        </li>
        <li>
          <strong>Following:</strong> {user.following}
        </li>
        <li>
          <strong>Public Repos:</strong> {user.public_repos}
        </li>
      </ul>
    </div>
  );
};

export default UserProfileCard;
