export const BUSINESS = {
  name: "Sri Krishna Wooden Furniture",
  shortName: "Sri Krishna Furniture",
  owner: "Manogaran",
  phone: "9442303753",
  phoneDisplay: "+91 94423 03753, +91 98422 50210",
  whatsapp: "919442303753",
  address: "Nethaji Bypass Road, Dharmapuri",
  addressFull: "Nethaji Bypass Road, Dharmapuri, Tamil Nadu 636701",
  city: "Dharmapuri",
  pincode: "636701",
  email: "Srikrishnawoodenfurniture@gmail.com",
  hours: "Mon - Sun: 9:00 AM - 8:00 PM",
  mapQuery:
    "Sri Krishna Wooden Furniture Nethaji Bypass Road Dharmapuri 636701",
  established: "2003",
};

export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encoded}`;
}

export function telLink(): string {
  return `tel:+91${BUSINESS.phone}`;
}
