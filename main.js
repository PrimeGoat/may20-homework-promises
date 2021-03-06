//1:
//Write a function compareToTen that takes a number as an argument and returns a Promise that tests if the value is less than or greater than the value 10.
// if number is greater or equal it should resolve and log for example '20 is greater than or equal to 10, resolved!'
// if num is less than 10 then it should reject and log for example '5 is less than 10, error!'
// create a variable num that creates a random number between 1 and 20
// use it to invoke your compareToTen function
// consume the function and log the result

const compareToTen = function(num) {
    return new Promise((resolve, reject) => {
        if(num >= 10)   resolve(num + ' is greater than or equal to 10, resolved!');
        else            reject(num + ' is less than 10, error!');
    });
}

const num = Math.floor(Math.random() * 20 + 1);

compareToTen(num).then((msg) => {
    console.log(msg);
}).catch((error) => {
    console.log("ERROR: " + error);
});

  //2.
  // create a global variable called order. It will hold a string with whatever drink you want to order, say a 'Slurpy'
  //create a variable called drink that creates a promise
  // first log 'I'll be right back with your Slurpy' when the value of your variable is 'Slurpy'.
  // next create an orderCannotBeFilled variable that will be a boolean and set it to false
  // orderCannotBeFilled should reject after 2 seconds
  // complete the order after 4 seconds
  // consume the promise
  // chain and log ('Server returns: 'Here is your Slurpy.') when your order value is 'Slurpy' and orderCannotBeFulfilled is false
  // handle the catch. It should return 'Sorry we are all out of Slurpy' when your order value is 'Slurpy' and your orderCannotBeFulfilled is true
  // SAMPLE OUTPUT:
  // Server says: "I'll be right back with your Slurpy"
  // Sever returns: "Sorry, We are all out of Slurpy"
  // OR
  // Server says: "I'll be right back with your Slurpy"
  // Server returns: "Here is your Slurpy".

let order = "Aloe";

let drink = new Promise((resolve, reject) => {
    console.log("Server says: I'll be right back with your " + order);

    let orderCannotBeFilled = false;

    if(orderCannotBeFilled) setTimeout(() => {
        reject("Sorry, we are all out of " + order);
    }, 2000);
    else setTimeout(() => {
        resolve("Here is your " + order);
    }, 4000);
});

drink.then(msg => {
    console.log("Server returns: " + msg);
}).catch(error => {
    console.log("Server returns: " + error);
});


//3.CHAIN
//Write two functions that use Promises that you can chain! The first function, makeAllCaps(), will take in an array of words and capitalize them, and then the second function, sortWords(), will sort the words in alphabetical order. If the array contains anything but strings, it should throw an error.
//Write 2 separate functions. makeAllCaps and sortWords
// Each function returns a promise
// makeAllCaps function takes an array of words and makes them capital
// sortWords function takes an array and sorts them
// If the array contains anything except strings it should throw an error.

const arrayOfWords = ['cucumber', 'tomatos', 'avocado'] //returns ['CUCUMBER','TOMATOES','AVOCADO']
const complicatedArray = ['cucumber', 44, true] //returns "Error Not All Items are strings"

const makeAllCaps = function(arr) {
    return new Promise((resolve, reject) => {
        let out = [];

        for(item of arr) {
            if(typeof item != "string") reject("makeAllCaps: Not every item is a string");
            else                        out.push(item.toUpperCase());
        }

        resolve(out);
    });
}

const sortWords = function(arr) {
    return new Promise((resolve, reject) => {
        for(item of arr) if(typeof item != "string") reject("sortWords: Not every item is a string");

        resolve(arr.sort());
    });
}

makeAllCaps(complicatedArray)
.then(arr => sortWords(arr))
.then(msg => console.log(msg))
.catch(err => console.log(err));

//4.

// a. Create a variable, totalSales that creates a promise.
// b. Within the promise create a reject handler for errors and a resolve handler that resolves a copy of the array inside the json object.
// c. Chain the promise to the next thenable
// d. log the data for all the companies in the Legal industry
// e. pass the data for all the companies in the Legal industry to the next thenable
// f. Chain again and find all the names of the people in the legal industry and log those names in a string: "Contacts from the legal profession:" + list all of the names
// g. In that same chain return 30% of each of the sales and pass the value to the next thenable
// h. Add all of the sales totals together and return a string saying: "Total sales for everyone from the Legal profession after taxes is $30000" if the value of the added sales is 30000

const json = {
    data: [
        {
            name: 'NextGen Advisors',
            industry: 'Professional Services',
            contact: 'John Rutton',
            sales: 135000
        },
        {
            name: 'Receivers Inc',
            industry: 'Legal',
            contact: 'Stacey Martin',
            sales: 201000
        },
        {
            name: 'Ethan Allen',
            industry: 'Textile',
            contact: 'Mark Shamburger',
            sales: 735000
        },
        {
            name: 'Russian River Utility',
            industry: 'Transportaion&Shipping',
            contact: 'Phil Butterworth',
            sales: 605000
        },
        {
            name: 'Wayne Johnson Law Office',
            industry: 'Legal',
            contact: 'Beverly Stephens',
            sales: 135000
        },
        {
            name: 'Kravet',
            industry: 'Textile',
            contact: 'Jan Farnsworth',
            sales: 105000
        },
        {
            name: 'Wacomb Data',
            industry: 'Professional Services',
            contact: 'Larry Peters',
            sales: 13000
        },
        {
            name: 'Farnsworth Utility',
            industry: 'Transportaion&Shipping',
            contact: 'John Rutton',
            sales: 437000
        },
        {
            name: 'Barnes Law',
            industry: 'Legal',
            contact: 'John Percy',
            sales: 35000
        }
    ]
}


let totalSales = new Promise((resolve, reject) => {
    const error = false;

    if(error)   reject();
    else        resolve(JSON.parse(JSON.stringify(json)));
});

totalSales
.then(data => {
    let out = [];
    for(entry of data.data) {
        if(entry.industry = "Legal") {
            console.log(entry);
            out.push(entry);
        }
    }
    return out;
})
.then(data => {
    let names = [];
    let sales = [];
    for(entry of data) {
        names.push(entry.contact);
        sales.push(entry.sales * .3);
    }
    console.log("Contacts from the legal profession: " + names.join(", "));

    return sales;
})
.then(sales => {
    console.log("Total sales for everyone from the Legal profession after taxes is $" + sales.reduce((total, current) => {
        return total + current;
    }, 0));
})
.catch(() => {
    console.log("ERROR");
});


// 5. Based on given athlets array
//a.  Write a function called playerFunction that returns a promise which copies the array into a new array called 'playerArr'.
// Make sure your function is re-useable.
//b.
// Place a key value pair into each object based on the player's position.
//If the position is guard then add sport:'basketball'
// If the position is quarterback add sport:'football'
// Use a ternary to list the correct sport
// Note: There can only be two sports either football or basketball and only two positions guard and quarterback
//c.
// List (console.log) the complete array with the sport added. Preface the list with a 'Sport added: ' string.
// console.log('---------') to separate the next section.
//d.
// Console.log a string like the example below for each player:
// 'Tom Bradshaw plays football and is a quarterback for the Pittsburgh Steelers'
// Only choose the players who play football and use deconstruction and the ternary operator to complete this piece
//e. In the next chain, console.log the original array to show it has not been mutated
//f. Be sure to include you Promise Error Handling using the catch

let athletes = [
    {
        name: 'Tom Brady',
        position: 'quarterback',
        team: 'New England',
    },
    {
        name: 'Drew Brees',
        position: 'quarterback',
        team: 'New Orleans',
    },
    {
        name: 'Michael Jordan',
        position: 'guard',
        team: 'Chicago Bulls',
    },
    {
        name: 'Stephen Curry',
        position: 'guard',
        team: 'Golden Warriors',
    },
    {
        name: 'Russell Wilson',
        position: 'quarterback',
        team: 'Seattle Seahawks',
    },
    {
        name: 'Chris Paul',
        position: 'guard',
        team: 'Oklahoma City Thunder'
    },
    {
        name: "D'Angelo Russell",
        position: 'guard',
        team: 'Golden Warriors'
    },
    {
        name: 'Eli Manning',
        position: 'quarterback',
        team: 'NY Giants',
    },
];

const playerFunction = function(arr) {
    return new Promise((resolve, reject) => {
        const error = false;

        if(error)   reject();
        else        resolve(JSON.parse(JSON.stringify(arr)));
    });
}

playerFunction(athletes)
.then(data => {
    let out = [];
    for(entry of data) {
        entry.sport = (entry.position == 'guard') ? 'basketball' : 'football';
        out.push(entry);
    }

    console.log("Sport added:", data, "\n---------");
    return data;
})
.then(data => {
    for(player of data) {
        const {name, position, team, sport} = player;
        console.log(name + " plays " + sport + " and is a " + position + " for the " + team);
    }
})
.catch(() => {
    console.log("ERROR");
});
