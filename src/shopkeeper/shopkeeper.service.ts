import { Injectable } from '@nestjs/common';
import  mongoose  from 'mongoose';

@Injectable()
export class ShopkeeperService {

  async update_details(username: string, body) {
    const { shopName, phoneNumber, address, gstNumber, shopStatus } = body;
  
    const db = mongoose.createConnection(process.env.MONGO_URI + '/dropshipping');
    const shopkeeper_collection = db.collection('users');
    console.log("username is " + username)
    try {
      await shopkeeper_collection.updateOne(
        
        { username }, // ← match using userId
        {
          $set: {
            shop_name: shopName,
            phone_number: phoneNumber,
            address: address,
            GST_number: gstNumber,
            shop_status: shopStatus,
          },
        },
      );
      return { message: "Your details are successfully updated" };
    } catch (err) {
      console.error('Update error:', err);
      return { message: "Unable to update your shop details. Please contact your administrator" };
    }
  }
  
}
