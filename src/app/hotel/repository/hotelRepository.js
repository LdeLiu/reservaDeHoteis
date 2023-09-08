class HotelRepository{
    constructor(model){
        this.model = model;
    }

    create(data){
        return this.model.create(data)
    }

    findById(_id){
        return this.model.findOne({_id})
    }

    findHotel(name,address){
        return this.model.findOne({name,address})
    }

    updateRooms(_id,value){
        return this.model.findOneAndUpdate({_id},{avaliableRooms: value})
    }
    
}

export{HotelRepository}