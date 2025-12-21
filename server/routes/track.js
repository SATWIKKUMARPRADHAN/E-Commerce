import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();


//function to get Shiprocket auth token
const getShiprocketAuthToken = async () => {
    try{
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: process.env.SHIPMENT_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error('Error fetching Shiprocket auth token:', error);
        throw error;
    }   
};

// Route to track order by AWB number
router.get('/:awb', async (req, res)=> {
    const awbCode = req.params.awb;
    

    if (awbCode === '123456') {
        return res.json({
            track_status: "Out For Delivery",
            shipment_status: 17,
            shipment_track_activities: [
                {
                    date: "2025-12-21 09:30:00",
                    activity: "Out for Delivery",
                    location: "Bangalore Hub"
                },
                {
                    date: "2025-12-20 18:45:00",
                    activity: "Arrived at Destination City",
                    location: "Bangalore"
                },
                {
                    date: "2025-12-19 14:20:00",
                    activity: "In Transit",
                    location: "Mumbai Hub"
                },
                {
                    date: "2025-12-18 10:00:00",
                    activity: "Order Picked Up",
                    location: "Mumbai Warehouse"
                }
            ]
        });
    } 
    //----- END MOCK DATA ----

    try{
        const token = await getShiprocketAuthToken();

        if(!token)return res.status(500).json({message: 'failed to authenticate with courier services'});

        const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        

        const data = response.data;

        if(data && data.tracking_data){
            res.json(data.tracking_data);
        }else{
            res.status(404).json({message: 'Tracking details not found'});
        }

    }catch(error){
        // console.error('Error fetching tracking details:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})
export default router;