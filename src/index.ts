import * as readline from "readline";
import { AccountManager } from "./account";


const accountManager = new AccountManager();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const menu = `
===== Bank Account Manager =====
1. Create a New Account
2. View All Accounts
3. Deposit Money
4. Exit
================================
Choose an option: `;

function showMenu(): void {
    rl.question(menu, (choice) => {
        switch (choice.trim()) {
            case "1":
                createAccount();
                break;
            case "2":
                viewAccounts();
                break;
            case "3":
                depositMoney();
                break;
            case "4":
                console.log("Exiting. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                showMenu();
        }
    });
}

function createAccount(): void {
    rl.question("Enter the owner's name: ", (ownerName) => {
        rl.question("Enter the email: ", (email) => {
            try {
                const newAccount = accountManager.createAccount(ownerName, email);
                console.log("Account created successfully!");
                console.log(`Account Number: ${newAccount.accountNumber}`);
                console.log(`Owner Name: ${newAccount.ownerName}`);
                console.log(`Email: ${newAccount.email}`);
                console.log(`Balance: ${newAccount.balance}`);
            } catch (error) {
                console.error(`Error: ${(error as Error).message}`);
            }
            showMenu();
        });
    });
}

function viewAccounts(): void {
    const accounts = accountManager.getAllAccounts();
    if (accounts.length === 0) {
        console.log("No accounts found.");
    } else {
        console.log("===== All Accounts =====");
        accounts.forEach((account, index) => {
            console.log(`${index + 1}.`);
            console.log(`   Account Number: ${account.accountNumber}`);
            console.log(`   Owner Name: ${account.ownerName}`);
            console.log(`   Email: ${account.email}`);
            console.log(`   Balance: ${account.balance}`);
        });
        console.log("========================");
    }
    showMenu();
}

function depositMoney(): void {
    rl.question("Enter the account number: ", (accountNumber) => {
        rl.question("Enter the deposit amount: $", (amountStr) => {
            const amount = parseFloat(amountStr);
            const result = accountManager.deposit(accountNumber, amount);
            console.log(result);
            showMenu();
        });
    });
}

showMenu();
