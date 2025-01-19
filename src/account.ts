export type Account = {
    accountNumber: string;
    ownerName: string;
    email: string;
    balance: number;
};

export class AccountManager {
    private accounts: Account[] = [];

    /**
     * Create a new bank account.
     * @param ownerName Name of the account owner
     * @param email Email of the account owner
     * @returns The created account or an error if the account already exists
     */
    createAccount(ownerName: string, email: string): Account {
        const existingAccount = this.accounts.find((account) => account.email === email);
        if (existingAccount) {
            throw new Error("Account with this email already exists.");
        }

        const accountNumber = `ACC-${Math.floor(100000 + Math.random() * 900000)}`;
        const newAccount: Account = { accountNumber, ownerName, email, balance: 0 };
        this.accounts.push(newAccount);

        return newAccount;
    }

    /**
     * Deposit money into an account.
     * @param accountNumber The account number to deposit into
     * @param amount The amount to deposit
     * @returns A success message if deposit is successful, or an error message if invalid amount
     */
    deposit(accountNumber: string, amount: number): string {
        if (isNaN(amount)) {
            return "Invalid amount.";
        }
        const account = this.accounts.find((account) => account.accountNumber === accountNumber);

        if (!account) {
            return "Account not found.";
        }

        if (amount <= 0) {
            return "Deposit amount must be greater than zero.";
        }

        account.balance += amount;
        return `Deposit successful. New balance: $${account.balance.toFixed(2)}`;
    }

    /**
     * Get all accounts (for testing and verification).
     */
    getAllAccounts(): Account[] {
        return this.accounts;
    }
}
