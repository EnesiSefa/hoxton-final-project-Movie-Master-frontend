import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound"
import "./SignUpPage.css";
import boopSfx from '../../sounds/audio.mp3';

type Props = {
  login: (data: any) => void;
};

export default function SignUpPage({ login }: Props) {
  let navigate = useNavigate();
  

  return (
    <div className="sign-up-page">
      <form className="sign-up-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`http://localhost:4007/sign-up`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // @ts-ignore
              email: e.target.email.value,
              // @ts-ignore
              password: e.target.password.value,
              // @ts-ignore
              profilePic: e.target.profilePic.value,
              // @ts-ignore
              username: e.target.username.value,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              // data = {user,token}
              if (data.error) {
                alert(data.error);
                console.log(data.error);
              } else {
                login(data);
                navigate("/MovieMasterHome");
              }
            });
        }}
      >
        <label htmlFor="">
          <input className="sign-up-input" type="text" name="email" placeholder="email..." />
        </label>
        <label htmlFor="">
          <input className="sign-up-input" type="text" name="password" placeholder="password" />
        </label>

        <label htmlFor="">
          <input className="sign-up-input" type="text" name="profilePic" placeholder="profile pic" />
        </label>
        <label htmlFor="">
          <input className="sign-up-input" type="text" name="username" placeholder="username" />
        </label>
        <button className="sign-up-button" type="submit">Sign Up</button>
      </form>
      <h3>Already have an account <Link className="sign-up-link" to={"/SignIn"}>Sign in</Link></h3>
      
    </div>
  );
}
