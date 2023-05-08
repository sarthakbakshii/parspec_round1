import { getApiResponse } from "./apiResponse";
import { debounceHandler } from "./debounce";

const currency = ( value , cur = "INR") =>{
 switch(cur){
    case "USD" : {
        return `$ ${Number(value)}`
    }
    default : {
        return `₹ ${Number(value)}`;
    }
 }
}
const percent = value => `${value} %`;

export { getApiResponse, currency, percent, debounceHandler };