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

