//index.js
var util = require('../../utils/utils.js');
const app = getApp();

Page({
  data: {
    feed: [],
    feed_length: 0
  },

  bindItemTap: function(){
    wx.navigateTo({
      url: '../answer/answer'
    })
  },

  bindQueTap: function(){
    wx.navigateTo({
      url: '../question/question'
    })
  },

  upper: function(){
    wx.showNavigationBarLoading();
    this.refresh();
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },

  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { 
      wx.hideNavigationBarLoading(); 
      that.nextLoad(); 
    }, 1000);
  },

  getData: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },

  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    var fedd_data = feed.data;
    this.setData({
      feed: fedd_data,
      feed_length: fedd_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      },3000)
    })
  },

  nextLoad: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000);
  },
  
  onLoad: function() {
    this.getData();
  },

})
