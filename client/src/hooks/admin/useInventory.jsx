import { useState, useEffect } from "react";
import useAuth from "../../contexts/AuthContext";
import { createItem, createItemCategory } from "../../services/api/postApi";
import { getCategoryItem, viewInventory } from "../../services/api/getApi";

const useInventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  // For add new category section
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  // For add item section
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const { userDetails } = useAuth();

  // For View Inventory
  const fetchInventoryData = async () => {
    if (userDetails?.storeId) {
      try {
        const response = await viewInventory.getViewInventoryList(
          userDetails.storeId
        );
        setInventoryData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      console.error("Store ID is undefined.");
    }
  };

  // For View Category
  const handleItemClear = () => {
    setItemName("");
    setItemCode("");
    setItemCategory("");
    setItemPrice("");
    setErrors({});
  };

  const handleCategoryClear = () => {
    setCategoryName("");
    setErrors({});
  };

  // Add New Item
  const handleSubmitItem = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!itemName) newErrors.itemName = "Item name is required";
    if (!itemCode) newErrors.itemCode = "Item code is required";
    if (!itemCategory) newErrors.itemCategory = "Category is required";
    if (!itemPrice) newErrors.itemPrice = "Price is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await createItem.setItem({
          store_id: userDetails.storeId,
          category_id: itemCategory,
          item_code: itemCode,
          item_name: itemName,
          price: itemPrice,
        });

        if (!response.success) {
          alert("Submission unsuccessful");
        } else {
          alert("Submission Successful!");
          handleItemClear();
        }
      } catch (error) {
        console.error("Error submitting the form", error);
      }
    }
  };

  // Add New Category
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!categoryName) newErrors.categoryName = "Category name is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await createItemCategory.setCategoryItem({
          category_name: categoryName,
        });

        if (!response.success) {
          alert("Error submission!");
        } else {
          alert("Submission Successful!");
          handleCategoryClear();
        }
      } catch (error) {
        console.error("Error submitting the form", error);
      }
    }
  };

  // Fetch Section
  const fetchCategories = async () => {
    try {
      const result = await getCategoryItem.getCategory();
      if (result.success) {
        setCategories(result.data); // Update state with fetched categories
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Overall
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    switch (field) {
      case "itemName":
        setItemName(value);
        break;
      case "itemCode":
        setItemCode(value);
        break;
      case "itemCategory":
        setItemCategory(value);
        break;
      case "itemPrice":
        setItemPrice(value);
        break;
      case "categoryName":
        setCategoryName(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  return {
    errors,
    setErrors,
    itemName,
    setItemName,
    itemCode,
    setItemCode,
    itemCategory,
    setItemCategory,
    itemPrice,
    setItemPrice,
    categoryName,
    categories,
    setCategoryName,
    handleItemClear,
    handleInputChange,
    handleSubmitItem,
    handleSubmitCategory,
    inventoryData,
    loading,
    error,
  };
};

export default useInventory;
