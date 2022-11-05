import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc, where } from "firebase/firestore";
import {
  collection,
  getDoc,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  addDoc,
  deleteDoc,
  startAt
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  confirmPasswordReset
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  databaseURL: process.env.REACT_APP_DB_URL,
  messagingSenderId: "557658336491",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-BJB44Z6RR6",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
const storage = getStorage();
export const db = getFirestore(app);

/** Functions for file uploading and downloading */
export const uploadFile = async (path, fileName, file) => {
  const fileRef = ref(storage, `${path}/${fileName}`);
  let filename = "";
  let filepath = "";
  let success = true;
  await uploadBytes(fileRef, file)
    .then((snapshot) => {
      if (snapshot.metadata) {
        filename = snapshot.metadata.name;
      } else {
        filename = fileName;
      }
    })
    .then(() =>
      getDownloadURL(fileRef).then((url) => {
        filepath = url;
      })
    );

  return { name: filename, path: filepath, success: success };
};

export const getFile = async (filePath, fileName) => {
  const starsRef = ref(storage, `${filePath}/${fileName}`);
  let imageUrl = "";
  // Get the download URL
  await getDownloadURL(starsRef)
    .then((url) => {
      imageUrl = url;
    })
    .catch((error) => {
      console.log(error.code);
    });
  return imageUrl;
};

const donhangRef = collection(db, 'lienhe')

export const getDonHangByField = async (field, value) => {
  let list = [];
  const q = query(donhangRef, where( field, '==', value))
  const result = await getDocs(q);
  result.forEach( item => {list.push(item.data())})
  return list;
}

/** Sign in - Sign out Functions */
export const googleSignIn = async () => {
  let user = undefined;
  let error = "";
  await signInWithPopup(auth, provider)
    .then((result) => {
      if (result.user.uid === process.env.REACT_APP_UID) {
        user = result.user;
      }
    })
    .catch((e) => {
      error = error.message;
    });
  return !!user;
};

// Create user with email and password
export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
          return true
        })
      .catch(err => false)
}

export const signInWithCredential = async (email, password) => {
  let success = false;

  await signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      success = true;
    })
    .catch((e) => {
      console.log(e.message);
    });
  return success;
};

export const googleSignOut = async () => {
  await signOut(auth)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};

/** Database functions */

export const getDataById = async (tableName, fileId) => {
  const docRef = doc(db, tableName, fileId);
  const snapShot = await getDoc(docRef);
  let data = {};
  if (snapShot.exists()) {
    data = snapShot.data();
  }
  return data;
};

export const getAllData = async (tableName) => {
  let snapshot = await getDocs(collection(db, tableName));
  let data = [];

  if (snapshot) {
    snapshot.forEach((doc) => {
      let content = doc.data();
      let id = doc.id;
      let formattedDoc = { ...content, id };
      data.push(formattedDoc);
    });
  }
  return data;
};

export const getDataByPage = async (dbRef, limitRows, orderCol, sort = 'asc', lastDocs = undefined) => {
  const queries = [];

  if (lastDocs && lastDocs !== undefined) {
    let dataQuery = query(
      collection(db, dbRef),
      orderBy(orderCol, sort),
      startAfter(lastDocs),
      limit(limitRows)
    );
      queries.push(dataQuery);
  } else {
    let dataQuery = query(
      collection(db, dbRef),
      orderBy(orderCol, sort),
      limit(limitRows)
    );
      queries.push(dataQuery);
  }

  const result = {data: [], lastVisible: undefined};

  if (queries.length) {
    const res = await getDocs(queries[0]);
    result.lastVisible = res.docs[res.docs.length-1];

    res.forEach( item => {
      let data = item.data();
      let obj = {...data, id: item.id};
      result.data.push(obj);
    })
  }
  
  return result;
};

export const addData = async (tableName, data) => {
  let result = false;
  try {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("vi-VI", {
      timeZone: "Asia/Saigon",
    });
    const doc = await addDoc(collection(db, tableName), {
      ...data,
      date: formattedDate,
    });
    result = doc.id ? true : false;
  } catch (e) {
    console.error(e);
  }
  return result;
};

export const updateData = async (id, tableName, data) => {
  let docRef = await doc(db, tableName, id);
  await updateDoc(docRef, data);
  return true;
};

export const deleteItem = async (id, tableName) => {
  await deleteDoc(doc(db, tableName, id));
  return true;
};
