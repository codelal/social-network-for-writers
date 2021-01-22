import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile({
    // first,
    // last,
    // email,

    bio,
    setBio,
}) {
    return (
        <div className="profile-container">
            <h2>My private Workspace</h2>

            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
