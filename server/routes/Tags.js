const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Tag } = require("../models/Tag");
const { TagLog } = require('../models/TagLog');


const TagDataExample = [
    {
        type: 'button',
        question: '어떤 종류의 일기인가요?',
        tags: ['일상', '관찰', '운동', '연애', '공부', '여행',]
    },
    {
        type: 'search',
        question: '오늘의 아침 식사는?',
        tags: [
            '김밥', '김치찌개', '과일빙수', '떡볶이',
            '냉면',
            '돈가스', '도시락', '된장찌개',
            '라면',
            '마라탕', '마라샹궈',
            '분식', '보쌈',
            '스파게티', '샌드위치', '순대국', '샐러드', '수제비', '쌀국수',
            '아구찜', '아구탕', '아이스크림', '일식', '와플',
            '중식', '짜장면', '죽', '족발',
            '치킨',
            '케이크', '크로플', '칼국수',
            '토스트',
            '피자', '팥빙수',
            '한식', '해물찜', '해물탕', '훠궈', '햄버거',
        ]
    },
    {
        type: 'search',
        question: '오늘의 점심 식사는?',
        tags: [
            '김밥', '김치찌개', '과일빙수', '떡볶이',
            '냉면',
            '돈가스', '도시락', '된장찌개',
            '라면',
            '마라탕', '마라샹궈',
            '분식', '보쌈',
            '스파게티', '샌드위치', '순대국', '샐러드', '수제비', '쌀국수',
            '아구찜', '아구탕', '아이스크림', '일식', '와플',
            '중식', '짜장면', '죽', '족발',
            '치킨',
            '케이크', '크로플', '칼국수',
            '토스트',
            '피자', '팥빙수',
            '한식', '해물찜', '해물탕', '훠궈', '햄버거',
        ]
    },
    {
        type: 'search',
        question: '오늘 수면은 어땠나요?',
        tags: ['숙면', '개운', '잠설침', '피곤', '못잠', '늦게잠', '수면부족', '1시간', '2시간', '3시간', '4시간', '5시간', '6시간', '7시간', '8시간', '9시간', '10시간', '11시간', '12시간', '반나절이상']
    },
    {
        type: 'search',
        question: '오늘의 취미는?',
        tags: ['독서', '영화', '드라마', '맛집', '게임', '자수', '산책', '유투브', '운동', '전시', '공연', '사진', '요리', '공부', '나만의취미']
    },
    {
        type: 'button',
        question: '오늘 경제생활은 어땠나요?',
        tags: ['0원', '계획대로', '과소비', '충동구매', '적당함', '조금씀', '텅장', '바보비용', '월급날', '용돈', '꽁돈', '로또당첨']
    },
    {
        type: 'search',
        question: '오늘 어떤 운동을 했나요?',
        tags: ['걷기', '달리기', '조깅', '마라톤', '수영','테니스','배드민턴','PT','자전거','요가','필라테스','등산','클라이밍','골프','농구','야구','축구','배구','발레','볼링','스쿼시','스키','줄넘기']
    },
    {
        type: 'button',
        question: '오늘 반려동물과 무엇을 했나요?',
        tags: ['산책', '여행', '미용', '어질리티', '병원가기', '특식주기','쇼핑']
    },
    {
        type: 'search',
        question: '오늘 바쁘게 보낸 시간은 언제인가요?',
        tags: ['1시~2시', '2시~3시', '3시~4시', '4시~5시', '5시~6시','6시~7시','7시~8시','8시~9시','9시~10시','10시~11시','11시~12시','12시~13시','13시~14시','14시~15시','15시~16시','16시~17시','17시~18시','18시~19시','19시~20시','20시~21시','21시~22시','22시~23시','23시~24시']
    },
    {
        type: 'search',
        question: '오늘 찍은 사진은?',
        tags: ['셀카', '친구', '가족', '책', '영화', '음식','자연','물건','선물','연예인','반려동물','아기','애인','건물']
    },
    {
        type: 'search',
        question: '오늘 나를 힘들게 한 존재는?',
        tags: ['나','가족','친구','과제','교수님','상사','동료','반려동물','선생님','처음보는사람','애인','연예인','돈','취업','공부']
    }, 
    {
        type: 'button',
        question: '오늘 하루 기분이 어땠나요?',
        tags: ['매우 좋음', '좋음', '보통', '나쁨', '매우나쁨',]
    },
    {
        type: 'button',
        question: '오늘 날씨는 어땠나요?',
        tags: ['구름', '맑음', '비', '폭염', '한파', '눈']
    },
    {
        type: 'button',
        question: '오늘 학교에서 나는',
        tags: ['자습','팀플','시험','세미나','강의','과제','공부']
    },
    {
        type: 'button',
        question: '오늘 직장에서 나는',
        tags: ['회식','미팅','칼퇴','월루']
    },
 
];



/* GET. */
router.get('/init', function (req, res, next) {
    console.log('하이')
    // 태그데이터 전체삭제 후 새로 추가하기
    Tag.deleteMany({}).then(function () {
        console.log('기존 태그가 전부 삭제됨');
        Tag.insertMany(TagDataExample).then(function () {
            console.log('새로운 태그가 업데이트됨');
            res.json('정상 처리됨')
        }
        ).catch((err) => {
            console.log(err);
        });
    }
    ).catch((err) => {
        console.log(err);
    });
});



/* GET. */
router.get('/find', function (req, res, next) {
    // console.log('find tags');
    // 전체 데이터 가져오기
    Tag.find().then((tags) => {
        res.json(tags)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

router.post('/findTagsPerQuestion', function (req, res, next) {
    // 전체 데이터 가져오기
    Tag.find({_id: req.body.data.question_id}).then((tags) => {
        res.json(tags)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

/* POST*/
router.post('/save', function (req, res) {
    // console.log(req.body.data);
    // 태그 로그 데이터 저장
    const tagLogArr = req.body.data;
    TagLog.insertMany(tagLogArr, function (error, docs) {
        if (error) {
            console.log(error);
            return res.json({ status: 'fail', error })
        } else {
            console.log('Tag Log Saved!')
            return res.json({ status: 'success' })
        }
    })
});

router.post('/modify', async function (req, res) {
    // console.log(req.body.data);
    // 태그 로그 데이터 저장
    const result = await TagLog.deleteMany({ diary_id: { $eq: req.body.data.diary_id } }).exec().then(function () {
        console.log("게시글 번호 " + req.body.data.diary_id + "의 모든 태그 로그 데이터가 삭제됨."); // Success
        return "success"
    });

    if(result === "success"){
        const tagLogArr = req.body.data.tagLog;
        TagLog.insertMany(tagLogArr, function (error, docs) {
            if (error) {
                console.log(error);
                return res.json({ status: 'fail', error })
            } else {
                console.log('Tag Log Saved!')
                return res.json({ status: 'success' })
            }
        })
    } else {return res.json({ status: 'fail', error })}
});

router.post('/deleteMany/', function (req, res, next) {
    // console.log(req.body);
    // 삭제
    TagLog.deleteMany({ diary_id: { $eq: req.body.data.id } }).then(function () {
        console.log("게시글 번호 " + req.body.data.id + "의 모든 태그 로그 데이터가 삭제됨."); // Success
        return res.json({ status: 'success' })
    }).catch(function (error) {
        console.log(error); // Failure
    });

});

router.post('/getTagLog', async function (req, res, next) {
    let receivedData = req.body.data;
    console.log(receivedData);
    const tagLogs = await TagLog.aggregate([
        { $match: { $and: [{ diary_id: receivedData.diary_id }, { user_id: receivedData.user_id }] } }
    ]).exec();

    // console.log('3');
    console.dir(tagLogs);
    const result = []
    tagLogs.map((tag) => {
        result.push(tag.question_id + '-/-/-' + tag.tag);
    })
    // console.dir(re);
    res.json(result);
});

router.post('/makePersonalStatistics', function (req, res, next) {
    let receivedData = req.body.data;
    // console.log(receivedData);
    TagLog.aggregate([
        { $match: { $and: [{ question_id: receivedData.question_id }, { user_id: receivedData.user_id }] } },
        { $sortByCount: "$tag" }
    ]).then((tags) => {
        res.json(tags)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

router.post('/makeFriendsStatistics', async function (req, res, next) {
    let receivedData = req.body.data;
    // console.log('1',receivedData);
    const friendsStatisticsList = receivedData.userFollowing.map( async (friend) => {
        const statics = await TagLog.aggregate([
            { $match: { $and: [{ question_id: receivedData.question_id }, { user_id: friend }] } },
            { $sortByCount: "$tag" }
        ]).exec();
        // console.log(statics);
        return {
            id : friend,
            statics
        } ;
    });
    const result = await Promise.all(friendsStatisticsList)
    // console.log('3');
    // console.dir(result);
    res.json(result);

});

/* GET. */
router.post('/makeAnonymousStatistics', function (req, res, next) {
    let receivedData = req.body.data;
    TagLog.aggregate([
        { $match: { question_id: receivedData.question_id } },
        { $sortByCount: "$tag" }
    ]).then((tags) => {
        res.json(tags)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});


module.exports = router;