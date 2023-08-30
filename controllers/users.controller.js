const User = require("../models/User");
const { insertInLog } = require("../server/logFile");
const { success, failure } = require("../utils/common");

class UserController {
  findOrdersOfUser = async (req, res) => {
    const { id } = req.params;
    if (id) {
      let result = await User.getOrdersByUserId(id);
      let logFileResult = await insertInLog("GET_ORDERS_FOR_USER", id);
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
          if (result?.message) {
            return res.status(400).send(failure(result?.message));
          }
          return res.status(400).send(failure("failed to fetch the data"));
        }
      } catch (error) {
        return res.status(400).send(failure("Internal error occured"));
      }
    } else {
      return res.status(404).send(failure("Pass an id via your url"));
    }
  };
}

module.exports = new UserController();
