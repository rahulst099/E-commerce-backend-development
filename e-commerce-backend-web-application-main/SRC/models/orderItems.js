const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, callback){
    let sql = ` INSERT INTO OrderItems
                (OrderId, ProductId, Quantity, CreatedAt, UpdatedAt)
                VALUES ( ? , ? , ? , now(), now())
    `;
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    values.push(data.quantity);
    sqlConnection.executeQuery(sql, values, function(err, result){
        callback(err, result);
    })           
}

function editOrderItem(data, callback){
    let sql = ` UPDATE OrderItems SET
                Quantity = ? , UpdatedAt = now()
                WHERE OrderId = ? AND ProductId = ? 
    `;
    let values = [];
    values.push(data.quantity);
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result){
        callback(err, result);
    })
}

function deleteOrderItems(data, callback){
    let sql = ` DELETE FROM OrderItems
                OrderId = ? AND ProductId = ?
    `;
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result){
        callback(err, result);
    })
}

function getOrderItems(data, callback){
    let sql = ` SELECT * FROM OrderItems
                WHERE
                OrderId = ? AND ProductId = ?
    `;
    let vaules = [];
    vaules.push(data.orderId);
    vaules.push(data.productId);
    sqlConnection.executeQuery(sql, vaules, function(err, result){
        callback(err, result);
    })
}

module.exports = {
    addOrderItem,
    editOrderItem,
    deleteOrderItems,
    getOrderItems
};