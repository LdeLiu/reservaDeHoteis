class UserRepository{
    constructor(model){
        this.model = model;
    }

    create(data){
        return this.model.create(data)
    }

    findByEmail(email){
        return this.model.findOne({email})
    }

    findById(_id){
        return this.model.findOne({_id}).populate('reserves')
    }

    addReserves(_id, reserve){
        return this.model.findOneAndUpdate({_id},{$push: {reserves: reserve}})
    }

    removeReserve(_id, reserveId){
        return this.model.findOneAndUpdate({_id},{$pull: {reserves: reserveId}})
    }
}

export {UserRepository}