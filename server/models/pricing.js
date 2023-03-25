class PricingModule {
    constructor(address, deliveryDate, gallonsReq, pricePerGallon, total){
        this.address = address;
        this.deliveryDate = deliveryDate;
        this.gallonsReq = gallonsReq;
        this.pricePerGallon = pricePerGallon;
        this.total = total;
    }
    
    totalPrice() {
        return this.total;
    }
    // calculatePrice(){
        //do calculation for pricing here
    // }

}

module.exports = PricingModule;