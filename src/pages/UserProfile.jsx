function UserProfile({ visible }) {
  return (
    <div
      className={`overflow-hidden transition-all ease-in-out text-2xl ${
        visible ? "w-[35rem]" : "w-0"
      }`}
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        alt=""
        className="w-[5rem] object-contain"
      />
      <div>name: </div>
      <div>Username:</div>
      <div>bio</div>
    </div>
  );
}

export default UserProfile;
