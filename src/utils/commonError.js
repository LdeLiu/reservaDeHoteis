class CommonError{
    static build(message){
        return {
            error: true,
            message
        }
    }
}

export {CommonError}