// component/topnav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navlist:{
      type:Array,
      value: [{
        cateName: '全部',
        cateId: 0
      }]
    },
    currentIndex:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex:0,
    isSimpleArr:false
  },

  ready:function(){
    console.log(this)
    let isSimpleArr = Array.isArray(this.data.navlist[0]) ? false : true
    this.setData({
      isSimpleArr: isSimpleArr,
      tabIndex: this.data.currentIndex
    })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tab: function(e){
      this.setData({
        tabIndex: e.target.dataset.index
      })
      this.triggerEvent('navitemtap', { id: e.target.dataset.id})
    }
  }
})
