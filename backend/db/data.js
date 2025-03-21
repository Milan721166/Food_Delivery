const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/orders"); // Removed duplicate import

dotenv.config();

// Sample Users    new users added
const users = [ // Changed from `Users` to `users`
    {
        userName: "Alice",
        email: "alice@example.com",
        password: "123456",
        address: "New York",
        mobNum: 1234567890,
    },
    {
        userName: "Bob",
        email: "bob@example.com",
        password: "123456",
        address: "Los Angeles",
        mobNum: 1234567891,
    },
    {
        userName: "Charlie",
        email: "charlie@example.com",
        password: "123456",
        address: "Chicago",
        mobNum: 1234567892,
    },
    {
        userName: "David",
        email: "david@example.com",
        password: "123456",
        address: "Houston",
        mobNum: 1234567893,
    },
    {
        userName: "Emma",
        email: "emma@example.com",
        password: "123456",
        address: "Miami",
        mobNum: 1234567894,
    },
    {
        userName: "Frank",
        email: "frank@example.com",
        password: "123456",
        address: "Boston",
        mobNum: 1234567895,
    },
    {
        userName: "Grace",
        email: "grace@example.com",
        password: "123456",
        address: "Seattle",
        mobNum: 1234567896,
    },
    {
        userName: "Henry",
        email: "henry@example.com",
        password: "123456",
        address: "Dallas",
        mobNum: 1234567897,
    },
    {
        userName: "Ivy",
        email: "ivy@example.com",
        password: "123456",
        address: "San Diego",
        mobNum: 1234567898,
    },
    {
        userName: "Jack",
        email: "jack@example.com",
        password: "123456",
        address: "San Francisco",
        mobNum: 1234567899,
    },
];

// Food Data
const foodData = [
    {
        name: "Kung Pao Chicken",
        imageUrl: "https://media.istockphoto.com/id/1225394561/photo/image-of-spicy-kung-pao-chicken-takeaway-meal-in-black-plastic-disposable-container-with.jpg?s=1024x1024&w=is&k=20&c=ziaaZ35Nxj3IqsSVeBrdzPnKGLyq5tGns1v6hgApv1k=",
        price: 12.99,
        description: "A spicy stir-fry dish made with chicken, peanuts, vegetables, and chili peppers.",
    },
    {
        name: "Sweet and Sour Pork",
        imageUrl: "https://media.istockphoto.com/id/1350409078/photo/sweet-and-sour-pork-typical-chinese-food.jpg?s=612x612&w=0&k=20&c=cr1kaHiBExu_-Pm-chsPZRXqTmcj-piDQaemxC8fLPA=",
        price: 10.99,
        description: "Crispy fried pork pieces tossed in a tangy sweet and sour sauce.",
    },
    {
        name: "Ma Po Tofu",
        imageUrl: "https://media.istockphoto.com/id/1517058893/photo/mapo-tofu-stir-fried-tofu-in-hot-sauce-sichuan-cuisine-chinese-food-food-photography.jpg?s=612x612&w=0&k=20&c=PEnFMwxWpRCIE-b41G87ynH12snIWszlLnzjaJ2gbCA=",
        price: 9.99,
        description: "A popular Sichuan dish featuring soft tofu set in a spicy chili and bean-based sauce, typically with minced meat.",
    },
    {
        name: "Peking Duck",
        imageUrl: "https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60=",
        price: 24.99,
        description: "A famous duck dish from Beijing known for its crispy skin and tender meat, often served with pancakes and hoisin sauce.",
    },
    {
        name: "Chow Mein",
        imageUrl: "https://www.istockphoto.com/photos/chow-mein",
        price: 8.99,
        description: "Stir-fried noodles with vegetables and choice of protein, seasoned with soy sauce.",
    },
    {
        name: "Dumplings",
        imageUrl: "https://media.istockphoto.com/id/483137365/photo/asian-chow-mein-noodles.jpg?s=612x612&w=0&k=20&c=aVkPKpDkiAM7CxTFinQBax0i-nm-ybzWimrJRyPePcg=",
        price: 6.99,
        description: "Soft dough filled with meat or vegetables, steamed or fried, and served with dipping sauce.",
    },
    {
        name: "Spring Rolls",
        imageUrl: "https://media.istockphoto.com/id/1430066729/photo/fried-spring-rolls-with-sweet-chili-sauce-and-lime-on-plate.jpg?s=612x612&w=0&k=20&c=WgwUR08npril5wPweRovhb7-Dm1d86myPR6dIz0GCo8=",
        price: 5.99,
        description: "Crispy rolls filled with vegetables and sometimes meat, served with a sweet and sour dipping sauce.",
    },
    {
        name: "Hot and Sour Soup",
        imageUrl: "https://media.istockphoto.com/id/1442576436/photo/hot-and-sour-soup-with-green-onion-served-in-a-bowl-isolated-on-table-top-view-of-taiwanese.jpg?s=612x612&w=0&k=20&c=maXicd7LvLjCEtF75lKLVraxgQDLl6ONpDkVnBLlLo0=",
        price: 4.99,
        description: "A flavorful soup combining spicy and sour flavors, typically with tofu, mushrooms, and bamboo shoots.",
    },
    {
        name: "Fried Rice",
        imageUrl: "https://media.istockphoto.com/id/945606006/photo/chicken-fried-rice.jpg?s=612x612&w=0&k=20&c=n3p_r97vJlp013wlxD5WyDYviR0ADj6LiS5QKOYYQLY=",
        price: 7.99,
        description: "Stir-fried rice with vegetables, eggs, and choice of protein, seasoned with soy sauce.",
    },
    {
        name: "Sichuan Hot Pot",
        imageUrl: "https://media.istockphoto.com/id/697932394/photo/korean-hot-pot-meal-hands-taking-food-with-chopsticks.jpg?s=612x612&w=0&k=20&c=U35S2Iv9O1woJmVohjrg9uM5C11ZAWRl1Qb0RireK6g=",
        price: 19.99,
        description: "A communal dish where diners cook various ingredients in a simmering spicy broth at the table.",
    },
    {
        name: "General Tso's Chicken",
        imageUrl: "https://media.istockphoto.com/id/483120255/photo/asian-oranage-chicken-with-green-onions.jpg?s=612x612&w=0&k=20&c=0T_g_J5OSnmCei1Slgr1128wzAhzceRvLjd94R3gkgs=",
        price: 11.99,
        description: "Deep-fried chicken pieces coated in a sweet and spicy sauce.",
    },
    {
        name: "Beef and Broccoli",
        imageUrl: "https://media.istockphoto.com/id/642065070/photo/beef-and-broccoli-stir-fry.jpg?s=612x612&w=0&k=20&c=BwichHy9JJCe8u7Zdx4EDp3CzAn-bK-xBIRMl7u3UnM=",
        price: 13.99,
        description: "Tender beef slices stir-fried with broccoli in a savory sauce.",
    },
    {
        name: "Egg Drop Soup",
        imageUrl: "https://media.istockphoto.com/id/1206902256/photo/quick-and-simple-spicy-egg-drop-soup-with-parsley-and-chilli.jpg?s=612x612&w=0&k=20&c=ft59vQYiMc724jNrZHH3a-EiRed16sXendM4gVFcgUQ=",
        price: 3.99,
        description: "A light soup with beaten eggs added to boiling broth, creating silky strands.",
    },
    {
        name: "Lo Mein",
        imageUrl: "https://media.istockphoto.com/id/1038108608/photo/bowls-with-chow-mein.jpg?s=612x612&w=0&k=20&c=BioejbjglNwOp6yeRnOAcPCHuK5Ixr8cQJCNFQDX5oI=",
        price: 8.99,
        description: "Soft noodles stir-fried with vegetables and choice of protein in a savory sauce.",
    },
    {
        name: "Sesame Chicken",
        imageUrl: "https://media.istockphoto.com/id/1438166185/photo/sweet-crispy-korean-fried-chicken.jpg?s=612x612&w=0&k=20&c=uNd2xLloDLOOn6U89Od0CihWgrypRycyJJus0iUFJoU=",
        price: 11.99,
        description: "Breaded chicken pieces tossed in a sweet sesame sauce and garnished with sesame seeds.",
    },
    {
        name: "Wonton Soup",
        imageUrl: "https://media.istockphoto.com/id/904643860/photo/wonton-soup-with-scallions.jpg?s=612x612&w=0&k=20&c=Xu6lM0zDKx8aPQf7QIfojFGU3UVVn4VO6_qLu-9uzxc=",
        price: 5.99,
        description: "A clear broth soup featuring wontons filled with seasoned pork or shrimp.",
    },
    {
        name: "Moo Shu Pork",
        imageUrl: "https://media.istockphoto.com/id/1202236644/photo/chinese-cuisine-pork-moo-shu-with-vegetables-and-mushrooms-close-up-in-a-plate-horizontal.jpg?s=612x612&w=0&k=20&c=Xz1FDnXx6u-ohadXpEvPrCusXkztSWbVA4cHhKrnNl0=",
        price: 12.99,
        description: "Stir-fried pork with vegetables and scrambled eggs, served with thin pancakes.",
    },
    {
        name: "Egg Foo Young",
        imageUrl: "https://media.istockphoto.com/id/2151287266/photo/fried-chinese-egg-foo-young.jpg?s=612x612&w=0&k=20&c=ckuN5Dgoz-tKQIjGpoHszOVN-huglIGbEqNHCemGXsE=",
        price: 9.99,
        description: "A Chinese-style omelet with vegetables and choice of protein, topped with a savory gravy.",
    },
    {
        name: "Char Siu",
        imageUrl: "https://media.istockphoto.com/id/1360690068/photo/close-up-side-view-chopsticks-holding-piece-of-juicy-delicious-barbecue-roasted-pork.jpg?s=612x612&w=0&k=20&c=jXX68dhblhtUKWdqZdpJ4rKObr2MTLX5Dqytt6MmV3s=",
        price: 14.99,
        description: "Cantonese-style barbecued pork, known for its sweet and savory flavor and red exterior.",
    },
    {
        name: "Dim Sum",
        imageUrl: "https://media.istockphoto.com/id/1317688091/photo/dim-sun-time.jpg?s=612x612&w=0&k=20&c=AmGBdnT_eTfTRS4bFNM6ROS_LGAv-0151tOtxOcqPTA=",
        price: 15.99,
        description: "A variety of small dishes, such as dumplings and buns, traditionally served with tea.",
    },
    {
        name: "Mapo Tofu",
        imageUrl: "https://media.istockphoto.com/id/1366185599/photo/mabo-tofu.jpg?s=612x612&w=0&k=20&c=J6BsWkYc7rXAmIxcXI8okhWuFD6mEa4U_wcH1_NlUm4=",
        price: 10.99,
        description: "A spicy Sichuan dish featuring tofu set in a chili and bean-based sauce, often with minced meat.",
    },
    {
        name: "Szechuan Shrimp",
        imageUrl: "https://media.istockphoto.com/id/1195606665/photo/fried-sticky-shrimps-with-garlic-chilli-sesame-seeds-and-green-onions-served-with-rice-close.jpg?s=612x612&w=0&k=20&c=gkAfK2wKVmGlZHCWG30Q9MLgLYrxVuT5tuq-dkPxgw8=",
        price: 16.99,
        description: "Shrimp stir-fried with vegetables in a spicy and tangy Szechuan sauce.",
    }
];

const insertData = async () => {
    try {
        // Corrected model names
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const createdProducts = await Product.insertMany(foodData);

        console.log("Users and Products inserted successfully");

        const orders = [];
        for (let i = 0; i < 10; i++) {
            const randomUser =
                createdUsers[Math.floor(Math.random() * createdUsers.length)];
            const randomProduct =
                createdProducts[Math.floor(Math.random() * createdProducts.length)];
            orders.push({
                user: randomUser._id,
                items: [
                    {
                        product: randomProduct._id,
                        quantity: Math.ceil(Math.random() * 3),
                    },
                ],
                totalAmount: randomProduct.price * Math.ceil(Math.random() * 3),
                isPaid: Math.random() > 0.5, // Randomly mark some orders as paid
            });
        }
        await Order.insertMany(orders);

        console.log("Orders inserted successfully");
    } catch (error) {
        console.error("Error inserting data: ", error);
        mongoose.connection.close();
    }
};

module.exports = insertData;


//data file 