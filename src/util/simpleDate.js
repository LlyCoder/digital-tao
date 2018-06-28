const simpleDate = (date)=> {
    if(date) {
        //2018.04.22 10: 18
        const d = new Date(date);
        const minutes = d.getMinutes() < 10? '0' + d.getMinutes() : d.getMinutes();
        const hours = d.getHours() < 10? '0' + d.getHours() : d.getHours();
        const Monthes = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        const days = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        return d.getFullYear() + '.' + Monthes + '.' + days;
    }
}

export {simpleDate}