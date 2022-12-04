const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErrors } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      // match: /^(\d{3}) \d{3}-\d{4}$/
      required: [true, 'Set phone for contact'],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handleSaveErrors);

// TODO add validate with JOI
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
    // .strict()
    // .truthy('true')
    // .falsy('false')
    // .sensitive()
    .error(new Error('Subscription must be one of [true,false]')),
  // .valid(true, false)
  // .error(new Error('Subscription must be one of [true,false]')),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    // забороняє перетворення типів
    .strict()
    // .truthy('true')
    // .falsy('false')
    // .sensitive()
    .error(new Error('Subscription must be one of [true,false]')),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contacts', contactSchema);

module.exports = { Contact, schemas };
