import firebase from "firebase"
import { generateID } from "./DBFunctions"

export const uploadMultipleFilesToFireStorage = (files, storagePath, setUploadProgress) => {
  const user = firebase.auth().currentUser
  return new Promise((resolve, reject) => {
    if(!files?.length) return resolve([])
    let urlImgs = files.filter(x=> !x.preview)
    const imgURLs = [...urlImgs]
    console.log(files.filter(x=> x.preview))
    files.filter(x=> x.preview).forEach((file, i) => {
      let id = generateID()
        const storageRef = firebase.storage().ref(storagePath)
        const uploadTask = storageRef.child( id ).put(file)
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress?.(progress)
        }, (error) => {
          console.log(error)
          reject(error)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            imgURLs.push({downloadURL, fileType: file.type, name: id, postedBy: user.uid, fileInfo: {size: file.size, name: file.name, lastModified: file.lastModified}})
            if (imgURLs.length === files.length) {
              resolve(imgURLs)
            }
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    })
  })
}

export const uploadImgToFireStorage = (file, storagePath, imgName, setProgress, pass) => {
  return new Promise((resolve, reject) => {
    if(!pass) {
      const storageRef = firebase.storage().ref(storagePath).child(imgName)
      if(file) {
        const task = storageRef.put(file)
        task.on("stat_changes", 
          function progress(snap) {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress && setProgress(percentage)
          },
          function error() {
            window.alert('An error has occured. Please try again later.')
          },
          function complete() {
            storageRef.getDownloadURL()
            .then((url) => {
              resolve(url)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
          }
        )
      }
    }
    else {
      resolve()
    }
  })
}

export const deleteStorageFile = (storagePath, pass) => {
  return new Promise((resolve, reject) => {
    if(!pass) {
      const storageRef = firebase.storage().ref(storagePath)
      storageRef.delete()
      .then(() => {
        resolve()
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    }
    else {
      resolve()
    }
  })
}

export const deleteMultipleStorageFiles = (files, storagePath) => {
  return new Promise((resolve, reject) => {
    files.forEach((file, i) => {
      let storageRef = firebase.storage().ref(storagePath).child(file.name)
      storageRef.delete()
      .then(() => {
        if(i === files.length-1) {
          resolve()
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  })
}