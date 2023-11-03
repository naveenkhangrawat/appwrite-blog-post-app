import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from '../config/config';

class DataBaseService {

    constructor(){
        this.client = new Client()
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status, userId}
            )
        } catch (error) {
            console.log('createPost error', error)
        }
    }

    async updatePost(id, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id,
                {title, content, featuredImage, status}
            )
        } catch (error) {
            console.log('updatePost error', error)
        }
    }

    async deletePost(id){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
            return true;
        } catch (error) {
            console.log('deletePost error', error);
            return false;
        }
    }

    async getPost(id){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log('getPost error', error)
            return false;
        }
    }

    async getAllPosts(){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal('status', 'active')]
            )
        } catch (error) {
            console.log('getAllPosts error', error)
            return false;
        }
    }

    // file upload methods

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBuckedId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('uploadFile error', error);
            return false;
        }
    }

    async deleteFile(id){
        try {
            await this.bucket.deleteFile(
                config.appwriteBuckedId,
                id
            )  
            return true;          
        } catch (error) {
            console.log('deleteFile error', error);
            return false;
        }
    }

    getFilePreview(id){
        const result = this.bucket.getFilePreview(config.appwriteBuckedId, id);
        return result;
    }

}

const databaseService = new DataBaseService();

export default databaseService;


