export const storeColumns = [
  {
    accessorKey: "store_name", //access nested data with dot notation
    header: "Store Name",
  },
  {
    accessorKey: "store_no", //access nested data with dot notation
    header: "Store No",
  },
  {
    accessorKey: "location", //access nested data with dot notation
    header: "Location",
  },
  {
    accessorKey: "store_contact",
    header: "Store Contact",
  },
  {
    accessorKey: "available_unit",
    header: "Avaialble Unit",
  },
  {
    accessorKey: "staff",
    header: "Staff",
  },
  {
    accessorKey: "instatus",
    header: "Status",
    //or in the component override callbacks like this
    Cell: ({ cell, row }) => (
      <div>
        {row.original.instatus ? (
          <span style={{ color: "#388b84", textTransform: "capitalize" }}>
            Open
          </span>
        ) : (
          <span style={{ color: "#fd4332", textTransform: "capitalize" }}>
            Closed
          </span>
        )}
      </div>
    ),
  },
];

export const store = [
  {
    id: 8,
    store_name: "Main Store",
    store_no: "LIZASO-1723609685825",
    location: "Main Address",
    store_contact: "Main Contact",
    available_unit: 10,
    staff: 5,
    instatus: true,
  },
];
