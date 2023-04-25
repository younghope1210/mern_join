const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
// 이미지 저장 처리
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config()

// 클라우드너리 사용

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: "samples",
        },
      });
        
      const upload = multer({ storage: storage }).single("file")

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     }
// })

// var upload = multer({ storage: storage }).single("file")


// 이미지 파일 업로드

router.post('/image', (req, res) => {

    //가져온 이미지를 저장을 해준다

    upload(req, res, err => {
        if(err){
          return req.json({ success: false, err })
        } return res.json({ success: true, filePath:res.req.file.path, fileName: res.req.file.filename})
    }) 

})


// 상품 업로드

router.post('/', (req, res) => {

    //client단 상품 업로드 페이지에서 body로 받아온 상품 정보를 DB에 넣어준다

    const product = new Product(req.body)

    product.save((err) => {

        if(err) return res.status(400).json({ success:false, err })
        return res.status(200).json({ success: true})

    })
})

// DB에 저장된 상품을 랜딩 페이지에 가져오기

router.post('/products', (req,res) => {

    // product collection에 들어있는 상품 가져오기
   // parseInt = string인 경우 number로 바꿔준다

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip= req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;

// 서치창에 검색한 값이 있다면?

    if(term) {

        Product.find() //Product models에서 찾음

        .find({ $text: {$search: term }}) // **서치창에 검색한 값이 있다면 find 실행**

        .populate("writer") // 등록한 사람의 모든 정보를 가져온다
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => { //.exec =  쿼리를 돌린다
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ 
                success: true, productInfo,
                postSize: productInfo.length 
            })
        })


// 서치창에 검색한 값이 없다면?

    } else{

        Product.find() //Product models에서 찾음
        .populate("writer") // 등록한 사람의 모든 정보를 가져온다
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => { //.exec =  쿼리를 돌린다
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ 
                success: true, productInfo,
                postSize: productInfo.length 
            })
        })

    }

  

})


// 상품 상세페지이 가져오기


router.get('/products_by_id', (req,res) => {

//productID 를 이용해서 DB에서 productID와 같은 상품의 정보를 가져온다
// axios.get(`/api/product/products_by_id?id=${productId}&type=single`)

    let type = req.query.type
    let productIds = req.query.id


    // productIds = ['3421234124','563865345','7889482304'] 이렇게 배열에 넣음

    if(type === "array"){
        let ids = req.query.id.split(',')

        productIds = ids.map(item => {
            return item
        })
    }

    Product.find({_id: {$in:productIds} })
    .populate("writer")

    .exec((err, product) => { //.exec =  쿼리를 돌린다
        if(err) return res.status(400).send( err)
        return res.status(200).send(product)
    })


})

module.exports = router;