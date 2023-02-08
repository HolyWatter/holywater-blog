import { useEffect, useState } from "react";
import Input from "../../components/auth/Input";
import SignUpInfo from "../../common/interface";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";

const SIGNUP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $nickname: String!
    $user_name: String!
  ) {
    signup(
      email: $email
      password: $password
      nickname: $nickname
      user_name: $user_name
    ) {
      id
      nickname
      user_name
      email
      password
    }
  }
`;

export default function SignUp() {
  const [info, setInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    nickname: "",
    user_name: "",
  });

  const [signUp, { error, data }] = useMutation(SIGNUP);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.signup === null) {
      alert("회원가입되었습니다.");
      navigate("/");
    }
    if (error?.message.includes("User_email_key"))
      return alert("이미 사용중인 이메일입니다.");
    if (error?.message.includes("User_nickname_key"))
      return alert("이미 사용중인 닉네임입니다.");
  }, [error?.message, data]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp({ variables: info });
  };

  console.log(data);

  const inputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  return (
    <div className="absolute top-[50%] left-[50%] flex translate-y-[-50%] translate-x-[-50%] flex-col items-center">
      <p className="py-5 text-3xl font-semibold">성수의 블로그 회원가입</p>
      <p className="py-5 text-sm text-gray-500">
        회원가입 및 로그인하시면 간단한 댓글작성 및 방명록작성이 가능합니다
      </p>
      <SignUpForm submitForm={submitForm} inputInfo={inputInfo} info={info} />
      <div className="flex items-center space-x-4">
        <p className="text-md">이미 회원이 신가요?</p>
        <Link className="text-sm text-blue-500 underline" to="/login">
          로그인
        </Link>
      </div>
    </div>
  );
}
