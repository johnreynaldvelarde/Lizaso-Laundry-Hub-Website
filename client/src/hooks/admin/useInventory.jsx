import { useState } from "react";
import useAuth from "../../contexts/AuthContext";
import { createItem, createItemCategory } from "../../services/api/postApi";

const useInventory = () => {
  // For add new category section
  const [categoryName, setCategoryName] = useState("");

  // For add item section
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const [errors, setErrors] = useState({});
  const { userDetails } = useAuth();

  // For View Inventory

  // For View Category

  const handleItemClear = () => {
    setItemName("");
    setItemCode("");
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

    if (Object.keys(newErrors).length === 0) {
      try {
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

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await createItemCategory.setCategoryItem({
          category_name: categoryName,
        });

        if (!response.success) {
          alert("Error submission!");
          //   <CustomToast
          //     t={t}
          //     type="error"
          //     message={response.message || "Cannot Proceed"}
          //   />;
        } else {
          alert("Submission Successful!");
        }
      } catch (error) {
        console.error("Error submitting the form", error);
      }
    }
  };

  // Fetch Section
  const fetchItemCategory = async () => {
    if (userDetails?.storeId) {
      try {
        const response = await getUnitName.getSuggestedUnitName(
          userDetails.storeId
        );
        if (response.success) {
        } else {
          console.error("Failed to fetch item category");
        }
      } catch (error) {
        console.error("Error fetching list of category:", error);
      }
    } else {
      console.error("Store ID is undefined.");
    }
  };

  // Overall
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    switch (field) {
      case "itemName":
        setItemName(value);
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
    itemName,
    setItemName,
    categoryName,
    setCategoryName,
    handleClear,
    handleInputChange,
  };
};

export default useInventory;
