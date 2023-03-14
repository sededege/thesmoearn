import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../../firebase.config";

// delete doc
export const borrarproducto = async (id) => {
  console.log("teborroto");
  await deleteDoc(doc(firestore, "products", id));
};

export const borraruser = async (id) => {
  console.log("teborroto");
  await deleteDoc(doc(firestore, "user", id));
};
export const borrarorder = async (id) => {
  await deleteDoc(doc(firestore, "orders", id));
};

// Set the "capital" field of the city 'DC'
export const updateItem = async (dataa) => {
  console.log(dataa);
  const productRef = doc(firestore, "products", dataa.id);
  await updateDoc(productRef, {
    /*   imageURL: data.img */
    name: dataa.name,
    descripcion: dataa.descripcion,
    caracteristicas: dataa.caracteristicas,
    precio: dataa.precio,
    categoria: dataa.categoria,
    color: dataa.color,
    oferta: dataa.oferta,
  });
};

export const deleteImg = async (dataa) => {
  console.log(dataa);
  const productRef = doc(firestore, "products", dataa.id);
  await updateDoc(productRef, {
    color: {
      images: null,
    },
  });
};

export const deleteDataUpdate = async (id) => {
  const productRef = doc(firestore, "products", id);
  await updateDoc(productRef, {
    color: null,
  });
};

// Saving new Item
/* export const saveItem = async (data) => {

  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,

  });
}; */

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "products", data.id), data, {
    merge: true,
  });
};

export const saveOrder = async (data) => {
  await setDoc(doc(firestore, "orders", data.id), data, {
    merge: true,
  });
};

export const updatePagado = async (dataa) => {
  const productRef = doc(firestore, "orders", dataa.id);
  await updateDoc(productRef, {
    status: dataa.status,
  });
};

export const saveUser = async (data) => {
  await setDoc(doc(firestore, "user", data.id), data, {
    merge: true,
  });
};

export const saveAddres = async (data) => {
  await setDoc(doc(firestore, "user", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const getAllOrders = async () => {
  const items = await getDocs(
    query(collection(firestore, "orders"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getAllProductsItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "products"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const getAllUsuarios = async () => {
  const usuarios = await getDocs(query(collection(firestore, "user")));

  return usuarios.docs.map((doc) => doc.data());
};

export const getUser = async (a) => {
  const docRef = a && doc(firestore, "user", a);
  const docSnap = a && (await getDoc(docRef));
  if (docSnap && docSnap.exists()) {
    return docSnap.data();
  } else {
    return false;
  }
};

export const updateNfts = async (data) => {
  const userRef = doc(firestore, "user", data.id);
  await updateDoc(userRef, {
    id: data.id,
    staked: data.staked,
  });
};

export const updatePoints = async (data) => {
  const userRef = doc(firestore, "user", data.id);
  await updateDoc(userRef, {
    id: data.id,
    points: data.points,
  });
};

/*  export const updateFavoritos = async (data) => {
  const userRef = doc(firestore, "user", data.id);
  await updateDoc(userRef, {
    id: data.id,
    favoritos: data.favoritosadd,
  
  });
};  */
/* 
export const updatePayment = async (data) => {
  console.log("updateado");
  const productRef = doc(firestore, "orders", data.id);
  await updateDoc(productRef, {
    status: data.status,
  });
};

 */
