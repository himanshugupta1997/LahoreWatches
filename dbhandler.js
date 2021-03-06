const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const assert = require('assert');
const url = "mongodb://hargun:hargun@ds117859.mlab.com:17859/quizappp";
function new_user(obj,callback)
{
    mongoClient.connect(url, function (err, db)
    {
        assert.equal(err,null);
        var handler = db.collection('users');
        handler.find({'uid':obj.uid}).toArray(function (err,result) {
            assert.equal(err,null);
            if(result.length)
            {
                db.close();
                console.log(result[0]);
                callback(0);
            }
            else
            {
                handler.insertOne(
                    {
                        'uid':obj.uid,
                        'name':obj.displayName,
                        'email' : obj.email,
                        'photo' : obj.photoURL,
                        'phone_number':'',
                        'address':''
                    },function (err,result) {
                        assert.equal(err,null);
                        db.close();
                        callback(1);
                    }
                );
            }
        });
    });
}


function add_watch_details(obj,callback)
{
    mongoClient.connect(url, function (err, db)
    {
        assert.equal(err,null);

        var handler = db.collection('watch-details');
                handler.insertOne(
                    {
                        'watch_id':obj.watch_id,
                        'type':obj.type,
                        'brand' : obj.brand,
                        'gender':obj.gender,
                        'price':obj.price,
                        'case-shape':obj.case_shape,
                        'strap':obj.strap,
                        'collection':obj.collection,
                        'display':obj.display
                    },function (err,result) {
                        assert.equal(err,null);
                        db.close();
                        callback(1);
                    }
                );
            });
}

function AddTemporaryData()
{


    var obj = [];

    var id, type, brand, gender, price, caseShape, strap, collection, display;

    var temp = {};

    for(var i = 0 ; i < 100; ++i)
    {
        id = i;
        type = (i % 3) + 1;
        brand = 'Titan';
        if(i % 2)
        {
            gender = 'Male';
            caseShape = 'Square';
            strap = 'Thin';
            display = 'Clock';
        }
        else
        {
            gender = 'Female';
            strap = 'Thick';
            display = 'Digital';
            caseShape = 'Round';
        }

        collection = (i / 10) + 1;

        price = (i + 1) * 10;

        obj.push({

            UniqueId : id,
            type : type,
            brand : brand,
            gender : gender,
            price : price,
            caseShape : caseShape,
            strap : strap,
            collection : collection,
            display : display

        });

    }



    for( i = 0 ; i < 100; ++i)
    {
        id = i + 100;
        type = (i % 3) + 1;
        brand = 'Rolex';
        if(i % 2)
        {
            gender = 'Male';
            caseShape = 'Square';
            strap = 'Thin';
            display = 'Clock';
        }
        else
        {
            gender = 'Female';
            strap = 'Thick';
            display = 'Digital';
            caseShape = 'Round';
        }

        collection = (i / 10) + 1;

        price = (i + 1) * 10;

        obj.push({

            UniqueId : id,
            type : type,
            brand : brand,
            gender : gender,
            price : price,
            caseShape : caseShape,
            strap : strap,
            collection : collection,
            display : display

        });

    }

    for(i = 0 ; i < 100; ++i)
    {
        id = i + 200;
        type = (i % 3) + 1;
        brand = 'Sonata';
        if(i % 2)
        {
            gender = 'Male';
            caseShape = 'Square';
            strap = 'Thin';
            display = 'Clock';
        }
        else
        {
            gender = 'Female';
            strap = 'Thick';
            display = 'Digital';
            caseShape = 'Round';
        }

        collection = (i / 10) + 1;

        price = (i + 1) * 10;

        obj.push({

            UniqueId : id,
            type : type,
            brand : brand,
            gender : gender,
            price : price,
            caseShape : caseShape,
            strap : strap,
            collection : collection,
            display : display

        });

    }





    mongoClient.connect(url, function (err, db)
    {
        assert.equal(err,null);

        var handler = db.collection('watch-details');

        handler.insertMany(obj, function (err, r) {

            if(err)
                throw err;

            console.log(r);
            console.log("done");


        });


    });


}


 // AddTemporaryData();

function GetFromID (id11, callback) {
    console.log("Id is ");
    console.log(id11);
    console.log(typeof id11);

    mongoClient.connect(url, function (err, db)
    {
        assert.equal(err,null);

        var handler = db.collection('watch-details');

        handler.find( {UniqueId : Number(id11)} ).toArray(function (err, docs) {

            if(err)
                throw err;

            console.log("Passing in docs ");
            console.log(docs);
            callback(docs);

        });

    });


}


function GetCartItems(cart, callback) {


   // cart = [1, 2,100, 200];

    var temp = [];

    if(cart == null || typeof cart == 'undefined' || cart == undefined)
    {
        cart = [];
        callback([]);
        return;
    }

    for(var i = 0 ; i < cart.length; ++i)
    {
        temp.push({

            UniqueId : Number(cart[i])
        });
    }

    mongoClient.connect(url, function (err, db)
    {
        assert.equal(err,null);

        var handler = db.collection('watch-details');

        handler.find({ $or : temp }).toArray(function(err, docs)
        {
            if(err)
                throw err;

            console.log(docs);
            callback(docs);

        });


    });

}

//GetCartItems();

function AllProducts(callback)
{
    console.log("Hello");
    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;
        var handler = db.collection('watch-details');
        handler.find({ }).toArray(function (err, docs) {

            callback(docs);

        });

    });


}

function DistinctBrands(callback)
{
    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;
        var handler = db.collection('watch-details');
        temp=handler.distinct("brand") ;

        temp.then(function(docs){
            callback(docs);

        });

        

    });
}




function filteredData(obj,callback)
{
    console.log("Hello filter");



    var o={
        $and:[{
            $or:obj.br
        },

            {
                $or:obj.ge
            },

            {
                $or:obj.di
            },

            {
                $or:obj.ca
            },

            {
                $or:obj.str
            }]

    };


    console.log("Getting O");
    console.log(o);
    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;

        var handler = db.collection('watch-details');
        handler.find(o).sort(obj.so).toArray(function (err, docs) {

            console.log(obj.so);
            console.log("getting docs");
            console.log(docs);
            callback(docs);

        });

    });


}

function InsertOrder(order, callback)
{
    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;

        var handler = db.collection('orders');
        handler.find({}).toArray(function (err, docs) {

            if(err)
                throw err;

            var id = docs.length + 2;

            order.status = 'Queued';
            order.id = id;
            handler.insertOne(order, function (err, r) {

                if(err)
                    throw err;

                console.log(r);
                console.log("Inserted");
                callback(id);

            });

        });

    });

}

function GetOrders(callback) {
    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;

        var handler = db.collection('orders');
        handler.find({}).toArray(function (err, docs) {

            if(err)
                throw err;


            callback(docs);

        });

    });


}

// Tested Function to update status

function UpdateStatus(id, status, callback) {

    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;

        var handler = db.collection('orders');
        handler.updateOne({id : id}, {$set : {status : status}}, function (err, r) {

            if(err)
                throw err;

            console.log(r);
            callback(1);

        })

    });


}

/*
UpdateStatus(2, 'Done', function (result) {
   console.log("Result is");
   console.log(result);

});*/

function  GetUser(email ,callback)
{
    var result = {};
    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;

        var handler = db.collection('users');
        handler.find({email : email}).toArray(function (err ,docs) {

            if(err)
                throw err;
            console.log("First Request");
            console.log(docs);
            if(docs.length)
                result.user = docs[0];
            else
                result.user = docs;
            var handler1 = db.collection('orders');
            handler1.find({email : email}).toArray(function (err, docs) {

                if(err)
                    throw err;

                result.user.orders = docs;
                callback(result);
            });
        });
    });


}

function UpdateUser(email ,update, callback) {

    mongoClient.connect(url, function (err, db)
    {
        if(err)
            throw err;

        var handler = db.collection('users');
        handler.updateOne({email : email}, {$set : update}, function (err, r) {

            if(err)
                throw err;

            console.log(r);
            callback(1);

        })

    });


}


module.exports  = {
    new_user:new_user,
    add_watch_details:add_watch_details,
    GetFromID : GetFromID,
    GetCart : GetCartItems,
    AllProducts : AllProducts,
    filteredData:filteredData,
    DistinctBrands:DistinctBrands,
    InsertOrder : InsertOrder,
    GetOrders : GetOrders,
    UpdateStatus : UpdateStatus,
    GetUser : GetUser,
    UpdateUser : UpdateUser
};