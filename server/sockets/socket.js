const { io } = require('../server');

const { TicketControl } = require('../classes/tickets-control')

let ticketControl = new TicketControl()
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //enviar ticket inicial en caso de existir
    client.emit('statusNow', {
        ticket: ticketControl.getLastTicket(), 
        lastFour: ticketControl.getLastFour()
    })

    // Escuchar solicitud de ticket
    client.on('nextTicket', (data, callback) => {
        
         let next = ticketControl.next()
         // Enviar ticket 
         callback(next)
         console.log('ticket enviado: ', next)
    });

    //Escuchar solicitud para atender ticket
    client.on('attendTicket', (data, callback)=>{
        if(!data.desk){
            return callback({
                err: true, 
                message: "El escritorio es necesario"
            })
        }

        let attendTicket = ticketControl.attendTicket(data.desk)
        
        callback({
            desk: data.desk, 
            ticket: attendTicket
        })

        client.broadcast.emit('statusNow', {
            ticket: ticketControl.getLastTicket(), 
            lastFour: ticketControl.getLastFour()
        })
    })

});