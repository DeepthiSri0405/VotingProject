import { db } from "../firebaseConfig";
import { collection, writeBatch, doc } from "firebase/firestore";
import users from "./Data.json";

export const uploadUsersBatch = async () => {
  try {
    const batch = writeBatch(db);
    const usersCollection = collection(db, "people");

    users.forEach((user) => {
      const userRef = doc(usersCollection); // Auto-generated ID
      batch.set(userRef, user);
    });

    await batch.commit();
    console.log("🎉 All users uploaded successfully with batch!");
  } catch (error) {
    console.error("❌ Error uploading users in batch:", error);
  }
};

uploadUsersBatch();
