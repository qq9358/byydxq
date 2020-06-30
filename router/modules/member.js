// router/modules/member.js
const member = [{
	//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
	path: '/pages/member/login',
	name: 'login',
	meta: {
		title: '登录',
	},
}, {
	path: '/pages/member/course-search',
	name: 'course-search',
	meta: {
		title: '课程查询'
	}
},{
	path: '/pages/member/enroll-face',
	name: 'enroll-face',
	meta: {
		title: '登记人脸'
	}
},{
	path: '/pages/member/member-center',
	name: 'member-center',
	meta: {
		title: '我的'
	}
},{
	path: '/pages/member/message-list',
	name: 'message-list',
	meta: {
		title: '消息列表'
	}
},{
	path: '/pages/member/my-integral',
	name: 'my-integral',
	meta: {
		title: '我的积分'
	}
},{
	path: '/pages/member/my-ticket',
	name: 'my-ticket',
	meta: {
		title: '我的门票'
	}
}]
export default member
