const fs = require('fs')

class Ticket {

    constructor(ticket, desk){
        this.ticket = ticket
        this.desk = desk
    }
    
}
class TicketControl {
    constructor(){

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = []; // por atender
        this.lastFour = []; // los ultimos 4 tickets atendidos
        let data = require('../data/data.json')

        if(data.today === this.today){
            this.last = data.last;
            this.tickets = data.tickets
            this.lastFour = data.lastFour;
        }else {
            this.restartCount()
        }
    }

    getLastTicket(){
        return `Ticket ${this.last}`;
    }

    getLastFour(){
        return this.lastFour
    }

    attendTicket(desk){

        if(this.tickets.length == 0){
            return "No hay tickets"
        }
        
        let nroTicket = this.tickets[0].ticket;
        this.tickets.shift() // removemos el ticket entregado para atender

        let ticket = new Ticket(nroTicket, desk)
        this.lastFour.unshift(ticket) // agregamos el ticket al inicio del arreglo

        if(this.lastFour.length > 4){
            this.lastFour.splice(-1, 1) // elimina el ultimo
        }

        console.log("ultimos 4", this.lastFour)

        this.saveFile()

        return nroTicket
    }

    next(){
        this.last += 1;
        let ticket = new Ticket(this.last, null)
        this.tickets.push(ticket)
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    restartCount(){

        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveFile();
        console.log('cada dia se reinicia el sistema, Comenzó un nuevo dia')

    }

    saveFile(){
        
        let jsonData = {
            last: this.last,
            today: this.today, 
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}

module.exports = {
    TicketControl
};