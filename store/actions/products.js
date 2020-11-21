import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

const firebaseUrl = "https://rn-complete-guide-18716.firebaseio.com/products";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${firebaseUrl}.json`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const currentProd = resData[key];
        loadedProducts.push(
          new Product(
            key,
            "u1",
            currentProd.title,
            currentProd.imageUrl,
            currentProd.description,
            currentProd.price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      // send to custom analytics server
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(`${firebaseUrl}/${productId}.json`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // any async code you want!;
    const response = await fetch(`${firebaseUrl}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      }),
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(`${firebaseUrl}/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/jon",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
