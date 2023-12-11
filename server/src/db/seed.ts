import {db} from '.'
import {category, item} from './schema'

const categories: Category[] = [
  {
    category_name: 'Diary & Eggs',
  },
  {
    category_name: 'Fruits & Vegetables',
  },
  {
    category_name: 'Meat & Seafood',
  },
  {
    category_name: 'Bakery & Bread',
  },
  {
    category_name: 'Pantry Staples',
  },
  {
    category_name: 'Beverages',
  },
  {
    category_name: 'Frozen Foods',
  },
  {
    category_name: 'Snacks & Sweets',
  },
  {
    category_name: 'Cleaning Supplies',
  },
  {
    category_name: 'Personal Care',
  },
  {
    category_name: 'Baby & Kids',
  },
  {
    category_name: 'Health & Wellness',
  },
  {
    category_name: 'Pet Supplies',
  },
]

async function seed() {
  try {
    console.log('seed started')
    const res = await db
      .insert(category)
      .values(categories)
      .returning({category_id: category.category_id, category_name: category.category_name})
    const promises = res.map((cat, idx) => {
      console.log(itemCategoryMap[cat.category_name](cat.category_id), idx)
      // db.insert(item).values(itemCategoryMap[cat.category_name](cat.category_id))
    })

    // await Promise.allSettled(promises)

    console.log('Successfully seeded category and item table with default values')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data: ', error)
    process.exit(1)
  }
}

seed()

type Category = typeof category.$inferInsert

const itemCategoryMap = {
  ['Dairy & Eggs']: (category_id: string) => [
    {name: 'Milk', category_id},
    {name: 'Cheese', category_id},
    {name: 'Butter', category_id},
    {name: 'Yogurt', category_id},
    {name: 'Eggs', category_id},
  ],
  ['Fruits & Vegetables']: (category_id: string) => [
    {name: 'Apples', category_id},
    {name: 'Bananas', category_id},
    {name: 'Carrots', category_id},
    {name: 'Tomatoes', category_id},
    {name: 'Lettuce', category_id},
  ],
  ['Meat & Seafood']: (category_id: string) => [
    {name: 'Chicken Breasts', category_id},
    {name: 'Ground Beef', category_id},
    {name: 'Salmon Fillets', category_id},
    {name: 'Pork Chops', category_id},
    {name: 'Shrimp', category_id},
  ],
  ['Bakery & Bread']: (category_id: string) => [
    {name: 'Sliced Bread', category_id},
    {name: 'Bagels', category_id},
    {name: 'Croissants', category_id},
    {name: 'Hamburger Buns', category_id},
    {name: 'Whole Wheat Bread', category_id},
  ],
  ['Pantry Staples']: (category_id: string) => [
    {name: 'Flour', category_id},
    {name: 'Sugar', category_id},
    {name: 'Rice', category_id},
    {name: 'Pasta', category_id},
    {name: 'Canned Beans', category_id},
    {name: 'Whole Wheat Bread', category_id},
  ],
  ['Beverages']: (category_id: string) => [
    {name: 'Bottled Water', category_id},
    {name: 'Orange Juice', category_id},
    {name: 'Coffee', category_id},
    {name: 'Tea Bags', category_id},
    {name: 'Soda', category_id},
  ],
  ['Frozen Foods']: (category_id: string) => [
    {name: 'Frozen Vegetables', category_id},
    {name: 'Ice Cream', category_id},
    {name: 'Frozen Pizza', category_id},
    {name: 'Frozen Chicken Nuggets', category_id},
    {name: 'Frozen Meals', category_id},
  ],
  ['Snacks & Sweets']: (category_id: string) => [
    {name: 'Potato Chips', category_id},
    {name: 'Chocolate Bars', category_id},
    {name: 'Popcorn', category_id},
    {name: 'Nuts', category_id},
    {name: 'Cookies', category_id},
  ],
  ['Cleaning Supplies']: (category_id: string) => [
    {name: 'Dish Soap', category_id},
    {name: 'App-Purpose Cleaner', category_id},
    {name: 'Laundry Detergent', category_id},
    {name: 'Paper Towels', category_id},
    {name: 'Trash Bags', category_id},
  ],
  ['Personal Care']: (category_id: string) => [
    {name: 'Shampoo & Conditioner', category_id},
    {name: 'Toothpaste', category_id},
    {name: 'Baby Soap', category_id},
    {name: 'Toilet Paper', category_id},
    {name: 'Razors', category_id},
  ],
  ['Baby & Kids']: (category_id: string) => [
    {name: 'Diapers', category_id},
    {name: 'Baby Wipes', category_id},
    {name: 'Baby Food', category_id},
    {name: "Children's Snacks", category_id},
    {name: "Kid's Toothpaste", category_id},
  ],
  ['Health & Wellness']: (category_id: string) => [
    {name: 'Multivitamins', category_id},
    {name: 'Pain Relievers', category_id},
    {name: 'Band Aids', category_id},
    {name: 'Hand Sanitizer', category_id},
    {name: 'Cold Medicine', category_id},
  ],
  ['Pet Supplies']: (category_id: string) => [
    {name: 'Dog/Cat Food', category_id},
    {name: 'Pet Treats', category_id},
    {name: 'Cat Litter', category_id},
    {name: 'Pet Shampoo', category_id},
    {name: 'Pet Toys', category_id},
  ],
}

// todo default items and categories
