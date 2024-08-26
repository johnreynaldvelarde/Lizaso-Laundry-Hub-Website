export const categoriesItemColumns = [
  {
    accessorKey: "id",
    header: "ID",
    show: false,
  },
  {
    accessorKey: "category_name",
    header: "Name",
  },
  {
    accessorKey: "numberItemRelated",
    header: "Number of Items",
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    Cell: ({ cell, row }) => {
      const date = new Date(row.original.date_created);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);
      return <span>{formattedDate}</span>;
    },
  },
];

export const itemColumns = [
  {
    accessorKey: "id",
    header: "ID",
    show: false,
  },
  {
    accessorKey: "category_id",
    header: "Category_ID",
    show: false,
  },
  {
    accessorKey: "item_code",
    header: "Item Code",
  },
  {
    accessorKey: "item_name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    Cell: ({ cell, row }) => {
      const date = new Date(row.original.date_created);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);
      return <span>{formattedDate}</span>;
    },
  },
];

// Sample data for categories
export const categoriesData = [
  {
    id: 1,
    category_name: "Laundry Detergents",
    numberItemRelated: 10,
    date_created: "2023-08-25T12:34:56Z",
  },
  {
    id: 2,
    category_name: "Fabric Softeners",
    numberItemRelated: 5,
    date_created: "2023-08-20T11:30:00Z",
  },
  {
    id: 3,
    category_name: "Stain Removers",
    numberItemRelated: 7,
    date_created: "2023-08-18T09:45:20Z",
  },
  {
    id: 4,
    category_name: "Bleach",
    numberItemRelated: 3,
    date_created: "2023-08-22T15:15:10Z",
  },
  {
    id: 5,
    category_name: "Eco-friendly Products",
    numberItemRelated: 8,
    date_created: "2023-08-19T10:25:35Z",
  },
];
