// component/modelPrompt.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideModel: {
      type: Boolean,
      value: true
    },
    inputType: {
      type: String,
      value: 'text'
    },
    placeholder: {
      type: String,
      value: '请输入'
    },
    title: {
      type: String,
      value: '提示'
    },
    content: {
      type: String,
      value: ''
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputvalue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    saveinputvalue(e){
      this.setData({
        inputvalue: e.detail.value
      })
    },
    cancel: function(){
      this.setData({
        hideModel: true
      })
    },
    tap: function () {
      this.setData({
        hideModel: true
      })
      this.triggerEvent('confirmprice', { value: this.data.inputvalue})
    }
  }
})
