# ChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.
Its a simple angular app that demos the use of firebase authentication and firebase firestore to create a chat application. Live demo can be found [https://groupchat-e4218.firebaseapp.com]

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

 ## Clone
```
git clone https://github.com/ave12345/ChatApp.git
```

## Firebase Configuration
```
Visit https://console.firebase.google.com 
```
Create a new firebase project. Under project overview, add a web application to your project. copy the creditials given and paste it in `src/app/environment/environment.ts` for dev or `src/app/environment/environment.prod.ts` for production
```
export const environment = {
  production: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }
};
```
 Then, in your firebase console, enable firebase authentication with Google.

##Execution
run in your console
```
ng serve --open
```
