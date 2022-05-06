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

/* POST*/
router.post('/save', function(req, res) {
    // console.log(req.body.data);
    // 태그 로그 데이터 저장
    const tagLogArr = req.body.data;
    TagLog.insertMany(tagLogArr, function(error, docs) {
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Tag Log Saved!')
            return res.json({status: 'success'})
        }
    })
});




module.exports = router;