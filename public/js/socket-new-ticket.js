
//comando para establecer la comunicación

var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function(){
    console.log("Conectado al Servidor")
})

socket.on('disconnect', function(){
    console.log("Perdimos conexión con el servidor")
})

socket.on('statusNow', (data)=>{
    label.text(data.ticket)
})

$('button').on('click', function(){

    // Solicitar ticket a traves del boton
    socket.emit('nextTicket', null, function(nextTicket){
        //recibir a traves del callback
        label.text(nextTicket)
    })
})