import {db} from '.'
import {category} from './schema'

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

async function seedCategories() {
  try {
    console.log('seed started')
    await db
      .insert(category)
      .values(categories)
      .onConflictDoNothing({target: category.category_name})
    console.log('Successfully seeded category table with default values')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data: ', error)
    process.exit(1)
  }
}

seedCategories()

type Category = typeof category.$inferInsert

// Dairy & Eggs
// Milk
// Cheese
// Butter
// Yogurt
// Eggs
// Produce (Fruits & Vegetables)
// Apples
// Bananas
// Carrots
// Tomatoes
// Lettuce
// Meat & Seafood
// Chicken Breasts
// Ground Beef
// Salmon Fillets
// Pork Chops
// Shrimp
// Bakery & Bread
// Sliced Bread
// Bagels
// Croissants
// Hamburger Buns
// Whole Wheat Bread
// Pantry Staples
// Flour
// Sugar
// Rice
// Pasta
// Canned Beans
// Beverages
// Bottled Water
// Orange Juice
// Coffee
// Tea Bags
// Soda
// Frozen Foods
// Frozen Vegetables
// Ice Cream
// Frozen Pizza
// Frozen Chicken Nuggets
// Frozen Meals
// Snacks & Sweets
// Potato Chips
// Chocolate Bars
// Popcorn
// Nuts
// Cookies
// Cleaning Supplies
// Dish Soap
// All-Purpose Cleaner
// Laundry Detergent
// Paper Towels
// Trash Bags
// Personal Care
// Shampoo & Conditioner
// Toothpaste
// Body Soap
// Toilet Paper
// Razors
// Baby & Kids
// Diapers
// Baby Wipes
// Baby Food
// Children's Snacks
// Kids' Toothpaste
// Health & Wellness
// Multivitamins
// Pain Relievers
// Band-Aids
// Hand Sanitizer
// Cold Medicine
// Pet Supplies
// Dog/Cat Food
// Pet Treats
// Litter (for cats)
// Pet Shampoo
// Pet Toys

// todo default items and categories
