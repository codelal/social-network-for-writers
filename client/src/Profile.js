import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

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
            <h2>User Profile Component</h2>
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
