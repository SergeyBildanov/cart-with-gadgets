import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        if(this.items.includes(item)){
            let amount = this._items[this._items.indexOf(item)].amount;
                if(amount !== undefined){
                    this._items[this._items.indexOf(item)].amount = amount + 1;
                }
                this._items[this._items.indexOf(item)] = item;
        }
        else{
            if(item.countable){
                item.amount = 1;
            }
            this._items.push(item);
        }
    }
    get items(): Buyable[] {
        return [...this._items]; 
    }
    withoutPurchase(): number{
        return this.items.reduce((acc, item)=>{
            let price = item.price;
            if(item.amount){
                price = price * item.amount;
            }
            return acc+=price;
            
        }, 0);
    }
    withPurchase(purchase: number): number{
        const cost = this.withoutPurchase();
        return cost*(100 - purchase)*0.01;
    }
    remove(id:number): void{
        this._items = this._items.filter((item) => {item.id !== id});
    }
    decreaseAmount(id: number): void{
        let item = this.items.filter((item) => {item.id === id})[0];
        if(item.amount && item.amount == 1){
            this._items = this._items.filter((item) => {item.id !== id});
            return;
        }
        this._items = this._items.filter((i) => {
            if(i.id == item.id && i.amount && i.amount>1){
                i.amount -= 1;
            }
            return i;
        });
    }
}