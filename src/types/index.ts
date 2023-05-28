export interface IUser {
    _id?: string
    username: string
    password: string
    email: string
    registred?: string
    lastEnterance?: string
    status: 'Not-blocked' | 'Blocked'

}
export interface IState {
    usersState: {
        users: Array<IUser>
        loader: boolean
        error: boolean | string
    },
    authState: {
        isAuth: boolean
        user: IUser
        token: string
        error: boolean | string
        loader: boolean
        message?: string
    }

}