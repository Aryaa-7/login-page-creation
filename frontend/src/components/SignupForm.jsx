import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user", // default role in lowercase
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role.toLowerCase(), // ensure lowercase
            });

            console.log("Registered user:", res.data);
            navigate("/"); // redirect to login or dashboard
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="shopkeeper">Shopkeeper</option>
                    </select>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button type="submit">Sign Up</button>
                </form>

                <p className="signup-footer">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
