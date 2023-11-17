import {object, string, optional, Input} from 'valibot'

export const AddItemSchema = object({
  name: string('Please type a name'),
  category_id: string('Please select a category'),
  note: optional(string()),
  image: optional(string()),
})

export type TAddItem = Input<typeof AddItemSchema>
