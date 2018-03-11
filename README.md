# Daug mobile app

This repo is the mobile app for Daug.

## What is Daug?

**Daug is a social network for pets.**

- Your pets can **sign up or login** using their paws.
- They can **upload selfies** or **post their thoughts** for other pets to see.
- They can also look at **other pets posts** and either **paw** (like) or **scratch** (dislike) it.

### [Demo - Try it on Expo](https://expo.io/@makkhay/daug-app)

## Getting started

```
git clone git@github.com:mobilespace/daug-mobile.git

exp start

exp ios
```

## Assignment #1

### Objectives

- Learn how to build & organize screens in RN
- Learn advanced RN styling and use LinearGradient, Image, Icons & Custom Fonts
- Learn how to use mock data for prototyping UI screens
- Learn how to use NPM libaries such as React Native Elements, Expo & React Native Vector Icons

## Designs

Intro, Login & Sign up screen based on Robinhood App.

Profile screen based on Instagram.

Social feed screen based on Facebook.

### Other design ideas

- [Login screen designs on Pinterest](https://www.pinterest.com/timoa/mobile-ui-logins/?lp=true)
- [Mobile UI on Dribble](https://dribbble.com/search?q=mobile+UI)
- [Instagram UI kit - Sketch file](https://www.sketchappsources.com/free-source/2023-instagram-based-ui-kit-sketch-freebie-resource.html)

### TODO

- [x] Design & build an Intro Screen
  - [ ] :star: **Bonus:** Add [Snap Carousel](https://github.com/archriss/react-native-snap-carousel) with [Lottie animations](https://docs.expo.io/versions/latest/sdk/lottie.html) to Intro Screen
- [x] Design & build an Signup Screen
  - [ ] :star: **Bonus:** Add buttons to sign up with Facebook & Twitter
- [x] Design & build an Login Screen
  - [ ] :star: **Bonus:** Add buttons to login with Facebook & Twitter
- [x] Design & build an Profile Screen
  - [ ] :star: **Bonus:** Add the Logout button
- [x] Design & build an Social Feed Screen with [Mock Data](https://raw.githubusercontent.com/mobilespace/daug-mobile/master/app/utils/constants.js?token=AHejrmtQeRKU4ntCxaYLoNiWDlF-kQdKks5am8vHwA%3D%3D)
- [x] Attach screenshots/gif of screens to `README.MD`

### Demo

![working_gif_assignment_3](https://i.imgur.com/A1KwoPU.gif)

## Assignment #2

### Objectives

- Learn how to build navigation for Daug app using [React Navigation](https://reactnavigation.org/)
- Learn mobile design patterns for navigation & screen layouts
- Learn how to quickly build RN screens and hook them up using navigation

### TODO

- [x] Understand the 3 main navigation patterns for mobile apps:
  - [x] [StackNavigator](https://reactnavigation.org/docs/hello-react-navigation.html#creating-a-stacknavigator)
  - [x] [TabNavigator](https://reactnavigation.org/docs/tab-based-navigation.html)
  - [x] [DrawerNavigator](https://reactnavigation.org/docs/drawer-based-navigation.html)
- [x] Setup a **IntroStack** (using StackNavigator) for the Intro Screen (root), Login Screen (push) & Sign Up Screen (push)
- [x] Setup a **HomeTabs** (using TabNavigator) for the Social Feed Screen (default) and Profile Screen
- [x] Setup a **RootNavigator** (using StackNavigator) with the **IntroStack** & **HomeTabs** with `mode: "modal"`
- [x] Design & build an Edit Profile Screen
- [x] Setup a **ProfileStack** (using StackNavigator) for the Profile Screen (root), Post Details Screen (push) & Edit Profile Screen (modal) with mode: "modal" and custom RNE header component
- [x] Design & build a Post Details Screen
- [x] Design & build a Create Post Screen
- [x] Setup a **SocialStack** (using StackNavigator) for the Social Feed Screen (root), Post Details Screen (push) & Create Post Screen (modal) with mode: "modal" and custom RNE header component
- [ ] :star: **Bonus:** Display Posts on ProfileScreen
- [ ] :star: **Bonus:** Setup a **HomeNavigator**(using DrawerNavigator) with the **HomeTabs** (as root) and update **RootNavigator** to use **HomeNavigator** instead of **HomeTabs**
- [x] Add working gif of app to `README.MD`

### Demo
<img src='https://github.com/makkhay/daug-app/blob/master/screenshot.gif' title='Working Demo' width='' alt='Video Walkthrough' />





## Problems?

In case you run into any problems or issues, please post it on #questions channel on the MobileSpace Slack.

## Finally

For any other questions about this repo or MobileSpace in general please reach out to [**@monte9**](https://github.com/monte9) on Github.

