import { IUser } from "../types"
import { instance } from "./instance"

const api = {
    async getUsers() {
        const res = await instance.get('auth/users')
        return res
    },
    async registration(user: IUser) {
        const res = await instance.post('/auth/register', user)
        console.log(res);

        return res
    },
    async login(credentilas: any) {
        const res = await instance.post('/auth/login', credentilas)
        console.log(res);

        return res
    },
    async deleteUser(username: string) {
        const res = await instance.delete('/auth/user/' + username)
        return res
    },
    async refreshToken() {
        const res = await instance.get("/auth/check")
        return res
    },
    async setStatus(stat: "Banned" | "Not banned", username: string) {
        const res = await instance.put('/status/', { stat, username })
        return res
    }
}


export default api