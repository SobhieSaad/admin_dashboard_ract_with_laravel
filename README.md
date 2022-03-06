# admin_dashboard_react_with_laravel

## APIs:
#### Register API:
/api/register

#### Login API:
/api/login

### Online payment
#### 1- Razor Pay:
form here get the API_KEY: https://dashboard.razorpay.com/signup
form here get the JS code to implement: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/

#### Note: make sure to add "window" prefix in tis line:
var rzp1 = new Razorpay(options);

to be
var rzp1 = new window.Razorpay(options);

<hr/>

#### 2- Pay Pal payment:



<hr/>

#####
## Screenshots

#### Register form
<img src="/screenshots/Register.png">

#### Success Register
<img src="/screenshots/success register.png">

#### Wrong register
<img src="/screenshots/validation error.png">

#### Login form
<img src="/screenshots/Login.png">

#### wrong login
<img src="/screenshots/Login wrong email or password.png">

#### Success login
<img src="/screenshots/Success login.png">

#### Admin add category
<img src="/screenshots/Admin_add_category.png">
