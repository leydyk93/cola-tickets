
var socket = io();

var searchParams = new URLSearchParams(window.location.search)

var label = $('small')

if(!searchParams.has('desk')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}
console.log(searchParams.has('desk'), "parametros")

var desk = searchParams.get('desk');

$('h1').text('Escritorio ' + desk);

$('button').on('click', function(){
    socket.emit('attendTicket', {desk: desk}, function(resp){
        
        if(resp.ticket === "No hay tickets"){
            label.text(resp.ticket)  
            alert(resp.ticket)
            return 
        }
        label.text('Ticket' + resp.ticket)
    })
})





