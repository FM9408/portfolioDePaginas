// functions/index.js
'use strict';

const functions = require('firebase-functions/v1');

const admin = require('firebase-admin');

const app = admin.initializeApp();


exports.updateOnCreateWithAuthContext = functions.auth
    .user()
    .onCreate(async (user) => {
      const adminUser = await admin.auth().getUser(user.uid);

      try {
        setTimeout(async () => {
          const userRef = app
              .firestore()
              .collection('users')
              .doc(user.uid);
          if (userRef) {
            await userRef.update({
              uid: user.uid,
              email: user.email,
              displayName: adminUser.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
              disabled: false,
              creationTime: user.metadata.creationTime,
              lastSignInTime: user.metadata.lastSignInTime,
              role: 'user',
            });
          }
        }, 5000);
      } catch (error) {
        functions.logger.error(error);
      }
    });
