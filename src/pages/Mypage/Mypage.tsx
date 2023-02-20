import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../common/Atom'
import Log from '../../components/pages/Mypage/Log'
import ModifyProfile from '../../components/pages/Mypage/ModifyProfile'
import UserInfo from '../../components/pages/Mypage/UserInfo'

const MYPAGE = gql`
	query myPage {
		myPage {
			id
			user_name
			thumbnail_url
			email
			password
			nickname
			role
			GuestBook {
				id
				text
				created
			}
			Comment {
				id
				text
			}
			MarkdownComment {
				id
				text
			}
			posts {
				id
			}
			markdown {
				id
			}
		}
	}
`

export default function Mypage() {
	const currentUser = useRecoilValue(loginState)
	const [isModifyProfile, setIsModifyProfile] = useState<boolean>(false)
	const { data, loading, refetch } = useQuery(MYPAGE, {
		context: {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		},
	})
	useEffect(() => {
		refetch()
	}, [currentUser])

	useEffect(() => {
		if (isModifyProfile) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isModifyProfile])

	return (
		<div className="mx-auto mt-10 max-w-[700px] px-10">
			{!loading && data && (
				<UserInfo
					userInfo={data.myPage}
					setIsModifyProfile={setIsModifyProfile}
					refetch={refetch}
				/>
			)}
			{!loading && data && <Log userInfo={data.myPage} />}
			{isModifyProfile && <ModifyProfile refetch={refetch} setIsModifyProfile={setIsModifyProfile} userInfo={data.myPage}/>}
		</div>
	)
}
