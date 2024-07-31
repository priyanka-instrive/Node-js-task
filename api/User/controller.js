const service = require("./service");
const xlsx = require("xlsx");
const User = require("../User/index");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const uploadExcelFile = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "File is missing" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const rawData = xlsx.utils.sheet_to_json(worksheet);
    if (rawData.length === 0) {
      return res.status(400).json({ message: "Excel sheet is empty" });
    }

    const requiredFields = ["Name", "Email ID", "Mobile"];

    const transformedData = rawData.map((item) => {
      const missingFields = requiredFields.filter(
        (field) =>
          item[field] === undefined ||
          item[field] === null ||
          item[field] === ""
      );

      const hasAllRequiredFields = missingFields.length === 0;
      let errorLog = "";

      if (!hasAllRequiredFields) {
        errorLog += missingFields.join(", ") + " Missing";
      }

      if (item["Email ID"] && !validateEmail(item["Email ID"])) {
        errorLog += errorLog ? "; " : "";
        errorLog += "Invalid Email Format";
      }

      const validData = {
        name: item.Name,
        email: item["Email ID"],
        mobile: item.Mobile,
        address: item.Address,
        country: item.Country,
        status: hasAllRequiredFields && validateEmail(item["Email ID"]),
        errorlog: errorLog,
      };
      return validData;
    });

    const data = await service.create(transformedData);
    const result = {
      message: "Successfully Uploaded",
      data: data,
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.isBoom
        ? error.output.payload.message
        : "Internal Server Error",
    });
  }
};

async function fetchUserData(req, res) {
  try {
    let { page, limit, sortBy, sortOrder, searchTerm } = req.query;

    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.max(parseInt(limit, 10) || 10, 1);
    sortOrder =
      sortOrder && sortOrder.toLowerCase() === "desc" ? "desc" : "asc";
    const data1 = {
      page,
      limit,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const data = await service.getData(data1);

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    const result = {
      data: data.items,
      totalItems: data.totalItems,
      totalPages: Math.ceil(data.totalItems / limit),
      currentPage: page,
      message: "All Data Fetch Successfully",
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

module.exports = {
  uploadExcelFile,
  fetchUserData,
  validateEmail,
};
