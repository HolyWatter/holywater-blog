import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const moveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(e.currentTarget.value);
  };
  return (
    <div>
      <button onClick={moveBtn} value="/signup">
        회원가입
      </button>
      <button onClick={moveBtn} value="/login">
        로그인
      </button>
    </div>
  );
}
