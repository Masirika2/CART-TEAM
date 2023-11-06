const mongoose = require('mongoose');

const MCPschema = new mongoose.Schema({
    merchantCode: String,
    orderNumber: String
});

const MCP = mongoose.model('MCP', MCPschema);

module.exports = MCP;
