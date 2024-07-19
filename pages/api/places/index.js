import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find();

      return response.status(200).json(places);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error retrieving places: " + error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      return response.status(201).json({ status: "place created" });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error creating place: " + error.message });
    }
  }
}
