

# CADWOLF - Angular App

This repo is the angular app for CADWOLF. CADWOLF is a web based engineering platform that integrates documentation, mathematics, data, and a robust part tree system directly with CAD Platforms. The stack for CADWOLF is Laravel on the back end and handling all of the non Angular aspects of the platform, the Angular app, and Google's Firebase for the data. 

Visit www.cadwolf.com to get an account and start working.

Our primary CAD integration system is Onshape. We recommend getting an account there and starting to get used to how those systems integrate with ours.


## Platform Components

CADWOLF has a number of components which integrate together to create a unique engineering experience. The primary component is the document. A document is similar to a Word document or Google Doc with the addition of a robust system to solve equations and set up for loops, while loops, if statements, and other items such as images videos, and free body diagrams. A document can be used to simultaneously solve and document a mathematical problem or design a component.

One of the other components is the dataset. A dataset is a place where a user can upload, parse, and store data from a text or Excel file. This data can then be pulled into a document for use in equations.

Workspaces are another component. They are essentially folders and allow users to create new files and navigate through subfolders.

Part Trees allow a user to build a tree of items that combine to 'build' a larger structure.

Workflows are a Gantt chart style system where users can control and establish the flow of the design process.


## Angular Components
There are a number of primary Angular components within the system that handle the four main components as well as the additional needed items.

- Workspace
  - Branches
- Document
- Dataset
- Part Tree
- Teams
- Units
- Constants
- Log
- Profile



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

