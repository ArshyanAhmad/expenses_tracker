document.addEventListener("DOMContentLoaded", () => {
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const addExpensesBtn = document.getElementById("add-expenses");
    const showExpenses = document.getElementById("show-expenses");
    const totalExpenseElement = document.getElementById("total-expense");

    let expenseDetails = JSON.parse(localStorage.getItem("expenseDetails")) || [];
    expenseDetails.forEach((expense) => displayExpenses(expense))
    
    let totalExpense = 0;    

    displayTotalAmount();

    addExpensesBtn.addEventListener("click", () => {

        let nameOfExpense = expenseName.value.trim();
        let priceOfExpense = expenseAmount.value.trim();

        const newExpense = {
            id: Date.now(),
            expense_name: nameOfExpense,
            expense_amount: priceOfExpense
        }

        if(newExpense.expense_name !== "" && newExpense.expense_amount !== ""){
            expenseDetails.push(newExpense);
            displayExpenses(newExpense);
            storeInLocalStorage();
            displayTotalAmount()
        }

        expenseName.value = ''
        expenseAmount.value = ''

    })

    function storeInLocalStorage() {
        localStorage.setItem("expenseDetails", JSON.stringify(expenseDetails));
    }

    function displayTotalAmount(){
        let allExpenses = JSON.parse(localStorage.getItem("expenseDetails"));

        totalExpense = 0;

        if(allExpenses){
            allExpenses.forEach((expense) => {
                totalExpense += Number.parseInt(expense.expense_amount);
            })
        }

        totalExpenseElement.textContent = `Total $${totalExpense}`

    }

    function displayExpenses(expense){
        // show-expenses
        
        let ul = document.createElement("ul");
        ul.classList.add("ul");
        ul.innerHTML = `
                <li>${expense.expense_name}</li>
                <li>$${expense.expense_amount}</li>
                <button  data-id=${expense.id} class="delete-btn">Delete</button>
        `  

        showExpenses.appendChild(ul);
        const deleteBtn = ul.querySelector(".delete-btn")
        
        deleteBtn.addEventListener("click", () => {
            removeExpenseFromLocalStorageAndUpdate(deleteBtn);
        })
        
    }

    function removeExpenseFromLocalStorageAndUpdate(deleteBtn){
        console.log(deleteBtn);
        let removeElement = deleteBtn.parentElement;
        let removeElementId = deleteBtn.getAttribute('data-id')

        expenseDetails = expenseDetails.filter((expense) => expense.id !== Number.parseInt(removeElementId)) 

        removeElement.remove();  
        storeInLocalStorage();      
        displayTotalAmount();
    }


})