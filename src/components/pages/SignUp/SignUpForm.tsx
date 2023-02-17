import { SignUpInfo } from "../../../common/interface";
import Input from "../../Input";

interface Props {
  submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  info: SignUpInfo;
}

export default function SignUpForm({ submitForm, inputInfo, info }: Props) {
  return (
    <form
      onSubmit={submitForm}
      className="my-5 mx-auto flex w-[400px] flex-col justify-center space-y-5"
    >
      <Input
        onChange={inputInfo}
        placeholder="이메일을 입력해주세요"
        value={info.email}
        name="email"
        type="email"
      />
      <Input
        onChange={inputInfo}
        placeholder="비밀번호를 입력해주세요"
        value={info.password}
        name="password"
        type="password"
      />
      <Input
        onChange={inputInfo}
        placeholder="이름을 입력해주세요"
        value={info.user_name}
        name="user_name"
        type="text"
      />
      <Input
        onChange={inputInfo}
        placeholder="사용할 닉네임을 입력해주세요"
        value={info.nickname}
        name="nickname"
        type="text"
      />
      <button className="h-10 rounded-sm border">회원가입</button>
    </form>
  );
}
