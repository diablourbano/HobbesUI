[![CircleCI](https://circleci.com/gh/diablourbano/HobbesUI/tree/master.svg?style=svg)](https://circleci.com/gh/diablourbano/HobbesUI/tree/master)

# HobbesUI
### _a rapid development environment for UI components_

Think of Storybook but simplified and thought for ReactNative from scratch.

React Native development world, even related with reactjs, has important differences, one of those the UI Components velocity development.

Imagine you have 5 screens, with several components (buttons, labels, icons, etc) among them. If you refresh the app and navigate through 
the app everytime you’re checking your changes, then you’re losing time and doing manual and boring steps that shouldn’t be avoided.

Something similar can be said if you instead modify your app route to render the first screen, then you need to modify something that’s 
already there just to avoid the scenario described above. *That’s an ugly hack.*

## Requirements
```
- react 16.8.3
- react-native 0.59.4
 - react-navigation v3
 - react-navigation-drawer
```

## Install
```
yarn install hobbesui --dev
```

_note: if you want to use it with react-navigation v2 please use [v0.0.1](https://github.com/diablourbano/hobbesui/tree/v0.0.1)_

## Configuration
Because mobile environment is different from web, we can’t think of a solution like this in terms like storybook or styleguidist - or any similar tool - do. 

So there’s a little manual configuration you need to set up, which also gives the freedom to decide under which circumstances you want to include *hobbesui* i.e. only development, also for staging, a different build for the designer, etc.

Add `styleguidesToLoad.js` file to the root of your project, into this file you need to import every file you create to render the components previews, i.e.

```
import 'components/MyComponent/myComponent.hobbes.js';
import 'components/MyOtherComponent/myOtherComponent.hobbes.js';
import 'screens/Login/Login.hobbes.js';
```

_`*.hobbes.js` extension is just a suggestion to differentiate your source code files from your `hobbesui` files, you could use any convention but be consistent_

You need to set your app to recognize *hobbesui* as part of your app:

If you want to include *hobbesui* as part of your routes, then

```
import { HobbesFlow } from 'hobbesui';
```

and set it on any part of your app route you consider relevant and configure your app to be able to access it.

If you want to render `hobbesui` standalone, then replace the root of your app with `HobbesFlow`.

## Use it
*hobbesui* follows the` Lego concept` idea - there’re several ways to call it, I like to call it like that, you can read my position on that
topic [here](https://www.diablourbano.com/the-lego-concept/), you can find a lot of literature on the componentization subject - and renders 
a View with your screen or component plus a nagivation drawer which allows you to categorize your components, i.e. components 
(buttons, labels, colors, etc) scenes (think of the presentational side of an screen).

```
import React from 'react';
import { Hobbes } from 'hobbesui';
import MyComponent from './myComponent';

Hobbes.add({
  parent: 'FOO',
  group: 'BAR',
  id: 'DEFAULT_STATE',
  title: 'my component default state',
  component: (
    <MyComponent
      someProp="someProp"
    />
  ),
});
```

### Properties
*id:* [_required_ _string_ ] unique identifier, it's used to navigate to the component to be rendered.

*parent:* [_optional_ _string_ default: 'NOPARENT'] i.e. COMPONENTS, SCREENS, WORKFLOWS (more on this bellow).

*group:* [_optional_ _string_ default: 'UNGROUPED'] group your components by different criterias, i.e. Form, Label, Header, Login, Payment.

*title:* [_optional_ _string_ default: _id_]

component: [_required_ _react component_] your component to be rendered.

Because *hobbesui* uses react-navigation for its components rendering, you can also implement workflows between your scenes if you pass 
them `navigation` props, this can accelerate and improve the app workflow/navigation between screens

### Use case beyond the basics
This is something to make happy not only to your inner developer but also to the designer and any person wanting to test the UI screens and navigation across screens based on different states.

*Example:*

Add to `Hobes` a group of screens with common `Parent` i.e *WORKFLOWS* and common `Group` i.e. *LOGIN*, then if you implement your scenes to receive the navigation action as prop from your *hobbesui* definition component you can use the `id` of each screen to navigate back and fort to and from it.

```
import React from 'react';
import _yourNavigationFunct_ from 'navigationLibraryYoureUsing';
import { Hobbes } from 'hobbesui';
import Login from './Login';
import Home from './Home';

Hobbes.add({
  parent: 'WORKFLOW',
  group: 'LOGIN',
  id: 'LOGIN_ON_SUCCESS',
  title: 'Login screen on success',
  component: (
    <Login
      someProp="someProp"
      onSuccess={() => yourNavigationFunc.navigate('HOME')}
    />
  ),
});

Hobbes.add({
  parent: 'WORKFLOW',
  group: 'LOGIN',
  id: 'HOME_ON_SUCCESS',
  title: 'Home screen',
  component: (
    <Home
      anyProp="anyProp"
    />
  ),
});
```

You'll be able to access each isolated screen but you'll also be able to navigate from `Login` to `Home` as if the user logs in successfully.
