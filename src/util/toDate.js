// dateFilter By llycoder
let toDate = (date) => {
    if (date) {
        const d = new Date(date);
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        const hours = d.getHours() < 10 ? + d.getHours() : d.getHours();
        return d.getFullYear() + '年'  + (d.getMonth() + 1) + '月' + d.getDate() + '日' + hours + ':' + minutes;
    }
}

export {toDate}