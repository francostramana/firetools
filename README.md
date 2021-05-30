# Firetool CLI

Firetool is a Command Line Interface (CLI) that allows you to do everything you can't do with Firebase Web Console. Ok, not everything... But a lot of those ;)

![example firetool](example.gif)

## Installation

### Node Package

You can easily download and install the Firetool CLI using npm (the Node Package Manager).  

```bash
npm install -g firetool
```

This will provide you with the globally accessible `firetool` command.

Note that you will need to install 
[Node.js](http://nodejs.org/) and [npm](https://npmjs.org/). Installing Node.js should install npm as well.



## Initialize
To authenticate a service account and authorize it to access Firebase services, you must provide a *private key*<sup>1</sup> through:

```bash
firetool init
```

this will prompt you for the Firebase Database Name and your Private Key. 


**<sup>1</sup>To generate a private key file for your service account:**

1. In the Firebase console, open **Settings > Service Accounts**.

2. Click **Generate New Private Key**, then confirm by clicking Generate Key.

3. **Securely store** the JSON file containing the key.

See https://firebase.google.com/docs/admin/setup#initialize-sdk


## Commands

**You can list the avalaible commands running `firetool --help` or `firetool <command> --help ` for more details.**

| **Command** | **Description**                                |
|-------------|------------------------------------------------|
| init        | Init Firebase Tools.                           |
| user        | Tools for Firebase Authentication admin tools. |
| help        | Display help for [cmd]                         |


### User/Authenticacion commands
This commands allow you to managing your Firebase Authentication users with elevated privileges.

| **Command**                   | **Description**                                                                    |
|-------------------------------|------------------------------------------------------------------------------------|
| user list [uid]               | Retrieves a list of user(s).                                                       |
| user create [options]         | Create a new Firebase Authentication user.                                         |
| user update [options] \<uid\> | Updates an existing user by their uid.                                             |
| user delete \<uid\>           | Delete a existing user by their uid.                                               |
| user validate-email \<uid\>   | Validates email to existing user. Shorthand to user update \<uid\> --emailVerified.|
| user claims \<uid\> [options] | Configure custom claims to existing user.                                          |

`[options]` params are the same properties provides by the API for managing Firebase Authentication. See https://firebase.google.com/docs/auth/admin/manage-users.

For example:

- `firetool user update --emailVerified jcIT3i4hFNSqmgxABFxH1sVxc1M2` validate user email.
- `firetool user update --displayName "Franco Stramana" jcIT3i4hFNSqmgxABFxH1sVxc1M2` change the display name for the user.
- `firetool user update --password 123456 --disabled false jcIT3i4hFNSqmgxABFxH1sVxc1M2` enabled user and change their password.

**Claims**
- `firetool user claims jcIT3i4hFNSqmgxABFxH1sVxc1M2 --set admin=true` set admin token custom claims.
- `firetool user claims jcIT3i4hFNSqmgxABFxH1sVxc1M2 --removeAll` remove all custom claims.


## Contributions
This project was born as a personal tool that I decided to share. It will grow as I need more features for my personal projects. Because of this, any contribution is welcome ;)


**Made with Node and Love!** (and of course, a few dependencies)
