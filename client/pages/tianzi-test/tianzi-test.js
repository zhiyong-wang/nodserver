// pages/tianzi/tianzi.js
//var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userId:'',
    myavatarUrl: './user-unlogin.png',
    hasUserInfo: false,
    zimi: [],
    qipan: [100],
    question_show: true,
    question_h: [],
    question_z: [],
    answer: [],
    dqzimi_index: 0,   //当前操作的字谜索引
    force_index: 0,  //input处焦点的索引
    help: [] = [2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    help_image1: "https://7469-tianzi-0nhcd-1256128108.tcb.qcloud.la/02_24.png?sign=0c438e85fd7e1a1bd40bd4248bed365c&t=1566268280",
    help_image2: "https://7469-tianzi-0nhcd-1256128108.tcb.qcloud.la/image/01_14.png?sign=0c438e85fd7e1a1bd40bd4248bed365c&t=1566268280",
    showModal:false, //授权模板
    netRoom_id:"",
  },

  bindChange_h: function (e) {
    var question_index = e.detail.value //选择的字谜索引
    let index = this.data.question_h[question_index].zimi_index
    this.question_glxs(index);
    this.range_glxs(index);
    this.setData({ "dqzimi_index": index })

  },
  bindChange_z: function (e) {
    var question_index = e.detail.value
    var index = this.data.question_z[question_index].zimi_index //选择的字谜索引
    this.question_glxs(index);
    this.range_glxs(index);
    this.setData({ "dqzimi_index": index })

  },


  //--下面的 setzimi 函数，接受若干的数组，按照字谜坐标把字谜放入表格中-- >
  setZimi: function (zimi,net_change=true) {
    console.log("start")
    let qipan = [];
    for (let i = 0; i < 100; i++) {
      qipan[i] = "";
    }
    for (let i = 0; i < zimi.length; ++i) {       //按字谜的索引顺序依次设置字谜的网格如何显示
      let zb = Number(zimi[i].zb);                   //字谜的坐标
      if (zimi[i].zongheng == 1) {                    //判断字谜纵横属性
        for (let j = zb, k = 0; k < zimi[i].midi.length; j++ , k++) {
          qipan[j] = {
            zimi_index: i,
            zimi_index1: -1,
            css_class: "box-gray"
          };
        }
        this.data.hx_length = i + 1
      }
      else {

        let zb = Number(zimi[i].zb);
        for (let j = zb, k = 0; k < zimi[i].midi.length; j = j + 10, k++) {
          if (qipan[j] == "") {
            qipan[j] = {
              zimi_index: i,
              zimi_index1: -1,
              css_class: "box-gray"                    //对应字谜的数组序号
            };
          }
          else {
            qipan[j].zimi_index1 = i
          }
        }
      }
    };
    this.setData({ "qipan": qipan });
    this.setData({ "zimi": zimi });
    let question_h = []
    let question_z = []
    for (let j = 0; j < this.data.zimi.length; j++) {
      if (this.data.zimi[j].zongheng == 1 && !this.data.zimi[j].jiejue) {
        question_h.push({ "detail": this.data.zimi[j].question, "zimi_index": j });
      }
      else {
        if (!this.data.zimi[j].jiejue) {
          question_z.push({ "detail": this.data.zimi[j].question, "zimi_index": j });
        }
      }
    }
    this.setData({
      "question_h": question_h,
      "question_z": question_z
    })


    for (let j = 0; j < this.data.zimi.length; j++) {
      if (!this.data.zimi[j].jiejue) {
        this.setData({ "dqzimi_index": j });
        this.range_glxs(j);                                //高亮显示选中的字迷
        this.question_glxs(j);
        break;
      }
    }
    if(this.data.netRoom_id!=""&&net_change==true){
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'updateRoom',
        // 传递给云函数的event参数
        data: {
          room_id:this.data.netRoom_id,
          zimi: this.data.zimi,
        }
      }).catch(err => {
        console.log("error: " + err) // handle error
      })  
  
    }
  },
 

  choose_range: function (event) {
    var zb = Number(event.currentTarget.dataset.zb);    //选中的网格坐标
    var index = this.data.qipan[zb].zimi_index;        //选中的网格坐标所在字谜的索引
    if (this.data.dqzimi_index != index) {
      this.range_glxs(index);                                //高亮显示选中的字迷
      this.question_glxs(index);
      this.setData({ "question_show": true });
      this.setData({ "dqzimi_index": index })
    }
    else {
      if (this.data.qipan[zb].zimi_index1 > 0) {
        index = this.data.qipan[zb].zimi_index1;
        this.range_glxs(index);                                //高亮显示选中的字迷
        this.question_glxs(index);
        this.setData({ "dqzimi_index": index })
      }
      else {

        this.setData({ "question_show": false });
        this.setData({ "dqzimi_index": index });
        this.set_input(index);

      }
    }
  },
  longpress_range: function (event) {
    var zb = Number(event.currentTarget.dataset.zb);    //选中的网格坐标
    var index_h = this.data.qipan[zb].zimi_index;
    var index_z = this.data.qipan[zb].zimi_index1;
    var index = (index_h == this.data.dqzimi_index ? index_h : index_z)
    this.range_glxs(index);
    this.setData({ "question_show": false });
    this.setData({ "dqzimi_index": index });
    this.set_input(index);

  },
  set_input: function (index) {
    var input_answer = new Array(this.data.zimi[index].midi.length);
    var zb = this.data.zimi[index].zb    //字谜的的第一个字的坐标
    for (var i = 0; i < this.data.zimi[index].midi.length; i++) {
      if (this.data.zimi[index].zongheng == 1) {       //在输入处显示已经在棋盘上解决的字
        if (this.data.qipan[zb + i].zimi_index1 > 0 && this.data.zimi[this.data.qipan[zb + i].zimi_index1].jiejue) {
          input_answer[i] = this.data.zimi[index].midi[i]
        }
        else { input_answer[i] = "" }
      }
      else {
        if (this.data.zimi[this.data.qipan[zb + i * 10].zimi_index].jiejue) {
          input_answer[i] = this.data.zimi[index].midi[i]
        }
        else { input_answer[i] = "" }
      }
    }
    for (var i = 0; i < input_answer.length; i++) {
      if (input_answer[i] == "" || i == input_answer.length - 1) {
        this.setData({ "force_index": i });
        break;
      };
    }
    this.setData({ "answer": input_answer });
  },

  set_input_force: function (event) {
    var idx = event.currentTarget.dataset.key;
    if (this.data.answer[idx] == "" || this.data.answer[idx].charCodeAt(0) < 255) {
      this.setData({ "force_index": idx });
    }

  },


  range_glxs: function (index) {                               //选中的字谜网格高亮显示
    let zimi_index = index;
    let j = this.data.zimi[zimi_index].zb;                                   //选中字谜的第一个子的坐标
    let qipan = this.data.qipan;            //因为无法直接单独设置range属性，建立一虚拟qipan变量等于目前棋盘
    for (let i = 0; i < 100; i++) {                               //以前高亮的网格回复正常显示
      if (qipan[i].css_class == "box-light") {
        qipan[i].css_class = "box-gray"
      }
    };
    if (this.data.zimi[zimi_index].zongheng == 1) {   //如字谜坐标属性为横，设置字谜网格高亮显示
      for (let i = 0; i < this.data.zimi[zimi_index].midi.length; i++ , j++) {
        qipan[j].css_class = "box-light";
      }
    }
    else {
      for (let i = 0; i < this.data.zimi[zimi_index].midi.length; i++ , j = j + 10) {
        qipan[j].css_class = "box-light";
      }
    }
    this.setData({ "qipan": qipan })

  },
  choose_question: function (i) {
    var index = i.currentTarget.dataset.key.zimi_index;  //选择的字谜索引
    //console.log(i.currentTarget.dataset.key.zimi_index)
    if (index == this.data.dqzimi_index) {
      this.setData({ "question_show": false });
      this.set_input(index);
    }
    else {
      this.question_glxs(index);
      this.range_glxs(index);
      this.setData({ "dqzimi_index": index })
    }
  },


  question_glxs: function (index) {          //选中的字谜谜面突出显示。     


    if (index <= Number(this.data.question_h.length)) {
      for (let i = 0; i < this.data.question_h.length; i++) {
        if (index == this.data.question_h[i].zimi_index) {
          this.setData({
            value_h: [i]
          })
        }
      }
    }
    else {
      for (let i = 0; i < this.data.question_z.length; i++) {
        if (index == this.data.question_z[i].zimi_index) {
          this.setData({
            value_z: [i]
          })
        }
      }
    }
  },

  tapzimu: function (event) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'tap.wav'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    var key = String(event.currentTarget.dataset.key);
    switch (key) {
      case "backspace":
        {
          if (this.data.force_index == 0) {
            this.setData({ "force_index": 0 });
          }
          else {
            this.setData({ "force_index": this.data.force_index - 1 });
          };
        };
        break;
      case "back":
        {
          this.setData({ "question_show": true });

        };
      case "cancel": {
        var input_answer = this.data.answer;
        for (var i = 0; i < input_answer.length; i++) {
          if (input_answer[i].charCodeAt(0) < 255) {
            input_answer[i] = "";
          }
        }
        this.setData({ "answer": input_answer });
        break;
      };
      case "ok": {
        var input_answer = this.data.answer;
        for (var i = 0; i < input_answer.length; i++) {
          var answer = this.data.zimi[this.data.dqzimi_index].answer.match(/Sh|Zh|Ch|[A-Z]/g);
          if (input_answer[i] != answer[i] && input_answer[i] != this.data.zimi[this.data.dqzimi_index].midi[i]) {
            wx.showToast({
              title: '好像不大对',
              icon: 'none',
              duration: 1000
            });
            break;
          }
          if (i == input_answer.length - 1) {
            wx.showToast({
              title: '恭喜你答对了',
              icon: 'none',
              duration: 1000
            });
            var zm = this.data.zimi;
            zm[this.data.dqzimi_index].jiejue = true;
            this.setData({ "question_show": true });
            this.setData({ "zimi": zm });
            this.setZimi(this.data.zimi);
          }
        }
        break;
      };
      default:
        {
          var input_answer = this.data.answer;
          var force = this.data.force_index;
          input_answer[force] = key;
          force = (this.data.force_index == input_answer.length - 1) ? force : force + 1
          while (input_answer[force].charCodeAt(0) > 255) { //如果是汉字则证明此单元格已解决，跳到下个输入格
            if (force == input_answer.length - 1) {
              force = 0;
              break;
            };
            force++;
          }
          this.setData({ "answer": input_answer });
          this.setData({ "force_index": force });
        }
    }
  },

  requestZimi: function () {
    let zimi
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'selectzimi',
      // 传递给云函数的event参数
      data: {
        //  x: 1,
        // y: 2,
      }
    }).then(res => {
      zimi = res.result.data
      //console.log(zimi)
      for (let i = 0; i < zimi.length; i++) {
        zimi[i].jiejue = false;
      }
      this.setZimi(zimi);
      wx.removeStorage({
        key: 'tianzi',
        success(res) {
          console.log(res)
        }
      })
    }).catch(err => {
      console.log("error: " + err) // handle error
    })
  },

  help1: function () {
    let self = this
    let selectedzimi = this.data.zimi[this.data.dqzimi_index]
    console.log(selectedzimi)
    wx.showModal({
      title: '帮助',
      content: '是否显示"' + selectedzimi.question + '"的答案',
      success(res) {
        if (res.confirm) {
          self.data.zimi[self.data.dqzimi_index].jiejue = true
          self.setZimi(self.data.zimi)
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  help2: function () {
    let self = this
    wx.showModal({
      title: '帮助',
      content: '是否随机解决一个问题？',
      success(res) {
        if (res.confirm) {
          self.suiji_zimi()
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  suiji_zimi: function () {
    let zimi_beixuan = []
    for (let i in this.data.zimi) {
      if (!this.data.zimi[i].jiejue) { zimi_beixuan.push(i) }
    }
    console.log(zimi_beixuan)
    let index = zimi_beixuan[Math.floor((Math.random() * zimi_beixuan.length))]
    this.data.zimi[index].jiejue = true
    wx.showToast({
      title: '问题"' + this.data.zimi[index].question + '"的答案是"' + this.data.zimi[index].midi + '".',
      icon: 'none',
      duration: 3000
    });
    this.setZimi(this.data.zimi)

  },
  
  showMask: function () {
    this.setData({
      showModal: true
    })
    console.log("show")
  },
   
  maskCancel:function(){
    console.log("cancle")
  }, 
  maskConfirm: function (e) {
    console.log(e.detail.userInfo)
    this.setData({
      myavatarUrl:e.detail.userInfo.avatarUrl,
      hasUserInfo: true
    })
    app.globalData.userInfo = e.detail.userInfo
    wx.cloud.callFunction({
      name: 'updateUser',
      data: {
        user: e.detail.userInfo,
      },
      complete: res => {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option.id)  
      wx.getSetting({
      success:res=> {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res=>{
              console.log(app.globalData.userInfo)
              this.setData({
                userId: app.globalData.userInfo.openid,
                myavatarUrl: res.userInfo.avatarUrl,
                hasUserInfo: true
              })              
            }
          })
        }
              }
    })
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.setData({ "zimi": this.data.zimi })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // try {
    let value = wx.getStorageSync('tianzi')
    if (value) {
      this.data.zimi = wx.getStorageSync('tianzi')
      console.log(this.data)
      this.setZimi(this.data.zimi);
      // Do something with return value
    }
    else {
      this.requestZimi();
    }

    // } catch (e) {
    //}
    wx.showShareMenu({
      withShareTicket: true
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorage({
      key: "tianzi",
      data: this.data.zimi
    })
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorage({
      key: "tianzi",
      data: this.data.zimi
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestZimi();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log(this.data.netRoom_id)
      if(this.data.netRoom_id==""){
        console.log("creatroom")
         this.creatRoom()
       }
      else{this.onWatch_in_Room()}
    }
    return {
      title: '和我一同填字吧',
      path: 'pages/tianzi-text/index?id='+this.netRoom_id
    }

  },
 
 
  creatRoom: function () {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'creatRoom',
      // 传递给云函数的event参数
      data: {
        zimi: this.data.zimi,
      }
    }).then(res => {
      let ddd = res.result._id
      console.log(ddd)
      this.setData({ netRoom_id: res.result._id});
      this.onWatch_in_Room()

      wx.removeStorage({
        key: 'tianzi',
        success(res) {
          console.log(res)
        }
      })
    }).catch(err => {
      console.log("error: " + err) // handle error
    })  

  },
  onWatch_in_Room:function(){   

    db.collection('gamerooms').doc(this.data.netRoom_id).get().then(res => {
      console.log(res.data)
    })
    this.messageListener = db.collection('gamerooms')
       .where({ _id: _.eq( this.data.netRoom_id)})
        .watch({
        onChange:  snapshot=> {
          console.log('docs\'s changed events', snapshot)
          let changeuser = snapshot.docs[0].last_change_userId
          if (snapshot.type != 'init' && changeuser!= this.data.userId){
            this.setZimi(snapshot.docs[0].zimi,false)
            console.log('query result snapshot after the event', snapshot.docs)
          }
          console.log('is init data', snapshot.type === 'init')
        },
        onError: (err) => {
          this.onWatch_in_Room()
         // console.error(err)
          
        }
      })   

  }




})