// component/sideNav/sideNav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items:{
      type: Array,
      value: [
        {
          cateName: '全部',
          cateId: 0
        }
      ]
    },
    hidden:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: false,
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reset(){
      this.setData({
        currentIndex: 0
      })
      this.triggerEvent('reset')
    },
    close(){
      this.setData({
        hidden: true
      })
      this.triggerEvent('close')
    },
    filtrateCate(e){
      this.setData({
        currentIndex: e.currentTarget.dataset.id
      })
      this.triggerEvent('item',{id:e.currentTarget.dataset.id})
    }
  }
})
