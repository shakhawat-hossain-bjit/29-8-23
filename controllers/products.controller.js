const Product = require("../models/Product");
const { insertInLog } = require("../server/logFile");
const { success, failure } = require("../utils/common");

class ProductController {
  fetchAll = async (req, res) => {
    try {
      let result = await Product.getAllData();
      let logFileResult = await insertInLog("GET_ALL_PRODUCT");
      // console.log(result);
      if (result.success) {
        if (result?.data?.length) {
          return res
            .status(200)
            .send(success("Successfully fetched all the data", result?.data));
        } else {
          return res.status(400).send(failure("There is no data"));
        }
      } else {
        return res.status(400).send(failure("Failed to fetch the data"));
      }
    } catch (e) {
      console.log(e);
      return res.status(400).send(failure("Internal error occured"));
    }
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    if (id) {
      try {
        let result = await Product.deleteProduct(id);
        let logFileResult = await insertInLog("DELETE_PRODUCT", id);

        if (result.success) {
          return res.status(200).send(success("successfully deleted the data"));
        } else {
          if (result.hasOwnProperty("message")) {
            return res
              .status(404)
              .send(failure("There is no such data with this ID"));
          }
          return res.status(400).send(failure("failed to update the data"));
        }
      } catch (e) {
        return res.status(400).send(failure("Internal error occured"));
      }
    } else {
      return res.status(400).send(failure("Pass an id via your url"));
    }
  };

  findById = async (req, res) => {
    const { id } = req.params;
    if (id) {
      let result = await Product.getSingleData(id);
      let logFileResult = await insertInLog("GET_ONE_PRODUCT", id);
      try {
        if (result.success) {
          if (result?.data)
            return res
              .status(200)
              .send(success("Successfully fetched the data", result?.data));
          else
            return res
              .status(404)
              .send(failure("There is no such data with this ID"));
        } else {
          return res.status(400).send(failure("failed to fetch the data"));
        }
      } catch (error) {
        return res.status(400).send(failure("Internal error occured"));
      }
    } else {
      return res.status(404).send(failure("Pass an id via your url"));
    }
  };

  postData = async (req, res) => {
    try {
      let { newProduct, error } = req;

      if (Object.keys(error).length > 0) {
        return res
          .status(400)
          .send(failure("Data is not provided as per requirement", error));
      }
      let result = await Product.insertData(newProduct);
      let logFileResult = await insertInLog("POST_PRODUCT", result.id);
      if (result.success) {
        return res.status(200).send(
          success("successfully added the data", {
            ...newProduct,
            id: result.id,
          })
        );
      } else {
        return res.status(400).send(failure("failed to add the data"));
      }
    } catch (e) {
      return res.status(400).send(failure("Internal error occured"));
    }
  };

  updateData = async (req, res) => {
    const { id } = req.params;
    if (id) {
      try {
        let newProduct = req.body;

        let error = {};
        if (newProduct.hasOwnProperty("id")) {
          error.id = "Id should not be passed in body";
        }

        if (Object.keys(error).length > 0) {
          return res
            .status(400)
            .send(failure("Data is not provided as per requirement", error));
        }

        let result = await Product.updateProduct(id, newProduct);
        let logFileResult = await insertInLog("UPDATE_PRODUCT", id);
        if (result.success) {
          return res.status(200).send(success("successfully updated the data"));
        } else {
          if (result.hasOwnProperty("message")) {
            return res
              .status(404)
              .send(failure("There is no such data with this ID"));
          }
          return res.status(400).send(failure("failed to add the data"));
        }
      } catch (error) {
        console.log("error ", error);
        return res.status(400).send(failure("Internal error occured"));
      }
    } else {
      return res
        .status(400)
        .send(failure("Pass an id via your url in query parameter"));
    }
  };
}

module.exports = new ProductController();
