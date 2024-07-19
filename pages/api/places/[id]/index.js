import dbConnect from "@/db/connect";
import Place from "@/db/models/Place.js";
export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!Place) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(place);
  }
  /////////////////////////////////////////////

  if (request.method === "PATCH") {
    try {
      const placeData = request.body;
      const updatedPlace = await Place.findByIdAndUpdate(id, placeData, {
        new: true,
        runValidators: true,
        context: "query",
      });

      if (!updatedPlace) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedPlace);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error updating place: " + error.message });
    }
  }
  ////////////////////////////////////////////////////////
  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);
      return response.status(200).json({ message: "Success!" });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error deleting place: " + error.message });
    }
  }
}
