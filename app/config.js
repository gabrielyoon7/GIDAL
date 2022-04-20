//각종 변수 제어 (env 어케 쓰는지 몰라서 이렇게 관리함)
/*

	원본
	ip:"http://192.168.0.0",

	ip 숫자만 수정하고 형식 수정하지 마세요

*/
export const config = {
	ip:"http://192.168.0.65",
	user:[ 
		{
			_id : "0",
			user_id : "testAccount00",
			user_pw : "1234",
			name : "user_name_00",
			gender : "?",
			bday : "2022-04-07",
			location : "경기도 수원시",
			following : "",
			follower : "",
			profile_image : "",
			points : 10000,
			count_diary_total : 0,
			count_diary_everyday : 0,
			items : {},
			sentDm: [{
				"dmRecipient_id": 'gidal1',
        		"title": "test",
				"content": "test content",
        		"date": "2022-04-11"
			}],
			receivedDm:[{

			}]
		},
	],
};