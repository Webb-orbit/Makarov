import { Client, Databases, ID, Query } from "appwrite";
import Appwriteconf from "./appwrite.config";

class adminsett {
  client;
  sett;

  constructor(){
        this.client = new Client()
        this.client
        .setEndpoint(Appwriteconf.appwriteendpoint)
        .setProject(Appwriteconf.projectid);

        this.sett = new Databases(this.client)
  }

  async createadmin(headername){
        return await this.sett.createDocument(Appwriteconf.appwritebase, Appwriteconf.admincollid, ID.unique(), {
            headername
        })
  }
  
}
const Settbase = new adminsett()
export default Settbase
