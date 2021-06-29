const PlacesModel = require("../models/places");


// const printAllBooks = async () => {
//   let books = await BookModel.find({}).populate("category");
//   return books;
// };
const addAPlace = async ({ name, city, state }) => {
    let slug = name.split(" ").join("_");
    let result = {};
    const place = new PlacesModel({
      name, slug, city, state
    });
    await place
        .save()
        .then((data) => {
            console.log("Following place has been added successfully:" + data);
            result["status"] = true;
            result["response"] = `Following place has been added successfully: ${data}`;
        })
        .catch(e => {
            console.log("error occured: ", e);
            result["status"] = false;
            result["response"] = `error occured: ${e}`;
        });
    return result;
}
const getPlacebySlug = async (slug) => {
    let result;
    await PlacesModel.findOne({ slug })
      .then((data) => {
        if (!data) {
          result = { status: false, response: data };
        } else {
          result = { status: true, response: data };
        }
      })
      .catch((err) => {
        result = { status: false, response: err };
      });
    return result;
};

const getPlacebyNameorCity = async (nameOrCity) => {
  let result;
  let re = new RegExp(nameOrCity, "i");
  await PlacesModel.find({ $or: [{name: re}, {city: re}] })
    .then((data) => {
      result = { status: true, response: data };
    })
    .catch((err) => {
      result = { status: false, response: err };
    });
  return result;
};

module.exports = {
    addAPlace,
  getPlacebySlug,
  getPlacebyNameorCity
};