import { useSelector } from "react-redux";

function UserProfile() {
  const { visible, profile } = useSelector((state) => state.profileReducer);

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
      <div>name: {profile.name}</div>
      <div>Username: {profile.username}</div>
      <div>bio: {profile.bio}</div>
    </div>
  );
}

export default UserProfile;
