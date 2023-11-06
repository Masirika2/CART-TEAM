const express = require('express');
const mongoose = require('mongoose');
const MCP = require('./MCP'); // Assuming 'MCP.js' is in the same directory


const app = express();
exports.app = app;

mongoose.connect('mongodb+srv://buyinzajoshua:Joshua20.@cluster0.btjnbey.mongodb.net/MCP?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function () {
    console.log('Connected to MCP');
});

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/MCP.html');
});

app.post('/MCP', async (req, res) => {
    const { merchantCode, orderNumber } = req.body;

    try {
        const existingMCP = await MCP.findOne({ merchantCode: merchantCode });

        if (existingMCP) {
            res.status(400).send('MCP numbers already exist. Please use a different MCP number.');
        } else {
            const newMCP = new MCP({ merchantCode: merchantCode, orderNumber: orderNumber });
            await newMCP.save();
            console.log(`${newMCP.merchantCode}, is Received and Saved`);
            res.send('Order is Received and saved');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while saving order');
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await MCP.find({}); // Retrieve all MCP data from the database

        if (orders.length === 0) {
            res.send('No MCP data found.');
        } else {
            let ordersTable = `
                <h2>MCP Data:</h2>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Merchant Code</th>
                                <th>Order Number</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            orders.forEach(order => {
                ordersTable += `
                    <tr>
                        <td>${order.merchantCode}</td>
                        <td>${order.orderNumber}</td>
                    </tr>
                `;
            });

            ordersTable += `
                        </tbody>
                    </table>
                </div>
            `;
            res.send(`
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                ${ordersTable}
            `);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while retrieving MCP data');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
