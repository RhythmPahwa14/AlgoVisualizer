import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/feedback";

export const submitFeedback = async(name , email , message) =>{
    try{
        const response = await axios.post(`${API_BASE_URL}/feedback`, {
            name,
            email,
            message
        });
    }catch(err){
        console.error('Error submitting feedback:', err);
        throw err;
    }
}

