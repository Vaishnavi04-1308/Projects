import axios from 'axios';
import OpenAI from "openai";
//const axios = require('axios'); // legacy way
export const LoginApi = async (params) => {
  var returnData;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5469/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(params)
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;
    
    
}

export const GetUsers = async (params) => {
  var returnData;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5469/get-users?q=all',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(params)
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}
export const GetAnalytics = async (params) => {
  var returnData;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5469/get-analytics?q=all',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(params)
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}
export const UpdateUsers = async (params) => {
  console.log(params);
  var returnData;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5469/update-users',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(params)
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}
export const CreateAccountApi = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/create-account',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : params
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}
export const BookAppointment = async (params) => {
  console.log(params);
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/book-event',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(params)
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}

export const AddEvent = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/add-event',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(params)
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}

export const reviewEditor = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/review',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(params)
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}

export const UpdateEvent = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/update-event',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(params)
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}
export const DeleteEvent = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/delete-event',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(params)
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}
export const deleteEvent = async (params) => {
  // console.log(params);
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5469/delete-booking',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(params)
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}

export const getAppointmentList = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5469/get-events?q=${params}`,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
await axios.request(config)
.then((data) => {
  returnData = data.data;
})
return returnData;
}
export const getReviews = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5469/get-review?q=${params}`,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
await axios.request(config)
.then((data) => {
  returnData = data.data;
})
return returnData;
}

export const searchEvent = async (params) => {
  console.log(params);
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5469/search-event?q=${params}`,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
await axios.request(config)
.then((response) => {

  returnData =  {
    statusCode : response.status,
  data : response.data}
    ;
})
.catch((error) => {
  returnData =  {
    statusCode : error.response.status,
  data : error.response.data}
    ;
});
return returnData;
}
export const getPatient = async (params) => {
  var returnData;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5469/user-details?username=${params}`,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
await axios.request(config)
.then((data) => {
  returnData = data.data;
})
return returnData;
}

export const getDoctorList = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5469/get-events?q=${params}`,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
await axios.request(config)
.then((data) => {
  returnData = data.data;
})
return returnData;
}

export const getByZipcode = async (params) => {
  var returnData;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5469/yelp-data?key=${params.find}&zipcode=${params.zipcode}&isnearme=${params.isnearme}`,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
await axios.request(config)
.then((data) => {
  returnData = data.data.businesses;
})
return returnData;
}

export const Serp = async (query) => {
  var response;
  await fetch(`http://localhost:5469/serp?q=${query}`, { mode: "cors" })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      response = res;
    });
  return response;
};

/////////////////////////Chat gpt////////////////////////////////////////

const openai = new OpenAI({
  apiKey: "sk-proj-3iMJO63fM8GVYA3XfvXJT3BlbkFJTGmnHPIvasj1dgsKg1wy",
  dangerouslyAllowBrowser: true,
});

export const Agent = async (userInput) => {
  var messages = [
    {
      role: "system",
      content: userInput,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  return response.choices[0].message.content;
};

export const Geocode = async (eventName) => {
  var returnData;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:5469/geocode",
    headers: {
      "Content-Type": "application/json",
    },
    data: eventName,
  };

  await axios
    .request(config)
    .then((response) => {
      returnData = {
        statusCode: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      returnData = {
        statusCode: error.response.status,
        data: error.response.data,
      };
    });
  return returnData;
};


export const Recommendation = async (query) => {
  const openai2 = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  async function getLocation() {
    const response = await fetch(
      "https://ipapi.co/json/"
    );
    const locationData = await response.json();
    console.log(locationData);
    return locationData;
  }
  async function getCurrentWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  }
  const tools = [
    {
      type: "function",
      function: {
        name: "getCurrentWeather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            latitude: {
              type: "string",
            },
            longitude: {
              type: "string",
            },
          },
          required: ["longitude", "latitude"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "getLocation",
        description: "Get the user's location based on their IP address",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    },
  ];
  const availableTools = {
    getCurrentWeather,
    getLocation,
  };
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Only use the functions you have been provided with.",
    },
  ];

  async function agent(userInput) {
    messages.push({
      role: "user",
      content: userInput,
    });
    for (let i = 0; i < 5; i++) {
      const response = await openai2.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: messages,
        tools: tools,
      });

      const { finish_reason, message } = response.choices[0];

      if (finish_reason === "tool_calls" && message.tool_calls) {
        const functionName = message.tool_calls[0].function.name;
        const functionToCall = availableTools[functionName];
        const functionArgs = JSON.parse(
          message.tool_calls[0].function.arguments
        );
        const functionArgsArr = Object.values(functionArgs);
        const functionResponse = await functionToCall?.apply(
          null,
          functionArgsArr
        );

        messages.push({
          role: "function",
          name: functionName,
          content: `
            The result of the last function was this: ${JSON.stringify(
              functionResponse
            )}
            `,
        });
      } else if (finish_reason === "stop") {
        messages.push(message);
        return message.content;
      }
    }
    return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";
  }
  const response = await agent(query);
  return response;
};