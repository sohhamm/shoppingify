import {object, string, Input, nullable} from 'valibot'

export const AddItemSchema = object({
  name: string('Please type a name'),
  category_id: string('Please select a category'),
  note: nullable(string()),
  image: nullable(string()),
})

export type TAddItem = Input<typeof AddItemSchema>
