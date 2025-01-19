import { AccountManager } from "../src/account";


describe("AccountManager - Create Bank Account", () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    test("should successfully create a new account", () => {
        const ownerName = "John Doe";
        const email = "john.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        expect(account).toBeDefined();
        expect(account.ownerName).toBe(ownerName);
        expect(account.email).toBe(email);
        expect(account.accountNumber).toMatch(/^ACC-\d{6}$/);
        expect(account.balance).toBe(0);
    });

    test("should not allow creating an account with an existing email", () => {
        const ownerName = "John Doe";
        const email = "john.doe@example.com";

        accountManager.createAccount(ownerName, email);

        expect(() => {
            accountManager.createAccount("Jane Doe", email);
        }).toThrow("Account with this email already exists.");
    });

    test("should store the created accounts", () => {
        const ownerName1 = "John Doe";
        const email1 = "john.doe@example.com";
        const ownerName2 = "Jane Doe";
        const email2 = "jane.doe@example.com";

        const account1 = accountManager.createAccount(ownerName1, email1);
        const account2 = accountManager.createAccount(ownerName2, email2);

        const accounts = accountManager.getAllAccounts();
        expect(accounts.length).toBe(2);
        expect(accounts).toContainEqual(account1);
        expect(accounts).toContainEqual(account2);
    });
});

describe("AccountManager - Deposit Money", () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    test("should successfully deposit money into an account", () => {
        const ownerName = "John Doe";
        const email = "john.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        const result = accountManager.deposit(account.accountNumber, 100);
        expect(result).toBe("Deposit successful. New balance: $100.00");
        expect(account.balance).toBe(100);
    });

    test("should reject deposit with invalid (zero or negative) amount", () => {
        const ownerName = "Jane Doe";
        const email = "jane.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        const result = accountManager.deposit(account.accountNumber, -50);
        expect(result).toBe("Deposit amount must be greater than zero.");
    });

    test("should reject deposit if account not found", () => {
        const result = accountManager.deposit("ACC-999999", 100);
        expect(result).toBe("Account not found.");
    });
});

describe("AccountManager - Withdraw Money", () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    test("should successfully withdraw money from an account", () => {
        const ownerName = "John Doe";
        const email = "john.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        accountManager.deposit(account.accountNumber, 200); // Deposit to have sufficient balance
        const result = accountManager.withdraw(account.accountNumber, 100);
        expect(result).toBe("Withdrawal successful. New balance: $100.00");
        expect(account.balance).toBe(100);
    });

    test("should reject withdrawal with insufficient funds", () => {
        const ownerName = "Jane Doe";
        const email = "jane.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        const result = accountManager.withdraw(account.accountNumber, 100);
        expect(result).toBe("Insufficient funds for this withdrawal.");
        expect(account.balance).toBe(0);
    });

    test("should reject withdrawal with invalid (zero or negative) amount", () => {
        const ownerName = "Alice Doe";
        const email = "alice.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        const result = accountManager.withdraw(account.accountNumber, -50);
        expect(result).toBe("Withdrawal amount must be greater than zero.");
    });

    test("should reject withdrawal if account not found", () => {
        const result = accountManager.withdraw("ACC-999999", 50);
        expect(result).toBe("Account not found.");
    });
});

describe("AccountManager - View Account Balance", () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    test("should successfully view the balance of an account", () => {
        const ownerName = "John Doe";
        const email = "john.doe@example.com";
        const account = accountManager.createAccount(ownerName, email);

        accountManager.deposit(account.accountNumber, 200); // Deposit money to have a balance
        const result = accountManager.viewBalance(account.accountNumber);
        expect(result).toBe("Current balance: $200.00");
    });

    test("should show an error when the account is not found", () => {
        const result = accountManager.viewBalance("ACC-999999");
        expect(result).toBe("Account not found.");
    });
});


