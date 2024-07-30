const { Schema, default: mongoose } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

const basicInfoSchema = new Schema(
  {
    basic_company_info: {
      company_name: {
        type: String,
        required: true,
      },
      head_office_address: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country_code: {
        type: String,
        required: true,
      },
      contact_number: {
        type: String,
        required: true,
      },
      website_url: {
        type: String,
      },
    },
    key_contact_person: {
      name: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      country_code: {
        type: String,
        required: true,
      },
      contact_number: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      user_image: { type: String },
    },
    token: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BasicSchema = dbConn.model("BasicInfo", basicInfoSchema, "BasicInfos");

const managmentSchema = new Schema(
  {
    company_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    tell_about_yourself: {
      company_profile: {
        type: String,
        required: true,
      },
      url: {
        type: String,
      },
      vision: {
        type: String,
      },
    },
    management_team_details: [
      {
        name: {
          type: String,
        },
        designation: {
          type: String,
        },
        profile_summary: {
          type: String,
        },
        linkedin_summary: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ManagmentSchema = dbConn.model(
  "Managment",
  managmentSchema,
  "Managments"
);

const productSchema = new Schema(
  {
    company_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    show_product_portfolio: [
      {
        product_name: {
          type: String,
          required: true,
        },
        product_portfolio_description: {
          type: String,
          required: true,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const productInfoSchema = dbConn.model("Product", productSchema, "Products");

module.exports = {
  productInfoSchema,
  BasicSchema,
  ManagmentSchema,
};
