import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="fixed md-m:hidden inline-block align-top mt-10 px-10">
      <div className="flex flex-col space-y-5 pl-3">
        <Link to="/develop">개발일지</Link>
        <Link to="/postdevelop">개발일지 작성</Link>
        <Link to="/guestbook">방명록 작성</Link>
      </div>
    </div>
  )
}
