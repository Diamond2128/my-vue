import Vue from 'vue'
const state = {
  orderList:[],
  params:{}
}

const getters = {
  getOrderList:state => state.orderList
}


const mutations = {
  updateOrderList(state,payload){
    state.orderList = payload
  },
  updateParams(state,payload){//  (state,{key,val})
    state.params[payLoad.key] = payload.val
    console.log(state.params)
  }
}

const actions = {
  fetchOrderList ({commit,state}){
    Vue.http.post('/api/getOrderList',state.params)
      .then((res)=>{
      commit('updateOrderList',res.data.list)
      },(err)=>{

      })
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
