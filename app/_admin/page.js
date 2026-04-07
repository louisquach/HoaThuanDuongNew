"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithCredential } from "@/lib/firebase-client";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email.length || !password.length) return;
    const res = await signInWithCredential(email, password);
    if (res) {
      router.push("/");
    }
  };

  const handleInputChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [target]: value });
  };

  return (
    <div id="login-container">
      <div className="login-form">
        <div className="logo-box">
          <Image src="/images/hoa-thuan-duong-logo.png" alt="logo" width={80} height={80} />
          <h1>Admin Đăng Nhập</h1>
        </div>
        <div className="login-form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-submit">
          <button className="submit-btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
