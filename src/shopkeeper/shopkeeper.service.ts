import { Injectable } from '@nestjs/common';
import  mongoose  from 'mongoose';

@Injectable()
export class ShopkeeperService {

    async update_details(body){
        const {shopName,phoneNumber,address,gstNumber,shopStatus}=body

        const db = mongoose.createConnection(process.env.MONGO_URI + '/shopkeepers');
        const shopkeeper_collection=db.collection('shopkeeper');

        try{
        await shopkeeper_collection.updateOne(
            { shopName }, // or some identifier to find the shopkeeper
            {
              $set: {
                shop_name: shopName,
                phone_number: phoneNumber,
                address: address,
                GST_number: gstNumber,
                shop_status: shopStatus
              }
            },
            { upsert: true } // Optional: creates a new doc if none is found
          );
          return {message:"Your details are successfully updated"}
        }
        catch(err){
            return {message:"Unable to update your shop details.Please contact your administrator"}
        }
          

        
    }
}
