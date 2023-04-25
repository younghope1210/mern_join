const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');
// const { Product } = require('../models/Product');

// router 핸들링

router.post('/register', (req, res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그 정보를 데이터에 넣어준다
  

    //req.bod = user.id, user.email등등이 포함됨

    const user = new User(req.body); // 모델 유저에서 스키마값 가져옴
    
    // user.save 의 save => 몽고DB에서 지원하는 메소드
    user.save(function(err, userInfo){
        if (err)
            return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });

});





// login 핸들링

router.post("/login", (req, res) => {

    // 요청된 이메일을 데이터베이스에서 찾기

    User.findOne({ email: req.body.email }, (err, user) => {//findOne = 몽고디비 메소드
        if(!user) // 찾고자 하는 이메일이 없으면 에러를 뿌린다
            return res.json({ loginSuccess: false, 
                    message: "입력하신 이메일은 가입되지 않은 이메일입니다."
                })
        
 
   // 요청한 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
   // comparePassword 메소드를 medels 폴더의 User.js에서 만듦  
   user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch){

        return req.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다"});
    }
        // 비밀번호까지 맞다면 개인별 유저만을 위한 token을 생성시킨다
        user.generateToken((err, user) => {
            if(err){
                return res.status(400).send(err);
            }

            //토큰을 저장한다 (쿠키, 로컬스토리지, 세션스토리지 등등) 
            // 쿠키에 저장 진행
        res.cookie("x_authExp", user.tokenExp);
         res.cookie("x_auth", user.token)
         .status(200)// 쿠키에 유저의 토큰 저장 성공
         .json({loginSuccess: true , userId:user._id})

          })

        }) 
    })   

})

// logout 핸들링

//로그인이 된 상태이기때문에 auth를 넣어준다 

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" } // 토큰 삭제
    , (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});





// auth 인증처리


router.get("/auth", auth, (req, res) => {

    // auth의 미들웨어를 통과된 것은 authentication이 true

 // role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 


    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
})




module.exports = router;