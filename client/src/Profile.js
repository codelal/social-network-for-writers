import ProfilePic from "./profilepic";
import BioEditor from "./BioEditor";

export default function Profile({ first, last, email, url, toggleUploader }) {
    console.log(first, last, toggleUploader);
    return (
        <div className="profile-container">
            <h2>User Profile Component</h2>
            <ProfilePic
                url={url}
                alt={first}
                first={first}
                last={last}
                email={email}
                toggleUploader={toggleUploader}
            />
            <BioEditor />
        </div>
    );
}
