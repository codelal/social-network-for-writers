import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile({
    first,
    last,
    email,
    url,
    bio,
    setBio,
    toggleUploader,
}) {
    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <ProfilePic
                url={url}
                first={first}
                last={last}
                email={email}
                toggleUploader={toggleUploader}
            />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
