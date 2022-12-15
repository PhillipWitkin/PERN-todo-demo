# PERN Stack TODO App

### **Purpose** - Demonstrate a simple TODO full-stack application with a Postgres database, Node Express API backend, and React frontend for containerization in Docker
#  
### **Description** - This is a simple PERN stack application, a Todo List which performs CRUD operations on a single resource. It consists of a React front-end, back-end API using Node and Express, and persisting data in a Postresql database. 
* The front end in React is based off https://github.com/mdn/todo-react, which is just a React front-end that uses only mock data. Fetch API calls were added to connect it to a back-end   
* The back end is an Express server in Node.js which uses the Sequelize ORM to connect to the postgres database.
  * Note - Migration and Seed data files are supplied for the sequelize-cli, but are not yet configured to work in Docker

#

## How to run locally: 

###  Fork and clone the project repository
* To _fork_ the project to your personal Github, click the `Fork` button located at the top right of the project, then `git clone <repo>` from the forked repository.

###  Setting upstream remote (optional)
* Link the local repository just created with the original you forked from 
  * If new content is added to this repository, you can pull the new changes, but the remote 'origin' points to your forked version
  * Add another remote and call it 'upstream':
    * `git remote add upstream https://github.com/PhillipWitkin/PERN-todo-demo`
* To fetch or pull changes, we tell git to look at the Github upstream remote (pointing here) instead of the origin remote (which points to your fork):
  * For git to try and merge changes, we use `git pull <remote> <branch>`:
    * `git pull upstream main`
  * In case there of a merge conflict, we can update all remote branches, but save merging for later using git fetch <remote>:
    * `git fetch upstream`

###  Switch to the 'dockerized' branch
* Navigate to the root of your local repository
* Checkout to the dockerized branch by running 
  * `git checkout dockerized`

### Use Docker Compose to build and start the application
* From the project root folder, run 
  * `docker-compose up` 
  * This will build our Docker images, and start each service running in a seperate Docker container
* Four containerized services are specfied in the docker-compose.yaml file:
  * todo-db - running our instance of postgres
  * pgadmin - running pgAdmin, a postgres workbench tool which monitors todo-db
  * todo-api - running the Express API backend server
  * todo-ui - runnng the Node server for React contents
* The database will be automatially created with a Tasks table defined, and data seeded  
* The services will now be running in Docker, but can be reached via browser as if it were running natively
  * The client-facing UI can be reached by browser on localhost port 3000 - http://localhost:3000/
  * The API will be served on localhost port 8082 - http://127.0.0.1:8082/api/tasks
  * pgAdmin will run in a browser pointing at localhost port 8080, and redirect to http://localhost:8080/login?next=%2F for credentials
    * As set in docker-compose.yaml, username is set to phillip.witkin@galvanize.com
    * Password is set to 'docker'
