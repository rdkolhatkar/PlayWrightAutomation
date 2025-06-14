class ApiUtils
{
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
             // Login API
            const loginResponse = await this.apiContext.post(
                "https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data:this.loginPayload , //Request Body
                    headers:{"content-type": "application/json"}
                });
            
            const loginResponseJson = await loginResponse.json();//extracting token from the api response and parsing the token
            const LoginToken = loginResponseJson.token;
            console.log(LoginToken);

        return LoginToken;
    }

    async createOrder(orderPayload){
            // Order API
            let response = {}; // Here we are creating the empty JavaScript object to store the orderID 
            response.token = await this.getToken(); // Here we are storing the Authorization token inside the response which is empty JavaScript object
            const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
              {
                  data: orderPayload,
                  headers:  {
                              'Authorization': response.token, 
                              'content-type': 'application/json'
                            }
              }
            )
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId; // Here we are storing the orderID inside our empty JavaScript object
        return response; // We are returning the response which is JavaScript object which is storing two entities inside it. response(token, orderId)
    }

}

module.exports = {ApiUtils}; // This is important syntax to make your utility class globally visible and accessible 