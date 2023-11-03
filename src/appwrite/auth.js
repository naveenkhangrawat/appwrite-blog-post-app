import config from '../config/config';
import { Client, Account, ID } from "appwrite";

class AuthService {

    constructor(){
        this.client = new Client()
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
           throw error;
        }
    }

    async login({email, password}) {
        try {
            const loginAccount = await this.account.createEmailSession(email, password);
            return loginAccount;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
             const currentUser = await this.account.get();
             if(currentUser) {
                return currentUser;
             } else {
                return null;
             }
        } catch (error) {
            console.log('getCurrentUser error', error);
        }
    }

    async logout() {
        try {
            const logoutAccount = await this.account.deleteSessions();
            return logoutAccount;
        } catch (error) {
            console.log('logout error', error);
        }
    }
}

const authService = new AuthService();

export default authService;