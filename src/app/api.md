Base Link = http://scn-backend-production.up.railway.app/
cookies are set automatically.

POST
/auth/initiate-registration
Start registration - send verification OTP

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"email": "jane@example.com",
"firstName": "Jane",
"lastName": "Doe"
}
Responses
Code Description Links
200
No links

POST
/auth/verify-email
Verify email OTP

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"email": "jane@example.com",
"code": "123456"
}
Responses
Code Description Links
200
No links

POST
/auth/complete-registration
Set password and complete registration

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"registrationToken": "string",
"password": "Secret@123",
"tosAccepted": true
}
Responses
Code Description Links
201
No links

POST
/auth/resend-verification
Resend email verification OTP

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"email": "jane@example.com"
}
Responses
Code Description Links
200
No links

POST
/auth/forgot-password
Request password reset OTP

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"email": "jane@example.com"
}
Responses
Code Description Links
200
No links

POST
/auth/verify-reset-otp
Verify password reset OTP

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"email": "jane@example.com",
"code": "123456"
}
Responses
Code Description Links
200
No links

POST
/auth/reset-password
Reset password using reset token

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"resetToken": "string",
"newPassword": "NewSecret@123"
}
Responses
Code Description Links
200
No links

POST
/auth/login
Authenticate user

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"email": "jane@example.com",
"password": "Secret@123"
}
Responses
Code Description Links
200

POST
/payments/initialize
Initialize a Paystack subscription checkout

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"planId": "community_monthly"
}
Responses
Code Description Links
200
Returns checkout url to be used in the frontend
No links

POST
/payments/verify
Manually verify a payment reference

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"reference": "abc123xyz"
}
Responses
Code Description Links
200
No links

GET
/payments/callback
Paystack redirect callback - verifies and activates subscription

Parameters
Try it out
Name Description
reference \*
string
(query)
reference
Responses
Code Description Links
200
No links

similar inline paystack integration:
const access_code = data?.url?.split("/").pop();
if (access_code) {
// @ts-ignore
import("@paystack/inline-js").then(({ default: PaystackPop }) => {
const popup = new PaystackPop();
const trans = popup.resumeTransaction(access_code);
trans.onSuccess = () => {
setShowSuccessModal(true);
};
trans.onError = () => {
};
});

GET
/auth/google

GET
/auth/google/callback

Parameters
Try it out
No parameters

Responses
Code Description Links
200

users

GET
/users/profile/me

Parameters
Try it out
No parameters

Responses
Code Description Links
200
No links

GET
/users/{id}

Parameters
Try it out
Name Description
id \*
string
(path)
id
Responses
Code Description Links
200
No links

PUT
/users/{id}

Parameters
Try it out
Name Description
id \*
string
(path)
id
Request body

application/json
Example Value
Schema
{}
Responses
Code Description Links
200
