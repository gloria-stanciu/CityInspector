# CityInspector

## ROUTES

### Facilities
Level | Request type | Route |
--- | --- | --- |
user | get | [/api/facilities/]
admin | post | [/api/facilities/]
user | get | [/api/facilities/:id]
admin | patch | [/api/facilities/:id]
admin | delete | [/api/facilities/:id]

### ProblemTypes
Level | Request type | Route |
--- | --- | --- |
user | get | [/api/problemTypes/]
admin | post | [/api/problemTypes/]
user | get | [/api/problemTypes/:id]
admin | patch | [/api/problemTypes/:id]
admin | delete | [/api/problemTypes/:id]

### Problems
Level | Request type | Route |
--- | --- | --- |
user | get | [/api/problems/]
user | get | [/api/problems/:userId]
user | post | [/api/problems/:userId]
user | patch | [/api/problems/:id]
admin | delete | [/api/problems/:id]

### Transactions
Level | Request type | Route |
--- | --- | --- |
admin | get | [/api/transactions/]
user | get | [/api/transactions/user/:userId]
user | get | [/api/transactions/:id]
user | post | [/api/transactions/:id]

### Users
Level | Request type | Route |
--- | --- | --- |
admin | get | [/api/users/]
user | get | [/api/users/:id]
user | patch | [/api/users/:id]
admin | delete | [/api/users/:id]
public | post | [/api/users/register]
public | post | [/api/users/login]
