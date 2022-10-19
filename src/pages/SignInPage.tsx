import "./SignInPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { port } from "../port";
type Props = {
  login: (data: any) => void;
};
export default function SignInPage({ login }: Props) {
  let navigate = useNavigate();
  return (
    <div className="sign-in-page">
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`http://localhost:${port}/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // @ts-ignore
              email: e.target.email.value,
              // @ts-ignore
              password: e.target.password.value,
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
        className="sign-in-form"
      >
        <label htmlFor="">
          <input
            className="sign-in-input"
            type="text"
            name="email"
            placeholder="   write your email"
          />
        </label>
        <label htmlFor="password">
          <input
            className="sign-in-input"
            type="text"
            name="password"
            placeholder="   password"
          />
        </label>
        <button className="sign-in-button" type="submit">
          Sign in
        </button>
      </form>
      <h3 className="sign-in-h3">
        don't have an account, <Link className="sign-in-link" to={"/SignUp"}>Sign up</Link>
      </h3>
    </div>
  );
}
