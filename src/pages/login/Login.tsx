import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/auth/Input";
import LoginForm from "../../components/auth/LoginForm";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loginUser {
        id
        nickname
      }
    }
  }
`;

export default function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error, data }] = useMutation(LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
    if (data?.login) {
      localStorage.setItem("token", data?.login?.token);
      alert("로그인되었습니다.");
      navigate("/");
    }
  }, [error, data?.login.token]);

  const inputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: info });
  };

  return (
    <div className="absolute top-[50%] left-[50%] flex translate-y-[-50%] translate-x-[-50%] flex-col items-center">
      <p className="py-5 text-3xl font-semibold">성수의 블로그 로그인</p>
      <p className="py-5 text-sm text-gray-500">
        회원가입 및 로그인하시면 간단한 댓글작성 및 방명록작성이 가능합니다
      </p>
      <LoginForm submitForm={submitForm} info={info} inputInfo={inputInfo} />
      <div className="flex items-center space-x-4">
        <p className="text-md">아직 회원이 아니신가요?</p>
        <Link className="text-sm text-blue-500 underline" to="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}
