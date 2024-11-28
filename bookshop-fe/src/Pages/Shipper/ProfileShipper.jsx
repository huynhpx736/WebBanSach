import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./ProfileShipper.css";

const ProfileShipper1 = () => {
    const [profile, setProfile] = useState({});
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/shipper/profile")
            .then((response) => setProfile(response.data))
            .catch((error) => console.error("Error fetching profile:", error));
    }, []);

    const updateProfile = () => {
        axios.put("http://localhost:8080/api/shipper/profile", profile)
            .then(() => {
                alert("Cập nhật thông tin thành công");
                setEditing(false);
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    return (
        <div className="profile-shipper">
            <h2>Quản lý thông tin cá nhân</h2>
            <div>
                <label>Tên:</label>
                <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!editing}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!editing}
                />
            </div>
            <button onClick={() => setEditing(!editing)}>
                {editing ? "Hủy" : "Chỉnh sửa"}
            </button>
            {editing && <button onClick={updateProfile}>Lưu</button>}
        </div>
    );
};

export default ProfileShipper1;
