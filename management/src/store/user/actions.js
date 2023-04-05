import { getAllUser } from '@/api/index'

const actions = {
    async getAllUsers({ commit },param) {
        const res = await getAllUser(param)
        commit('getUserList',res.data)
    }
}
export default actions