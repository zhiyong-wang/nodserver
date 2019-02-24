/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

router.get('/tianzi/:id', controllers.tianzi)
router.get('/tianzi', controllers.tianzi)


router.get('/tianzi_tmp/:id', controllers.tianzi_tmp.get)
router.post('/tianzi_tmp/:id', controllers.tianzi_tmp.post)

router.post('/tianzi_add', controllers.tianzi_add)
router.post('/tianzi_delete', controllers.tianzi_delete)

router.get('/tianzi_list/:source', controllers.tianzi_list)

router.get('/question/:id', controllers.question.get)
router.post('/question', controllers.question.post)
router.post('/question_delete', controllers.question_delete)
router.post('/question_add', controllers.question_add)

router.get('/question_list/:tags', controllers.question_list)
router.get('/question_list', controllers.question_list)



router.get('/tags_list', controllers.tags_list)
router.post('/tag_add', controllers.tag_add)
router.post('/tag_delete', controllers.tag_delete)


module.exports = router

