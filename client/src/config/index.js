export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    disableOnSubmit: false, 
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    disableOnSubmit: false, 
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    disableOnSubmit: false, 
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    disableOnSubmit: false, 
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    disableOnSubmit: false, 
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  
  {
  name: "isCastingKit",
  label: "Product Type",
  componentType: "radio",
  options: [
    { id: false, label: "Product" },
    { id: true, label: "Casting Kit" },
  ],
},


  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "baby", label: "Baby" },
      { id: "parents", label: "Parents" },
      { id: "couples", label: "Couples" },
      { id: "family/group", label: "Family/Group" },
    ],
  },
 
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    path: "/shop/testimonials",
  },
  {
    id: "casting-kit",
    label: "CastingKit",
    path: "/shop/CastingKit",
  },
  {
    id: "ContactUs",
    label: "ContactUs",
    path: "/shop/ContactUs",
  },
  {
    id: "about-us",
    label: "AboutUs",
    path: "/shop/AboutUs",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  baby: "Baby",
  parents: "Parents",
  couples: "Couples",
  family: "Family/Group",
};


export const filterOptions = {
  category: [
    { id: "baby", label: "Baby" },
    { id: "parents", label: "Parents" },
    { id: "couples", label: "Couples" },
    { id: "family/group", label: "Family/Group" },
  ],

};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
   {
    name: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    componentType: "input",
    type: "text",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];


