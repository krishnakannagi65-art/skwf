const primaryPhone = "9442303753";
const secondaryPhone = "9842250210";

export const BUSINESS = {
  // Core Identity
  name: "Sri Krishna Wooden Furniture",
  shortName: "Sri Krishna Furniture",
  owner: "Manogaran",
  established: 2003,

  // Content
  descriptionShort: "Premium Handcrafted Furniture",
  description: `Premium handcrafted teak, rosewood & custom furniture. Sofas, beds, dining sets, wardrobes, pooja temples & more. Call Manogaran: ${primaryPhone}`,

  // Contact Information
  contact: {
    primaryPhone: {
      countryCode: "+91",
      number: primaryPhone,
      raw: getRawPhoneNumber(primaryPhone),
      display: formatPhoneNumber(primaryPhone),
    },
    secondaryPhone: {
      countryCode: "+91",
      number: secondaryPhone,
      raw: getRawPhoneNumber(secondaryPhone),
      display: formatPhoneNumber(secondaryPhone),
    },
    displayPhones: [
      formatPhoneNumber(primaryPhone),
      formatPhoneNumber(secondaryPhone),
    ],
    whatsapp: "91" + primaryPhone,
    email: "srikrishnawoodenfurniture@gmail.com",
  },

  // Location Details
  location: {
    street: "Nethaji Bypass Road",
    city: "Dharmapuri",
    state: "Tamil Nadu",
    pincode: "636701",
    addressShort: "Nethaji Bypass Road, Dharmapuri",
    addressFull: "Nethaji Bypass Road, Dharmapuri, Tamil Nadu - 636701",
    mapQuery:
      "Sri Krishna Wooden Furniture, Nethaji Bypass Road, Dharmapuri, 636701",
  },

  // Operating Hours
  hours: {
    display: "Mon - Sun: 9:00 AM - 8:00 PM",
  },

  // SEO & Web Metadata (Integrates perfectly with the React Router Meta utility!)
  seo: {
    url: "https://srikrishnawoodenfurniture.com/",
    // Converted to an array so you can easily loop over it or join it
    keywords: [
      "wooden furniture Dharmapuri",
      "teak furniture Dharmapuri",
      "rosewood furniture",
      "custom furniture Dharmapuri",
      "furniture shop Dharmapuri",
      "Sri Krishna Wooden Furniture",
    ],
  },
} as const;

export function generateWhatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.contact.whatsapp}?text=${encoded}`;
}

export function getRawPhoneNumber(phone: string) {
  // Remove any non-digit characters from the phone number
  phone = phone.replace(/\D/g, "");
  // Ensure the phone number starts with the country code (for India, it's +91)
  if (!phone.startsWith("+91")) {
    phone = "+91" + phone;
  }
  return phone;
}

export function generateTelLink(phone: string): string {
  phone = getRawPhoneNumber(phone);
  return `tel:${phone}`;
}

export function formatPhoneNumber(phone: string): string {
  phone = getRawPhoneNumber(phone);
  // ensure the phone number is 13 digits long (including the country code)
  if (phone.length !== 13) {
    throw new Error(
      `Invalid phone number length. Expected 13 digits (including country code), got ${phone.length}.`,
    );
  }
  // Format the number as +91 94423 03753
  return `${phone.slice(0, 3)} ${phone.slice(3, 8)} ${phone.slice(8)}`;
}
