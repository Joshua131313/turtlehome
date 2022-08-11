import React from 'react'
import firebase from 'firebase'

export const useGetUser = () => {
  const user = firebase.auth().currentUser
  return user
}