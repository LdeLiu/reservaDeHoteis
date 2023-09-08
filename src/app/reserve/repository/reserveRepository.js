class ReserveRepository{
    constructor(model){
        this.model = model
    }

    create(data){
        return this.model.create(data)
    }

    findById(_id){
        return this.model.findOne({_id})
    }

    delete(_id){
        return this.model.deleteOne({_id})
    }
}

export {ReserveRepository}