<p align="center">
  <a href="https://github.com/MestreWil/unisenac-full-stack-project/blob/main/Vector.png">
    <img src="Vector.png" alt="Logo" width="650" height="180">
  </a>

<h3 align="center">MusicRATE</h3>
<br>

Home    |      Album Page
:-------------------------:|:-------------------------:
![](https://github.com/MestreWil/unisenac-full-stack-project/blob/main/shoots/Captura%20de%20tela%202024-07-26%20201327.png) | ![](https://github.com/MestreWil/unisenac-full-stack-project/blob/main/shoots/Captura%20de%20tela%202024-07-26%20201310.png)

User page   |   Login Page
:-------------------------:|:-------------------------:
![](https://github.com/MestreWil/unisenac-full-stack-project/blob/main/shoots/Captura%20de%20tela%202024-07-26%20201341.png) | ![](https://github.com/MestreWil/unisenac-full-stack-project/blob/main/shoots/Captura%20de%20tela%202024-07-26%20201352.png)


Sign up Page  |   Artist Page
:-------------------------:|:-------------------------:
![](https://github.com/MestreWil/unisenac-full-stack-project/blob/main/shoots/Captura%20de%20tela%202024-07-26%20201403.png) | ![](https://github.com/MestreWil/unisenac-full-stack-project/blob/main/shoots/Captura%20de%20tela%202024-07-26%20203301.png)


## Summary
* [What is MusicRATE](#what-is-musicrate)
* [How to install?](#how-to-install)
* [Tools](#tools)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## What is MusicRATE?
This project aims to provide a web platform where people can share their opinions about albums or artists, based on reviews and scores ranging from 0 to 5. Our idea is inspired by the IMDb website and our passion for listening to music. We are aware that there may be some bugs, so please feel free to explore the code and share any suggestions for improvements. 😉

## How to install?
Obs: 
- At the moment, you need to have installed Postgre Database in your machine, and create a datababe called "MusicRATE" because we don't use Docker, sorry ☹️
- You must have installed Python 3.10 interpreter or more recent version
1. Run Backend:
```
// Navigate to the backend folder
$ cd backend

// Create a venv (virtual environment to install dependencies)
$ python -m venv venv

// Activate venv
$ ./venv/Scripts/activate

// Install dependencies in your venv (please, look at your terminal to check if you in virtual environment)
$ pip install -r requirements.txt

// Create migrations
$ python manage.py migrate

// Create a super user to enter in admin panel
$ python manage.py createsuperuser

// RUN THE BACKEND
$ python manage.py runserver

// to enter in admin panel, just put /admin in the end of URL from the path
```
2. Run Frontend:
Obs:
- You must have node 10 interpreter or more recent

``` 
// Navigate to the frontend folder:
$ cd frontend

// create a next project
$ npx create-next-app 

// RUN THE FRONTEND:
$ npm run dev

```


## Tools
* Django REST framework for backend: [Django-REST-framework](https://www.django-rest-framework.org/)
* React with NextJs framework for frontend: [Nextjs](https://nextjs.org/)
* PostgreSQL for Database: [PostgreSQL](https://www.postgresql.org/)
* Postman to test API: [Postman](https://www.postman.com/)

## Contact
William Tavares de Moura (Backend Developer) - [LinkedIn](https://www.linkedin.com/in/william-tavares-de-moura/)

Thiago Schiedeck Dias da Silveira (Frontend Developer) - [LinkedIn](https://www.linkedin.com/in/thiago-schiedeck-dias-da-silveira-9943321b3/)

Vitor Baldissera (UX/UI Designer) - [LinkedIn](https://www.linkedin.com/in/vitor-baldissera-b45819214/) 

If you find any issue or just want to talk about the project, please contact with us!

