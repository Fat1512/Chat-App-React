function SingleProfile({ profile }) {
  return (
    <>
      {profile.roomType == "PRIVATE" && (
        <div>
          <p>bio: {profile.bio}</p>
          <p>name: {profile.name}</p>
          <p>username: {profile.username}</p>
        </div>
      )}
      {profile.roomType == "GROUP" && (
        <div>
          <p>group name: {profile.name}</p>
        </div>
      )}
    </>
  );
}

export default SingleProfile;
