import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export const useAddCity = () => {
  const { user } = useAuthContext();
  const [findError, setFindError] = useState(null);

  const addCity = async (name) => {
    const key = process.env.REACT_APP_OPENWEATHER_KEY;
    const keyWord = name.includes(',') ? name.split(',')[0] : name;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&q=${keyWord}`;

    console.log(keyWord.toLowerCase);

    const q = query(
      collection(db, 'city'),
      where('name', '==', keyWord.toLowerCase()),
      where('userId', '==', user.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs, 'querysnap');
    if (querySnapshot.docs.length > 0) {
      setFindError(`'${keyWord}' already exists`);
      return;
    } else {
      axios
        .get(url)
        .then(({ data }) => {
          addDoc(collection(db, 'city'), {
            name: keyWord.toLowerCase(),
            title: data.id,
            userId: user.uid,
          });
          console.log(user);
        })
        .catch((err) => {
          setFindError(err.message);
        });
    }
  };

  return { addCity, findError };
};
