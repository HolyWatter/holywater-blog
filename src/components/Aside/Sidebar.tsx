import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="inline-block w-1/4 align-top mt-10">
      <div className="flex flex-col space-y-5 pl-3">
        <Link to="/develop">개발일지</Link>
        <Link to="/postdevelop">개발일지 작성</Link>
      </div>
    </div>
  )
}
