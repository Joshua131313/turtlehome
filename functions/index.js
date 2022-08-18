const functions = require("firebase-functions")
const algoliasearch = require('algoliasearch')
const admin = require("firebase-admin")

const APP_ID = functions.config().algolia.app
const API_KEY = functions.config().algolia.key

// @ts-ignore
const client = algoliasearch(APP_ID, API_KEY)
const usersIndex = client.initIndex('users_index')

//users collection
exports.addToIndexUser = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}').onCreate(snapshot => {
  const data = snapshot.data()
  const objectID = snapshot.id
  return usersIndex.addObject({...data, objectID})
})
exports.updateIndexUsers = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}').onUpdate((change) => {
  const newData = change.after.data()
  const objectID = change.after.id
  return usersIndex.saveObject({...newData, objectID})
})
exports.deleteFromIndexUsers = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}').onDelete(snapshot => {
  usersIndex.deleteObject(snapshot.id)
})
const postsIndex = client.initIndex('posts_index')

//users collection
exports.addToIndexPost = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}/posts/{postID}').onCreate(snapshot => {
  const data = snapshot.data()
  const objectID = snapshot.id
  return postsIndex.addObject({...data, objectID})
})
exports.updateIndexPost = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}/posts/{postID}').onUpdate((change) => {
  const newData = change.after.data()
  const objectID = change.after.id
  return postsIndex.saveObject({...newData, objectID})
})
exports.deleteFromIndexPost = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}/posts/{postID}').onDelete(snapshot => {
    postsIndex.deleteObject(snapshot.id)
})
// const reactionsIndex = client.initIndex('reactions_index')

// exports.addToIndexPost = functions
//   .region('northamerica-northeast1')
//   .firestore.document('users/{userID}/posts/{postID}/${reactionID}').onCreate(snapshot => {
//   const data = snapshot.data()
//   const objectID = snapshot.id
//   return reactionsIndex.addObject({...data, objectID})
// })
// exports.updateIndexPost = functions
//   .region('northamerica-northeast1')
//   .firestore.document('users/{userID}/posts/{postID}/reactions/${reactionID}').onUpdate((change) => {
//   const newData = change.after.data()
//   const objectID = change.after.id
//   return reactionsIndex.saveObject({...newData, objectID})
// })
// exports.deleteFromIndexPost = functions
//   .region('northamerica-northeast1')
//   .firestore.document('users/{userID}/posts/{postID}/reactions/${reactionID}').onDelete(snapshot => {
//     reactionsIndex.deleteObject(snapshot.id)
// })
// duplocate code above for other collections
// type  firebase deploy --only functions in terminal everytime change this page
// admin.initializeApp({
//   credential: admin.credential.cert({
//       projectId: "familia-app-1f5a8",
//       privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYpScC2IpkJEa4\nqB1R16vGFGEm/61ty5WXntlMVjUIg3P/Xx/ubLqI0mY+GS287CLhbX070rD98f3V\nKRVFsVh1UBRueAe6e7Okag8QYfhxYI2icoPcl4tuAEgTraW4jGq1EPuM7+biybQN\n1UUNCJGzCHmOONaLRODqTFuKcO1sWJzV2Bsmw8gkw9gRCaJR7ssVSlREoCdmnqLE\nO8VUvvlVvigjQyq/eb3k7/jpykSYUPwba11QsAGGPd+zxs5t0+McAat5FtqulVZK\nvRps9tXSpJBuXmxoaG3GR77IjoHpBRqI6MKd2hjZIg+9AxgTBr/GpPZg+g7TqoMF\nsWiNvpJRAgMBAAECggEAAQ02ORdL0MfNMu15kjxFoy41wyKEy9pYs/w0rAl2ARKC\nxJIfsrFOEa49ZRUgUwpfbSUndTeM35sAsCzByEKiBODh2yb5iqfag3n1k5vRLdrH\n7wQR832ZyM64sGYEW8Kf45Jz4TMv6IUSN/wtpxrVgiG/UKMEm14EnKidAtWnVRU+\neZzvJQJBJm9e+41UpHcYHIEC33zjQrfTxNMpDdTFdFicH13GD95Qmb0BWRRLIaDt\nqpyCMD30b124tFZ9CLox45udHTdUsJo2+g0OEuM1124uqNCsS+nz8fgsAOliEFZJ\nE+eE3tDHcyU8zf7dYy9bpTG3+Zht+GpkK3a3j4vtYQKBgQDNCaWY1T4PbVetOiao\n+kBaxAAQPiABXAyP9BB3soQ0t5WGbe9sPSmzCuwLmHX4hIYMcGji/siewIhHDxxH\nrk4txGGlPfrx/9hUYRoAkMGuN6vZmjfO+AiJ464gi5rdi07Git5c+ngnlX5rPjiX\ntKi2kHi2xVNRuGRicLkwhyTXOQKBgQC+ldEfaNOYAa/4a4vUUeCTIeBOg/FoUfZw\nkLSV7k5zeGq0bstr7hy/IIv1NS7BfYEPHSklse3OUfPtF6hUuttCWnVfoTM1jH0s\n2pf5SlPtH+tWuVA54aIGhCDc2BcX6LZgW9L1d1r87jMfHk4cjHBGs46G3y2lqfPd\nMPVetzo72QKBgQCoQUZXCIaI+l18lb+r4tB0q2qx6YkyFGtqpgntb9z1tcFKM2TK\nGdbiShAx48bLTVUDWCt6O0I+pBgw18GJQQx+mizXAOmxNRY9CAHifOezI5QuWVN6\n0CeRn/kAVA+dxfe7DbIz8oYvVYoMT175fxMD3cJxmbQp13rpHT+bBwvAYQKBgCO4\nOpCTegzkTBHYPkXV7qxEziCJFCbELdcdF+t91ZBIwl784P1ijFq6A+E6TYAQQK8P\nfRXGilZ//6KxK2ht+Qgvog4BTXK82P0eHxum9aHcuKPxaXrfshlcjDg3++QMRpo6\nu4gsDY6YKlarvGIXZDesEYtvqsOA3ebX9TUCTFTJAoGAYpjv46XibznzRhzvnKIJ\n7eFZeqHco5CSXAI/b4uv+rXW5rdNogxJ+tOSQxIqeOIa+8rBU/jrYhKrEMFNpJr5\nShEmrjvjD/9Go/0HzyzSJhpnfDmRLDUCfH+M/Ph+QHbHFE/bxFoHnSYzsxsWTm0Z\nGEGspjSNfqYp6XoUSNHY8Zk=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
//       clientEmail: "firebase-adminsdk-cdy1j@familia-app-1f5a8.iam.gserviceaccount.com",
//   })
// })