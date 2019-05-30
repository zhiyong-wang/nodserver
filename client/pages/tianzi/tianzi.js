// pages/tianzi/tianzi.js
//var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    zimi: [],
    qipan: [100],
    question_show:true,
    answer:[],
    dqzimi_index:0,   //当前操作的字谜索引
    toview:"i_0",
    force_index: 0  //input处焦点的索引
  },

//--下面的 setzimi 函数，接受若干的数组，按照字谜坐标把字谜放入表格中-- >
  setZimi : function (zimi) {
   let qipan=[];
    for (let i = 0; i < 100; i++) {
           qipan[i] ="";
    }
    for (let i = 0; i < zimi.length; ++i) {       //按字谜的索引顺序依次设置字谜的网格如何显示
      let zb = Number(zimi[i].zb);                   //字谜的坐标
      if (zimi[i].zongheng==1) {                    //判断字谜纵横属性
        for (let j = zb,k = 0; k < zimi[i].midi.length; j++ , k++) {
            qipan[j]= {
              zimi_index: i,
              zimi_index1: -1,
              css_class: "box-item1"
            };
            }        
      }
      else {
        let zb = Number(zimi[i].zb);
        for (let j = zb,k=0; k < zimi[i].midi.length; j=j+10 , k++) {
          if (qipan[j] == "") {
              qipan[j]= {
              zimi_index: i,
              zimi_index1: -1,
              css_class:"box-item1"                    //对应字谜的数组序号
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
     for (let j = 0; j < this.data.zimi.length; j++) {
      if (!this.data.zimi[j].jiejue) {
        this.setData({ "dqzimi_index": j });
        this.range_glxs(j);                                //高亮显示选中的字迷
        this.question_glxs(j);
        break;
      }
    }  
    

  },
  choose_range:function(event){
    var zb = Number(event.currentTarget.dataset.zb);    //选中的网格坐标
    var index = this.data.qipan[zb].zimi_index;        //选中的网格坐标所在字谜的索引
    if (this.data.toView!='i_'+index){
      this.range_glxs(index);                                //高亮显示选中的字迷
      this.question_glxs(index);
      this.setData({ "question_show": true });
      this.setData({ "dqzimi_index": index })
    }
    else{
      if(this.data.qipan[zb].zimi_index1>0){
        index =this.data.qipan[zb].zimi_index1;
        this.range_glxs(index);                                //高亮显示选中的字迷
        this.question_glxs(index);
        this.setData({ "dqzimi_index": index })
         }
      else{
        this.setData({ "question_show": false });
        this.setData({ "dqzimi_index": index });
        this.set_input(index);

      }
    } 
  },
set_input:function(index){
  var input_answer= new Array(this.data.zimi[index].midi.length); 
  var zb =this.data.zimi[index].zb    //字谜的的第一个字的坐标
  for (var i = 0;i<this.data.zimi[index].midi.length;i++){
    if(this.data.zimi[index].zongheng==1) {       //在输入处显示已经在棋盘上解决的字
      if (this.data.qipan[zb + i].zimi_index1 > 0 && this.data.zimi[this.data.qipan[zb + i].zimi_index1].jiejue){
          input_answer[i]=this.data.zimi[index].midi[i]
          }
        else { input_answer[i]=""}
     }
    else{
      if (this.data.zimi[this.data.qipan[zb + i*10].zimi_index].jiejue) {
        input_answer[i] = this.data.zimi[index].midi[i]
      }
      else { input_answer[i] = "" }
    }  
  }
  for (var i = 0; i <input_answer.length; i++) {
    if (input_answer[i] == "" || i == input_answer.length-1) {
       this.setData({ "force_index": i});
      break;
     };
  } 
  this.setData({ "answer": input_answer});
},

set_input_force: function (event){
  var idx =event.currentTarget.dataset.key;
  if (this.data.answer[idx] == "" ||this.data.answer[idx].charCodeAt(0) < 255){
  this.setData({ "force_index": idx });
}

},


range_glxs: function(index) {                               //选中的字谜网格高亮显示
    let zimi_index = index;
    let j = this.data.zimi[zimi_index].zb;                                   //选中字谜的第一个子的坐标
    let qipan=this.data.qipan;            //因为无法直接单独设置range属性，建立一虚拟qipan变量等于目前棋盘
    for (let i=0;i<100;i++){                               //以前高亮的网格回复正常显示
      if (qipan[i].css_class=="box-item2")
        {qipan[i].css_class="box-item1"
        }
    };
    if (this.data.zimi[zimi_index].zongheng == 1){   //如字谜坐标属性为横，设置字谜网格高亮显示
      for (let i =0; i < this.data.zimi[zimi_index].midi.length;i++,j++){
           qipan[j].css_class= "box-item2" ;
      }
    }
    else {
      for (let i = 0; i < this.data.zimi[zimi_index].midi.length; i++,j=j+10) {
           qipan[j].css_class = "box-item2";
      }
    }   
    this.setData({ "qipan": qipan}) 
    
  },
choose_question:function(event){                                     
      var index = event.currentTarget.dataset.index;  //选择的字谜索引
      if(index==this.data.dqzimi_index){
        this.setData({ "question_show":false });
        this.set_input(index);
      }
      else{  
        this.question_glxs(index);
        this.range_glxs(index);
        this.setData({ "dqzimi_index": index })
        }
  },


  question_glxs:function(index){          //选中的字谜谜面突出显示。
    this.setData({
      toView: "i_" + index
    });   
  },


  tapzimu:function(event){
    var key= String(event.currentTarget.dataset.key);     
    switch(key){
      case "backspace" :
        {if (this.data.force_index == 0){
          this.setData({ "force_index": 0 }); 
          }
        else{
          this.setData({ "force_index": this.data.force_index-1 }); 
          }; 
        };
        break;
      case "back":
        {
          this.setData({ "question_show": true });  
      
        };
      case "cancel":{
        var input_answer = this.data.answer;
        for(var i=0;i<input_answer.length;i++){
          if (input_answer[i].charCodeAt(0) < 255 ){
            input_answer[i]="";
          }
        } 
          this.setData({ "answer": input_answer });
          break;
      };
      case "ok": {
        var input_answer = this.data.answer;
        for (var i = 0; i < input_answer.length; i++) {
          var answer = this.data.zimi[this.data.dqzimi_index].answer.match(/Sh|Zh|Ch|[A-Z]/g);          
          if (input_answer[i] != answer[i] && input_answer[i] != this.data.zimi[this.data.dqzimi_index].midi[i]){
              wx.showToast({
                title: '好像不大对',
                icon: 'none',
                duration: 1000
              });
              break;
            }
          if(i==input_answer.length-1){
            wx.showToast({
              title: '恭喜你答对了',
              icon: 'none',
              duration: 1000
            });
            var zm= this.data.zimi;
            zm[this.data.dqzimi_index].jiejue=true;
            this.setData({ "question_show": true });
            this.setData({ "zimi": zm });
            for(var j=0;j<this.data.zimi.length;j++){
              if(!this.data.zimi[j].jiejue){
              this.question_glxs(j);
              this.range_glxs(j);
              this.setData({ "dqzimi_index": j });
              break; 
              }
            }
          }
        }
      break; 
      };
      default:
      {   var input_answer = this.data.answer;
          var force = this.data.force_index;
          input_answer[force] = key;
          force=(this.data.force_index == input_answer.length - 1)?force:force+1
          while (input_answer[force].charCodeAt(0) > 255 ){ //如果是汉字则证明此单元格已解决，跳到下个输入格
            if(force == input_answer.length - 1){
              force=0;
              break;
            };
            force++;
          }      
          this.setData({ "answer": input_answer });
          this.setData({ "force_index":force });
      }    
    } 
  },



requestZimi:function(){
  let zimi;
  wx.cloud.init({
    env: 'tianzi'
  })
  const db = wx.cloud.database()
  db.collection('tianzi').doc('5cebea3ce7d612d0f0a362c1')
  .get().then(res => {
    console.log(res.data)
    zimi = res.data.data;
    for (let i = 0; i < zimi.length; i++) {
      zimi[i].jiejue = false;
    }
    this.setZimi(zimi);
  }).catch(err => {
    console.log("error: " + err)
  })


},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
   
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
    let value = wx.getStorageSync('key')
    if (value) {
      this.data = wx.getStorageSync('key')
      this.setZimi(this.data.zimi);
      // Do something with return value
    }
    else {
      this.requestZimi();
    }

   // } catch (e) {
   //}

   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorage({
      key: "key",
      data: this.data
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
  onShareAppMessage: function () {
  
  }
})