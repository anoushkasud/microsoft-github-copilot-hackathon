const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expanse = document.getElementById('expanse');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transactions
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert('Please enter valid text and value');
    }
    else {
        const transaction = {
            id: genID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

function genID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class = 'delete-btn' onclick="removeTransaction(${transaction.id})" >x</button>
    `
    list.appendChild(item);

}
//remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

// update values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const inc = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const exp = ((total - inc) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    income.innerText = `$${inc}`;
    expanse.innerText = `$${exp}`;
}
// update local storage
function updateLocalStorage() {
    localStorage.setItem(
        "transactions", JSON.stringify(transactions)
    );
}

// Init App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener("submit", addTransaction);