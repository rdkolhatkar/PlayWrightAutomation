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
            LoginToken = loginResponseJson.token;
            console.log(LoginToken);

        return LoginToken;
    }

    async createOrder(orderPayload){
            // Order API
            const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
              {
                  data:orderPayload,
                  headers:  {
                              'Authorization': this.getToken(),
                              'content-type': 'application/json'
                            }
              }
            )
            const orderResponseJson = await orderResponse.json();
            orderId = orderResponseJson.orders[0];
        return orderId;
    }

}

module.exports = {ApiUtils}; // This is important syntax to make your utility class globally visible and accessible 