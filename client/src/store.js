import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'
// import { getMaxListeners, setMaxListeners } from 'cluster'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, data) {
      state.boards = data
    },

    setActiveBoard(state, data) {
      state.activeBoard = data
    },
    setLists(state, data) {
      state.lists = data
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.tasks)
      // state.tasks[data.listId] = data.tasks (read through vue.set docs)
    },
    resetState(state) {
      state.user = {}
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      // debugger
      // api.get('boards')
      //   .then(res => {
      //     commit('setBoards', res.data)
      //   })
      try {
        let res = await api.get('boards')
        debugger
        commit('setBoards', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getActiveBoard({ commit, dispatch }, boardId) {
      try {
        let res = await api.get(`/boards/${boardId}`)
        commit('setActiveBoard', res.data)
      } catch (error) {
        console.error(error)

      }

    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({ dispatch }, data) {
      try {
        let res = await api.delete(`/boards/${data._id}`)
        dispatch('getBoards')
        router.push({ name: 'boards' })
      } catch (error) { console.error(error) }
    },

    async backNav({ dispatch }) {
      let res = await api.get('boards')
      dispatch('getBoards')
      router.push({ name: 'boards' })
    },

    //#endregion


    //#region -- LISTS --
    async getLists({ commit, dispatch }, boardId) {
      try {
        let res = await api.get(`/boards/${boardId}/lists`)
        commit('setLists', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addList({ dispatch }, data) {
      try {
        let res = await api.post(`/lists`, data)
        dispatch('getLists', data.boardId)
      } catch (error) {
        console.error(error)

      }
    },
    async deleteList({ dispatch }, data) {
      try {
        let res = await api.delete(`/lists/${data._id}`)
        dispatch('getLists', data.boardId)
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region --TASKS--
    async getTasks({ commit, dispatch }, payload) {
      try {
        let res = await api.get(`/lists/${payload}/tasks`)
        let data = {
          listId: payload,
          tasks: res.data
        } //this is passing an object with the listId and array of tasks to the state
        commit('setTasks', data)
      } catch (error) { console.error(error) }
    },

    async addTask({ dispatch }, data) {
      try {
        let res = await api.post('/tasks', data)
        dispatch('getTasks', data.listId)
      } catch (error) { console.error(error) }
    },

    async deleteTask({ dispatch }, data) {
      try {
        let res = await api.delete(`tasks/${data._id}`)
        dispatch('getTasks', data.listId)
      } catch (error) { console.error(error) }
    },
    async moveTask({ commit, dispatch }, task) {
      try {
        let res = await api.put(`tasks/${task._id}`, task)
        // dispatch('getTasks', task.listId)
        // dispatch('getTasks', task.listId)
      } catch (error) { console.error(error) }
    },
    //set task to new listId
    //#endregion

    //#region --COMMENTS--

    async addComment({ dispatch }, data) {
      try {
        let res = await api.post(`tasks/${data.taskId}/comments`, data)
        dispatch('getTasks', data.listId)

      } catch (error) {
        console.error(error)

      }
    },
    async deleteComment({ dispatch }, data) {
      try {
        let res = await api.put(`tasks/${data.taskId}/comments`, data)
        dispatch('getTasks', data.listId)
      } catch (error) {
        console.error(error)

      }
    }

    //#endregion
  }
})