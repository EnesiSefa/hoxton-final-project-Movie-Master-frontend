import { port } from "../App";
import { Navigate,useNavigate } from "react-router-dom";
type Props = {
  login: (data: any) => void;
};
export default function SignIn({ login }: Props) {
    let navigate = useNavigate()
  return (
    <div>
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
          <input type="text" name="email" />
        </label>
        <label htmlFor="">
          <input type="text" name="password" />
        </label>
        <button>Sign in</button>
      </form>
    </div>
  );
}
