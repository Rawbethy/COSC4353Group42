class PricingModule {
    constructor(gallonsReq){
        this.location = .04;
        this.history = .01;
        this.above = .03;
        this.profit = .1;
        this.gallonsReq = gallonsReq;
        this.pricePerGallon = 0
        this.total = 0
    }

    update(gallonsReq, location, history, above) {
        this.location = location;
        this.history = history;
        this.above = above;
        this.gallonsReq = gallonsReq;
    }

    calc() {
        console.log(this.above)
        let margin = 1.50 * (this.location - this.history + this.above + this.profit);
        this.pricePerGallon = 1.50 + margin;
        this.total = this.gallonsReq * this.pricePerGallon;
    }

    getGallonsReq() {
        return this.gallonsReq;
    }

    getPricePerGallon() {
        return this.pricePerGallon;
    }

    getTotal() {
        return this.total;
    }
    // calculatePrice(){
        //do calculation for pricing here
    // }

}

module.exports = PricingModule;