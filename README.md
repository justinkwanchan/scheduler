# Interview Scheduler

Interview Scheduler is a simple, single-page application for scheduling appointments. Built using React, it allows users to create, edit, and delete appointments within an arbitrary week. All updates are dynamically performed without page refreshing.

Additional features include:
* A Tweet form which is hidden away and can be activated by clicking on the command or arrows in the top right corner of the app
* A reactive counter showing how many characters are allowed until the tweet length limit
* Dynamic error messages that alert the user if they try to submit empty tweets or are beyond the character limit
* An auto-expanding text field (to contain multiple lines)
* CSS-animated arrows
* Accessibility features including alt text on images and autofocus on the text field

## Final Product

| !["The landing page for the app"](https://github.com/justinkwanchan/scheduler/blob/master/docs/readmemain.png?raw=true) | !["The form for adding an appointment"](https://github.com/justinkwanchan/scheduler/blob/master/docs/readmeadd.png?raw=true) |
| ------------- |:-------------:|
| !["The added appointment"](https://github.com/justinkwanchan/scheduler/blob/master/docs/readmeshow.png?raw=true) | !["Deleting an appointment"](https://github.com/justinkwanchan/scheduler/blob/master/docs/readmedelete.png?raw=true) |


## Dependencies

- axios
- classnames
- body-normalize.css
- react
- react-dom
- react-hooks-testing-library
- react-scripts

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
