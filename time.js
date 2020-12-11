
function datatofriendly(data){
    return moment(data, 'YYYY-MM-DD hh:mm').fromNow();
}