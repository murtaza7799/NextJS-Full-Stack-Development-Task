// A mock function to mimic making an async request for data

import { encryptToAES } from "@/lib/encryption";
import { types_user_signup } from "@/types/auth";


// user sign up
export interface  Response {
  data: {
    MessageCode: string;
    MessageDescription: string;
  };
  status: number;
}

// leave response types for new for awaiting backend
export const user_signup = async (userdata: types_user_signup) => {

    let response : Response ={
      data: {
        MessageCode: "",
        MessageDescription: "",
      },
      status: 0,
    }

    const { name, email, password, city, username } = userdata;
    // const encryptedPassword = encryptToAES(password, "this is the test key for now");
    const apiresponse = await fetch(`${process.env.API_URL}/user/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: password, username, city }),
    });

    const result: { data: any } = await apiresponse.json();

  if (result?.data && result.data.MessageCode === "User Created") {
    response = {
      data: {
        MessageCode: result.data.MessageCode,
        MessageDescription: result.data.MessageDescription,
      },
      status: apiresponse.status,
    };
  } else if (result?.data) {
    response = {
      data: {
        MessageCode: result.data.MessageCode,
        MessageDescription: result.data.MessageDescription,
      },
      status: apiresponse.status,
    };
  } else {
    response = {
      data: {
        MessageCode: "Unknown Error",
        MessageDescription: "An unexpected error occurred.",
      },
      status: apiresponse.status,
    };
  }
 


    return response;
  };

 //not needed for now
// export const user_signin = async (amount = 1) => {
//     const response = await fetch("http://localhost:3000/api/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount }),
//     });
//     const result: { data: number } = await response.json();
  
//     return result;
//   };
  
  