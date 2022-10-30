import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import styles from './ViewProduct.module.scss';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '../../../redux/slice/productSlice';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, 'products');

      const q = query(productsRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'Are you sure about deleting this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        alert('Delete product is cancelled');
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: 'crimson',
        okButtonBackground: 'crimson',
        cssAnimationStyle: 'zoom',
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Product successfully deleted!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>There is no product!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product, index) => {
              const { id, name, price, category, imageURL } = product;
              return (
                <tbody>
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imageURL} alt={name} width="100px" />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{price} TL</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size={20} color="blueviolet" />
                      </Link>

                      <FaTrashAlt
                        size={20}
                        color="crimson"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
