import React from 'react';
import { useState } from 'react';
import styles from './AddProducts.module.scss';
import Card from '../../card/Card';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Phone' },
];

const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
};

const AddProducts = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setisLoading(true);

    try {
      const docRef = addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setisLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success('Product added succesfully');

      navigate('/admin/all-products');
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
    }
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === 'ADD') {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const storageRef = ref(storage, `onlineshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success('Photo uploading is success');
        });
      }
    );
  };

  const editProduct = async (e) => {
    e.preventDefault();

    setisLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      await setDoc(doc(db, 'products', id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });

      setisLoading(false);
      toast.success('Product edited successfully!');
      navigate('/admin/all-products');
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>{detectForm(id, 'Add New Product', 'Edit Product')}</h1>
        <Card cardClass={styles.group}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name: </label>
            <input
              type="text"
              placeholder="Enter product name"
              name="name"
              required
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles['progress-bar']}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Image Uploading ${uploadProgress}`
                      : `Upload Finished ${uploadProgress}`}
                    %
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                placeholder="Product Image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === '' ? null : (
                <input
                  type="text"
                  //required
                  placeholder="Photo url"
                  name="imageURRL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Product price: </label>
            <input
              type="number"
              placeholder="Enter product price"
              name="price"
              required
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product category: </label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                Select A Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>Product Brand: </label>
            <input
              type="text"
              placeholder="Enter product brand"
              name="brand"
              required
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product description: </label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="10"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
            ></textarea>

            <button className="--btn --btn-primary">
              {detectForm(id, 'Save Product', 'Edit Product')}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProducts;
