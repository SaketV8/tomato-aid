const currentDatetime = new Date().toISOString();

const postDetails = {
  image_url: null,
  title: null,
  description: null,
  user_id: null,
  user_name: null,
  address_country: "India",
  address_state: null,
  address_pincode: null,
  address_locality: null,
  contact_mobile_no: null,
  contact_email: "hi@example.com",
  is_donated: false,
  upload_time: currentDatetime,
  address_district: null,
};

export { postDetails };
