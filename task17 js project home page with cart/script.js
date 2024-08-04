const items = [
    {
        no: "item-1",
        name: "Dry Cleaning",
        price: 200
    },
    {
        no: "item-2",
        name: "Wash & Fold",
        price: 100
    },
    {
        no: "item-3",
        name: "Ironing",
        price: 30
    },
    {
        no: "item-4",
        name: "Stain Removal",
        price: 500
    },
    {
        no: "item-5",
        name: "Leather & Suede Cleaning",
        price: 999
    },
    {
        no: "item-6",
        name: "Wedding Dress Cleaning",
        price: 2800
    }
];

let addItems = [];
let btns = ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"];

const warning_diologe = document.querySelector(".diolog");

for (let i = 0; i < btns.length; i++) {
    let btn = document.querySelector("#" + btns[i]);

    btn.addEventListener("click", () => {
        if (btn.innerHTML == "Add Item") {
            btn.innerHTML = "Remove Item";
            btn.classList.add("remove-btn");
            addTable(btn.id);

        }
        else {
            btn.innerHTML = "Add Item";
            btn.classList.remove("remove-btn");
            removeTable(btn.id);
        }
        showTable();
    });
}

function addTable(btnId) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].no == btnId) {
            addItems.push(items[i]);
            // console.log(addItems);
        }
    }
}

function removeTable(btnId) {
    let newarr = [];
    let k = 0;
    if (addItems.length == 1) {
        addItems = [];
    }
    else {
        for (let i = 0; i < addItems.length; i++) {
            if (addItems[i].no != btnId) {
                newarr[k] = addItems[i];
                k++;
            }
        }
        addItems = newarr;
    }
    // console.log(addItems);
}


// function getPosition(arr, attribute) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].no == attribute) {
//             return i;
//         }
//     }
//     return -1;
// }


const tbody = document.querySelector("#add-new-item");
const totalPrice = document.querySelector("#total");

function showTable() {
    tbody.innerHTML = "";
    let sum = 0;
    if (addItems == 0) {
        warning_diologe.style = "display : block; text-align:center";
        bookbtn.classList.remove("blueviolet");
        bookbtn.classList.add("lightviolet");
    }
    else {
        warning_diologe.style = "display : none";
        warningcart.classList.add("hide");
        bookbtn.classList.add("blueviolet");
        bookbtn.classList.remove("lightviolet");
        for (let i = 0; i < addItems.length; i++) {
            tbody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${addItems[i].name}</td>
                    <td>${addItems[i].price}</td>
                </tr>
            `;
            sum += parseInt(addItems[i].price);
        }
        totalPrice.innerHTML = sum;

    }
}


const bookbtn = document.querySelector("#book-btn");
const warningcart = document.querySelector(".warning");
bookbtn.addEventListener("click", () => {

    var params = {
        name : document.querySelector("#fullname").value,
        email : document.querySelector("#emailid").value,
        phone : document.querySelector("#phonenumber").value
    };

    console.log(params.name); 
    console.log(params.email); 
    console.log(params.phone); 

    if (addItems == 0) {
        warningcart.classList.remove("hide");
    }

    if(addItems != 0){
        document.querySelector(".success").classList.remove("hide");
        setTimeout(()=>{
        document.querySelector(".success").classList.add("hide");
        },2000);

        

        emailjs.send("service_e2jgbiw","template_1rofa49",params).then(()=>{
            console.log("email send successfully");
        }).catch((error)=>{
            console.log("error to send main ",error);
        })
    }
})



