const request = require('supertest');
const app = require('../server');
let server;

beforeAll(() => {
    // Start the server only if not already started
    if (!server) {
        server = app.listen(process.env.PORT || 7002);
    }
});

afterAll((done) => {
    // Close the server after tests
    if (server) {
        server.close(done);
    }
});

let ticketId;

describe('Tickets API', () => {
    it('should create a new ticket', async () => {
        const res = await request(app)
            .post('/addTicket')
            .send({
                title: 'Test Ticket',
                description: 'This is a test ticket',
                contact: 'test@example.com'

            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('ticketId');
        ticketId = res.body.ticketId;
    });

    it('should create a new ticket', async () => {
        const res = await request(app)
            .post('/addTicket')
            .send({
                title: 'Test Ticket and Edit',
                description: 'This is a test ticket',
                contact: 'test@example.com'

            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('ticketId');
        ticketId = res.body.ticketId;
    });

    it('should fetch all tickets', async () => {
        const res = await request(app).get('/tickets');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });



    it('should update ticket status', async () => {
        const res = await request(app)
            .put('/updateTicketStatus/' + ticketId)
            .send({ status: 'closed' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Ticket status updated successfully');
    });

    it('should update ticket details', async () => {
        const res = await request(app)
            .put('/updateTicketDetails/' + ticketId)
            .send({
                title: 'Updated Test Ticket',
                description: 'This is an updated test ticket',
                contactInformation: 'test@gmail.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Ticket details updated successfully');
    });

    //search ticket by title
    it('should search ticket by title', async () => {
        const res = await request(app).get('/searchTicket/Test Ticket and Edit');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

});
