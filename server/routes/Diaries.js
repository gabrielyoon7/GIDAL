const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Diary } = require("../models/Diary");

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Diary.find().then( (diaries) => {
        res.json(diaries)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.post('/findOwn', function(req, res, next) {
    // console.log(req.body.data.user_id);
    // 전체 데이터 가져오기
    Diary.find().where('user_id').equals(req.body.data.user_id).sort({date: -1}).then( (diaries) => {
        res.json(diaries)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.post('/findOwnPerMonth', function(req, res, next) {
    // console.log(req.body.data.month);
    const min = req.body.data.year + '-' + req.body.data.month + '-01';
    const max = req.body.data.year + '-' + req.body.data.month + '-31';
    console.log(min)
    console.log(max)
    const startDate = new Date(min);
    const endDate = new Date(max)
    // 전체 데이터 가져오기
    Diary.aggregate([
        { $match: { $and: [{ user_id: req.body.data.user_id }, { date: { $gte: startDate } }, { date: { $lte: endDate }}] } },
        { $sort: { date: -1 } }
    ]).then((diaries) => {
        console.log(diaries)
        res.json(diaries)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

/* POST*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newDiary = new Diary(req.body.data);
    newDiary.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success', id:data._id})
        }
    });
});

/* POST*/
router.post('/saveTemp', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newDiary = new Diary(req.body.data);
    newDiary.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

//작동하는지 확인 안해봄
router.post('/findOne/', function(req, res, next) {
    console.log(req.body);
    // 특정 아이디값 가져오기
    Diary.findOne({_id:req.body.id}, function(error,diary){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            console.log(diary);
        }
    });
});

router.post('/findPublic', function(req, res, next) {
    // 전체 데이터 가져오기
    Diary.find().where('disclosure').equals('public').sort({date: -1}).then( (diaries) => {
        res.json(diaries)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.post('/modify', function(req, res, next) {
    const diary = req.body.data;
    console.log(diary);
    // 데이터 수정
    Diary.findOneAndUpdate({_id: diary._id}, {$set:{user_id:diary.user_id, date:diary.date, title:diary.title, content:diary.content, disclosure:diary.disclosure}}, function(error, data){
        console.log('--- UPDATE ---');
        if(error){
            console.log(error);
        }
        console.log('--- updated ---');
        Diary.findOne({_id: diary._id}, function(error,diary){
            console.log('--- Read one ---');
            if(error){
                console.log(error);
            }else{
                console.log(diary);
                return res.json(diary)
            }
        });
        // return res.json({status: 'fail'})
    });
});


router.post('/modifyLikeCount', function(req, res, next) {
    const diaryInfo = req.body.data;
    console.log(diaryInfo.id);
    Diary.updateOne(
        { '_id': diaryInfo.id },
        { $set: {'likes': diaryInfo.likes, 'likers': diaryInfo.likers} }).exec((error, todo) => {
            if (error) {
                console.log(error);
                return res.json({ status: 'error', error })
            } else {
                console.log('modified!')
                return res.json({ status: 'success' })
            }
        });
});

//작동하는지 확인 안해봄
router.post('/delete/', function(req, res, next) {
    console.log(req.body);
    // 삭제
    Diary.deleteOne({_id: req.body.data.id}, function(error,output){
        console.log('--- Delete ---');
        if(error){
            console.log(error);
        }

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
            이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
            */
        console.log('--- deleted ---');
        return res.json({status: 'success'})
    });
});

router.post('/deleteMany/', function(req, res, next) {
    // console.log(req.body);
    // 삭제
    Diary.deleteMany({ user_id: { $eq: req.body.data.id } }).then(function(){
        console.log(req.body.data.id+"의 모든 데이터가 삭제됨."); // Success
        return res.json({status: 'success'})
    }).catch(function(error){
        console.log(error); // Failure
    });

});

router.post('/modifyComment', function(req, res, next) {
    const commentInfo = req.body.data;
    console.log(commentInfo.id);
    Diary.updateOne(
        { _id: commentInfo.id }, 
        {$push: {comments: {
            "user_id": commentInfo.user_id, 
            "comment": commentInfo.comment,
        }}}).exec((error, family)=>{
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'Success'})
            }
        });
});

module.exports = router;