function UserProfile() {
  return (
    <div className='max-w-xs p-4 mx-auto my-20 transition-shadow duration-300 ease-in-out bg-gray-100 rounded-lg shadow-lg user-profile sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm hover:shadow-xl'>
      <img
        src='https://via.placeholder.com/150'
        alt='User'
        className='w-24 h-24 mx-auto transition-transform duration-300 ease-in-out rounded-full cursor-pointer sm:w-24 sm:h-24 md:w-36 md:h-36 hover:scale-110'
      />
      <h1 className='my-4 text-lg text-center text-blue-800 transition-colors duration-300 ease-in-out cursor-pointer sm:text-lg md:text-xl hover:text-blue-500'>
        John Doe
      </h1>
      <p className='text-sm text-center text-gray-600 sm:text-sm md:text-base'>
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
