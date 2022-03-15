export interface UserRequest {
    username?:string|null
    password?:string|null
}

export interface UserLoginResponse{
    status:string
    jsonapi:string
    self:string
    data:{
        user:string,
        message:string
    }
}

export interface ErrorApi {
    status:string
    jsonapi:string
    self:string
    error:ErrorData
}


interface ErrorData{
    status:number
    title:string
    description:string
}