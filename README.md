This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Blog App


npm install
npm start
localhost:3000

Tech Stack : 
React
TypeScript
Material-UI

APIs used : 
For Data - https://jsonplaceholder.typicode.com.
For Images - https://source.unsplash.com/


Functionalities :- 

Home Button : List All the posts returned by the API https://jsonplaceholder.typicode.com.
Create New Post: Redirect to a new Page where you can create a new post.
Search Bar: Search for the post with id Enter Id ex: 1,2,3,4,5,....100 click on the search icon to search the ID.

Home Page :
Each Post have a link to read more , a random Date and a delete button.

Single Post Page:
On Single Post Page you will be redirected if you click on any post from home page
You can also read the random comments on the post by members.
A category List to list out the users who posts on the Blog

Create Post:
Enter title , userId, and content to submit the post the resource will not be really created on the server but it will be faked as if. In other words, if you try to access a post using 101 as an id, you'll get a 404 error.

Search Post:
You can search the post by entering the id from 1-100.
  
Category Page
When click on the category id it will show all the posts of the particular user.

In the API category was not an option to choose the userId as category.
API used https://jsonplaceholder.typicode.com/posts?userId=6
