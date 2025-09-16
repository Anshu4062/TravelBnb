import mongoose, { Schema, Document } from "mongoose";

export interface IListing extends Document {
  placeType: string;
  guests: number;
  bedrooms: number;
  beds: number;
  locksAllBedrooms: boolean;
  bathrooms: {
    privateAttached: number;
    dedicated: number;
    shared: number;
  };
  whoThere: string[];
  amenitiesFav: string[];
  amenitiesStandout: string[];
  safetyItems: string[];
  address: {
    country: string;
    unit?: string;
    street?: string;
    landmark?: string;
    district?: string;
    city?: string;
    state?: string;
    pin?: string;
  };
  photos: string[];
}

const ListingSchema = new Schema<IListing>(
  {
    placeType: { type: String, required: true },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    locksAllBedrooms: { type: Boolean, required: true },
    bathrooms: {
      privateAttached: { type: Number, default: 0 },
      dedicated: { type: Number, default: 0 },
      shared: { type: Number, default: 0 },
    },
    whoThere: [{ type: String }],
    amenitiesFav: [{ type: String }],
    amenitiesStandout: [{ type: String }],
    safetyItems: [{ type: String }],
    address: {
      country: String,
      unit: String,
      street: String,
      landmark: String,
      district: String,
      city: String,
      state: String,
      pin: String,
    },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Listing ||
  mongoose.model<IListing>("Listing", ListingSchema);
