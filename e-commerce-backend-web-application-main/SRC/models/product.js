const sqlConnection = require("../services/sqlConnection");

function listProducts(data, callback){
    let sql = "SELECT ID as productId, Name as name, Price as price FROM Products ";
    let values = [];
    if(data.categoryId){
        sql += " WHERE CategoryId = ?";
        values.push(data.categoryId);
        if(data.minPrice){
            sql += " AND Price >= ?";
            values.push(data.minPrice);
        }else if(data.maxPrice){
            sql += " AND Price <= ?"
            values.push(data.maxPrice);
        }
    }else if(data.minPrice){
        sql += " WHERE Price >= ?";
        values.push(data.minPrice);
    }else if(data.maxPrice){
        sql += " WHERE Price <= ?";
        values.push(data.maxPrice);
    }
    sqlConnection.executeQuery(sql, values, function(err, result){
        callback(err, result);
    });

}

function addProduct(data,callback){
    let sql = `INSERT INTO Products (Name, Price, Description, categoryId, vendorId, createdAt, updatedAt)
    VALUES(?, ?, ?, ?, ?, now(), now())`;
    let values = [];
    values.push(data.name);
    values.push(data.price);
    values.push(data.description);
    values.push(data.categoryId);
    values.push(data.vendorId);
    sqlConnection.executeQuery(sql, values, function(err, result){
        callback(err, result);
    });
    
}

function getProductDetails(data, callback){
    let sql = ` SELECT p.Name as name, p.Price as price, p.Description as description,
                if((SELECT Count(*) FROM OrderDetails as od LEFT JOIN OrderItems as oi ON
                oi.OrderID = od.ID WHERE oi.ProductID = p.ID AND od.UserId = ? AND od.OrderStatus = 1) > 0, 1, 0) AS
                addedToCart FROM Products as p WHERE p.id = ? LIMIT 1
    `;
    let values = [];
    values.push(data.userId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result){
        callback(err, result);
    });
}
module.exports = {listProducts, addProduct, getProductDetails};