import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profile_image_url, setProfileImg] = useState("");
  const [wargame_username, setWargameUsername] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        bio,
        profile_image_url,
        wargame_username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("rare_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-4xl mt-7 mb-3">Wargame Nexus</h1>
          <h2 className="text-xl mb-10">Register new account</h2>
          <fieldset className="mb-4">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="form-control"
              placeholder="first name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="form-control"
              placeholder="last name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Email </label>
            <input
              type="text"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputBio"> Bio </label>
            <input
              type="text"
              id="inputBio"
              value={bio}
              onChange={(evt) => setBio(evt.target.value)}
              className="form-control"
              placeholder="Bio"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputProfileImg"> ImageUrl </label>
            <input
              type="text"
              id="inputProfileImg"
              value={profile_image_url}
              onChange={(evt) => setProfileImg(evt.target.value)}
              className="form-control"
              placeholder="ImageUrl"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="rare_username"> Username </label>
            <input
              type="text"
              id="inputUsername"
              value={wargame_username}
              onChange={(evt) => setWargameUsername(evt.target.value)}
              className="form-control"
              placeholder="username"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};
