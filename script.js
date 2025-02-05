new Vue({
    el: '#app',
    data() {
        return {
            expenseName: '',
            expenseAmount: '',
            expenseCategory: 'Food',
            expenses: JSON.parse(localStorage.getItem('expenses')) || [],
        };
    },
    computed: {
        totalAmount() {
            return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        }
    },
    methods: {
        addExpense() {
            const expenseName = this.expenseName.trim();
            const expenseAmount = parseFloat(this.expenseAmount.trim());
            const expenseCategory = this.expenseCategory;
            const expenseDate = new Date().toLocaleDateString();

            if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
                const newExpense = { name: expenseName, amount: expenseAmount, category: expenseCategory, date: expenseDate };
                this.expenses.push(newExpense);
                this.saveExpenses();
                this.clearForm();
            } else {
                alert('Please enter a valid expense name and amount.');
            }
        },
        deleteExpense(index) {
            this.expenses.splice(index, 1);
            this.saveExpenses();
        },
        clearExpenses() {
            this.expenses = [];
            this.saveExpenses();
        },
        saveExpenses() {
            localStorage.setItem('expenses', JSON.stringify(this.expenses));
        },
        clearForm() {
            this.expenseName = '';
            this.expenseAmount = '';
        }
    },
    mounted() {
        this.renderExpenses();
    },
    watch: {
        expenses() {
            this.saveExpenses();
        }
    }
});
