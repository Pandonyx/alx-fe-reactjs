function UserProfile() {
  return (
    <div className='max-w-sm p-8 mx-auto my-20 bg-gray-100 rounded-lg shadow-lg user-profile'>
      <img
        src='https://via.placeholder.com/150'
        alt='User'
        className='mx-auto rounded-full w-36 h-36'
      />
      <h1 className='my-4 text-xl text-center text-blue-800'>John Doe</h1>
      <p className='text-base text-center text-gray-600'>
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
