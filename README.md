# hw13ORM

Installation:


Installation is a process of installing the necessary dependencies. 

You need to intialize node package manager and then run the following commands;
npm install mysql2
npm install sequelize
npm install dotenv

# Usage:

In order to use the application, first make sure that MySQL is installed.

Then, from the project root enter the sql shell and run the following command:
source db/schema.sql

Exit the sql shell and return to the command line still within your root project folder.

Run the following commands;


npm run seed
npm start


[Installation Video](https://drive.google.com/file/d/1V_DYr82X9TXGvbtI05JhVyJIaGlOK7jn/view?usp=sharing)

[Partial Function Videos](https://drive.google.com/file/d/1SJwz1qVIlO1DjCpDm2PwWx2rMtk29AJg/view?usp=sharing)
			(https://drive.google.com/file/d/1IfqT3sqrQZ9XP-1KvC9R9u8sjK9Dwkf8/view?usp=sharing)
			(https://drive.google.com/file/d/1orayESfh7TciLxIS3wBD0GtvTmO_R6h8/view?usp=sharing)

GitHub Repository

[GitHub](https://github.com/Elipticblock5/hw13ORM)


# License
MIT License


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
			



Acceptance Criteria
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database